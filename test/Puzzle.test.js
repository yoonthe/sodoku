const Puzzle = require('../core/Puzzle');

const a = new Puzzle(2, false).set(
  [
     ,1,3,2,
    2,3,1, ,
    3, ,2,1,
    1,2, ,3,
  ]
);

console.log(a.toString());
try {
  console.log(a.resolve(0,0,4).resolve(1,3,4).resolve(2,1,4).resolve(3,2,4).resolved ? 'Congratulations!': 'Failed!');
  console.log(a.toString());
}catch(err) {
  console.error(err);
}
