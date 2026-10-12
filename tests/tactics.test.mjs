import test from 'node:test';
import assert from 'node:assert/strict';
import { createRun, advance, choicesFor, validateRun, rewind } from '../engine.js';
import { deepReview } from '../review.js';
import { actionCommentary } from '../commentary.js';

test('new rules make waiting costly and role windows meaningful, without changing legacy saves', () => {
  let old = createRun('blg2024',0), fresh = createRun('blg2024',0,2);
  for(let i=0;i<3;i++){old=advance(old,0);fresh=advance(fresh,0);}
  assert.equal(advance(old,0).history.at(-1).gold,140);
  assert.equal(advance(fresh,0).history.at(-1).gold,-360);
  assert.equal(advance(fresh,1).history.at(-1).gold,1000);
  assert.equal(validateRun(old),true);assert.equal(validateRun(fresh),true);
  const lowVision={...fresh,step:4,vision:2};
  assert.equal(choicesFor(lowVision)[1].supported,false);
  assert.match(choicesFor(lowVision)[1].note,/需要视野 3/);
});
test('all new roles have winning routes and exact save-compatible counterfactual review', () => {
  for(const chapter of ['blg2024','rng2018'])for(let p=0;p<5;p++){
    let win=createRun(chapter,p,2),loss=createRun(chapter,p,2);
    for(const a of [0,0,1,1,0,1,0,0])win=advance(win,a);
    for(let i=0;i<8;i++)loss=advance(loss,2);
    assert.equal(win.won,true);assert.equal(loss.won,false);
    assert.equal(validateRun(win),true);assert.equal(validateRun(loss),true);
    const r=deepReview(loss);
    assert.equal(r.repair.won,true);assert.equal(r.repair.rulesVersion,2);
    assert.equal(validateRun(r.repair),true);
    assert.match(actionCommentary(win,3).reason,/1000|850/);
    assert.equal(validateRun(rewind(win)),true);
  }
});
