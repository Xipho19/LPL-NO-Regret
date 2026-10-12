import test from 'node:test';
import assert from 'node:assert/strict';
import { CHAPTERS } from '../data.js';
import { createRun, advance, rewind, validateRun, nextGame } from '../engine.js';

test('all ten playable roles have a complete winning and losing route', () => {
  const winSeq=[0,0,1,0,0,1,0,0];
  for (const chapter of CHAPTERS) for (let i=0;i<5;i++) {
    let win = createRun(chapter.id,i), loss = createRun(chapter.id,i);
    for(let step=0;step<8;step++) { win=advance(win,winSeq[step]); loss=advance(loss,2); }
    while (win.intermission) { win=nextGame(win); for(let step=0;step<8;step++) win=advance(win,winSeq[step]); }
    while (loss.intermission) { loss=nextGame(loss); for(let step=0;step<8;step++) loss=advance(loss,2); }
    assert.equal(win.finished,true);assert.equal(win.won,true);
    assert.equal(loss.finished,true);assert.equal(loss.won,false);
  }
});
test('rewind restores the exact prior state and allows a different decision', () => {
  let run=createRun('blg2024',2);
  for(let i=0;i<7;i++)run=advance(run,0);
  const before=structuredClone(run);const finished=advance(run,2);
  assert.deepEqual(rewind(finished),before);
  assert.equal(advance(rewind(finished),0).finished,true);
  assert.throws(()=>rewind(before));
});
test('tampered saves, invalid actions and post-game choices are rejected', () => {
  let run=createRun('blg2024',0);assert.equal(validateRun(run),true);
  assert.equal(validateRun({...run,gold:99999}),false);
  assert.equal(validateRun({chapterId:'unknown',playerIndex:0,history:[]}),false);
  assert.throws(()=>advance(run,9));assert.throws(()=>createRun('blg2024',9));
  for(let i=0;i<8;i++)run=advance(run,0);
  assert.throws(()=>advance(run,0));
});
test('chapters preserve their historical roster and do not conflate qualification with a title', () => {
  assert.equal(CHAPTERS[0].players.map(x=>x.championId).join(','),'Jax,JarvanIV,Ahri,Kaisa,Rell');
  assert.equal(CHAPTERS[1].players[1].name,'Mlxg');
  assert.equal(CHAPTERS[1].players[1].championId,'Nocturne');
  assert.match(CHAPTERS[1].goal,/不等于夺冠/);
  assert.equal(CHAPTERS[0].assetPatch,'14.18.1');assert.equal(CHAPTERS[1].assetPatch,'8.19.1');
});
test('every rewind node restores its exact state and discards only its future', () => {
  for (const version of [1,2]) {
    let run=createRun('blg2024',2,version);
    const states=[];
    for(let i=0;i<8;i++){states.push(structuredClone(run));run=advance(run,2);}
    const original=structuredClone(run);
    for(let i=0;i<8;i++){
      const restored=rewind(run,i);
      assert.deepEqual(restored,states[i]);
      assert.equal(validateRun(restored),true);
      assert.equal(advance(restored,0).step,i+1);
    }
    assert.deepEqual(run,original);
    for(const index of [-1,8,1.5,NaN])assert.throws(()=>rewind(run,index));
  }
});
