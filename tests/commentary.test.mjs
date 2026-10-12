import test from 'node:test';
import assert from 'node:assert/strict';
import { CHAPTERS } from '../data.js';
import { createRun, advance, validateRun } from '../engine.js';
import { actionCommentary } from '../commentary.js';

const play = (actions, chapter='blg2024', player=0) => actions.reduce((s,a)=>advance(s,a),createRun(chapter,player));
test('all roles receive eight distinct stage explanations with their own champion',()=>{
  for(const c of CHAPTERS) for(let player=0;player<5;player++) {
    const run=play(Array(8).fill(0),c.id,player), snapshot=structuredClone(run);
    const readings=run.history.map((_,i)=>actionCommentary(run,i));
    assert.equal(new Set(readings.map(r=>r.context)).size,8);
    for(const r of readings){assert.ok(r.context.includes(c.players[player].name));assert.ok(r.context.includes(c.players[player].champion));assert.doesNotMatch(JSON.stringify(r),/undefined|NaN/);}
    assert.deepEqual(run,snapshot);
    assert.equal(validateRun(run),true);
    assert.match(readings[7].next,/本局获胜/);
  }
});
test('an identical decision explains different preparation and actual flash consequences',()=>{
  const unprepared=play([1,1]), prepared=play([0,1]);
  const bad=actionCommentary(unprepared,1), good=actionCommentary(prepared,1);
  assert.match(bad.reason,/未达到 2/);assert.match(good.reason,/兑现 \+850/);
  assert.match(bad.impact,/额外损失 300/);assert.match(bad.impact,/−950/);
  assert.match(bad.reason,/上一轮 00:00/);
  assert.match(actionCommentary(play([1]),0).next,/闪现仍余 40 秒/);
});
test('partial runs and archived nodes use the correct node state rather than final totals',()=>{
  const partial=play([0]), completed=play([0,0,1,0,0,1,0,0]);
  assert.deepEqual(actionCommentary(partial,0),actionCommentary(completed,0));
  assert.match(actionCommentary(completed,2).impact,/防御塔 0:0/);
  assert.match(actionCommentary(completed,5).impact,/大招/);
  assert.match(actionCommentary(play([2,2,2,2,2,0]),5).reason,/只获得 \+180/);
});
test('chapters isolate enemy references and losing final actions explain remaining thresholds',()=>{
  const rng=play(Array(8).fill(2),'rng2018',1), blg=play(Array(8).fill(2));
  assert.match(actionCommentary(rng,1).context,/乐芙兰/);
  assert.doesNotMatch(actionCommentary(rng,1).context,/波比|加里奥/);
  assert.match(actionCommentary(blg,1).context,/波比/);
  assert.match(actionCommentary(rng,7).next,/终局未完成推进条件/);
});
