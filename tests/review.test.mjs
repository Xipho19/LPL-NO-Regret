import test from 'node:test';
import assert from 'node:assert/strict';
import { createRun, advance } from '../engine.js';
import { basicReview, deepReview } from '../review.js';

const play = (actions, chapter='blg2024', player=2) => actions.reduce((s,a)=>advance(s,a),createRun(chapter,player));

test('counterfactuals replay fixed later choices exactly and never mutate the played match', () => {
  const actions=[0,0,1,0,0,1,0,0], run=play(actions), snapshot=structuredClone(run);
  const report=deepReview(run);
  for(let i=0;i<8;i++) {
    const alternatives=[0,1,2].filter(a=>a!==actions[i]);
    report.nodes[i].alternatives.forEach((a,j)=> {
      const route=actions.slice();route[i]=alternatives[j];
      assert.deepEqual(a.final,play(route));
      assert.equal(a.delta,a.final.gold-run.gold);
    });
  }
  assert.deepEqual(run,snapshot);
  assert.equal(report.minimumChanges,0);
  assert.equal(new Set(report.nodes.map(n=>n.lesson)).size,8);
});

test('minimum repair is a verified minimum, while a last-step rewind cannot save all-C', () => {
  const run=play(Array(8).fill(2)), report=deepReview(run);
  assert.equal(report.repair.won,true);
  assert.equal(report.changes.length,report.minimumChanges);
  assert.equal(report.minimumChanges,5);
  assert.ok(report.nodes.at(-1).alternatives.every(a=>!a.final.won));
  assert.match(report.rewindVerdict,/仍会失败/);
  // Independently enumerate every route with fewer edits than the proposed repair.
  let checked=0;
  function visit(s, edits) {
    if(edits>=report.minimumChanges)return;
    if(s.finished){assert.equal(s.won,false);checked++;return;}
    for(let a=0;a<3;a++)visit(advance(s,a),edits+Number(a!==2));
  }
  visit(createRun('blg2024',2),0);
  assert.ok(checked>1000);
});

test('near-loss diagnosis identifies a one-choice rescue rather than recommending unnecessary restart', () => {
  const run=play([2,0,0,0,0,0,0,2]), report=deepReview(run);
  assert.equal(run.won,false);
  assert.equal(report.minimumChanges,1);
  assert.match(report.rewindVerdict,/存在获胜分支/);
  assert.ok(report.nodes.at(-1).alternatives.some(a=>a.final.won));
});

test('causes distinguish prepared attacks, unsupported attacks and actual flash penalty', () => {
  const supported=deepReview(play([0,1,0,0,0,0,0,0]));
  const unsupported=deepReview(play([1,1,0,0,0,0,0,0]));
  assert.match(supported.nodes[1].cause,/兑现 \+850/);
  assert.match(unsupported.nodes[0].cause,/准备条件/);
  assert.match(unsupported.nodes[1].cause,/额外损失 300/);
  assert.equal(unsupported.nodes[1].after.gold-unsupported.nodes[1].before.gold,-950);
});

test('basic summary is numerical; rewarded report adds chapter and champion context', () => {
  const run=play(Array(8).fill(2),'rng2018',1), basic=basicReview(run), deep=deepReview(run);
  assert.match(basic.summary,/终局未达标/);
  assert.match(basic.events[0],/经济变化/);
  assert.match(deep.role,/Mlxg/);
  assert.match(deep.matchup,/Perkz/);
  assert.doesNotMatch(deep.matchup,/Faker/);
  assert.match(deep.scope,/不代表真实比赛胜率/);
  assert.notEqual(basic.summary,deep.root);
  assert.throws(()=>deepReview(createRun('blg2024',2)));
});
