const Puzzle = require('../core/Puzzle');
const { resolve, getSolutionSet } = require('../core/resolve');

const a = new Puzzle(2, false).set(
  [
     ,1,3,2,
    2,3,1, ,
    3, ,2,1,
    1,2, ,3,
  ]
);
const b = new Puzzle(3, false).set(
  [
     , ,8, , ,7,6,3,1,
    3, , ,8,6,1,2, , ,
    1, , , ,3, , ,7,8,
     , , ,7,8, ,1, ,4,
     , ,6, ,1, ,5, , ,
    2, ,4, ,9,6, , , ,
    8,3, , ,4, , , ,6,
     , ,7,1,5,8, , ,3,
    4,2,1, , , ,8, , ,
  ]
);
const c = new Puzzle(3, false).set(
  [
    8, , ,4,5,9,1,2, ,
    9, ,4, , , , , , ,
     , ,1,8, , ,9,5,4,
    7, , , , , ,8, ,9,
    3, ,6, , ,7, , ,5,
     ,1,9, , , ,6, ,3,
    4, ,7, , ,1, , , ,
     , , , ,4, ,5, ,1,
     , , , ,2, , , , ,
  ]
);
const d = new Puzzle(3, false).set(
  [
     ,3, , ,1, , ,6,5,
     , , , ,8, ,1, , ,
     , , , ,6,3,9, , ,
     ,5, ,1,7,2,8, , ,
     ,2,1, ,9, ,7,5, ,
     , ,9,3,5,8, ,1, ,
     , ,6,5,4, , , , ,
     , ,4, ,2, ,5, ,6,
    1,9, , ,3, , ,8, , 
  ]
);
const e = new Puzzle(3, false).set(
  [
     , , , ,3,1,6, ,8,
     , , ,9, , , , , ,
    7,4,3,6, , , , ,2,
     , ,7, , , , , ,5,
     , ,9,1, ,2,4, ,6,
    3, , , , , ,1, , ,
    5, , , , ,3,2,6,9,
    6,3, , , ,9, , , ,
    2, ,8,7,6, , , , , 
  ]
);
const f = new Puzzle(3, false).set(
  [
    2,6, , , , , , ,1,
     , ,4, , ,3, , , ,
     , , , , ,5,6, , ,
     , ,2,8,9,4, , ,7,
    1, , , , ,6, ,8, ,
    7, , , ,2,1,9, , ,
     , , ,3, , , , , ,
    6,2,1, , , , , , ,
    3, , ,1, ,8,2,9,4, 
  ]
);
// console.log(new Puzzle(3).set(d.puzzle).origin === d.puzzle);
const start = new Date();
const resolves = resolve(f);
console.log(`time use: ${new Date().getTime() - start.getTime()}ms!\n`);
console.log(resolves.toString());

