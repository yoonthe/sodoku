const Puzzle = require('./Puzzle');
const { getIndexCube } = require('../utils/puzzle');

const MAX_STEPS = 10000;

/**
 * 
 * @param {Number} size 
 * @param {Array[]} arrs 
 */
const getS = (size, ...arrs) => {
  const s = [];
  const f = arrs.reduce((mol,arr) => {
    const t = [];
    arr.forEach(i => {
      if(mol.indexOf(i) === -1) {
        t.push(i);
      }
    });
    return mol.concat(t);
  }, []);
  for(let i = 1; i <= size; i++) {
    if(f.indexOf(i) === -1) {
      s.push(i);
    }
  }
  return s;
}
/**
 * @param {Puzzle} puzzle
 * @returns {Object[]} valueSet
 */
const getValueSet = puzzle => {
  const xSet = puzzle.xSet;
  const ySet = puzzle.ySet;
  const cubeSet = puzzle.cubeSet;
  const length = puzzle.length;
  return puzzle.emptySet.map(p => ({ ...p, valueSet: getS(length, xSet[p.i], ySet[p.j], cubeSet[getIndexCube(p.i,p.j,puzzle.cubeSize)]) })).sort((a,b) => a.valueSet.length - b.valueSet.length)
};

const steps = Symbol('Solution#steps');
const puzzle = Symbol('Solution#puzzle');
const Solution = class Solution {
  constructor(p) {
    this[steps] = [];
    this[puzzle] = p;
  }
  get steps() {
    return [].concat(this[steps]);
  }
  get length() {
    return this[steps].length;
  }
  get done() {
    return this.resolved || this[steps].length >= MAX_STEPS;
  }
  get resolved() {
    return this[puzzle].resolved;
  }
  get valueSet() {
    return getValueSet(this[puzzle]);
  }
  resolve(i, j, value) {
    this[puzzle].resolve(i, j, value);
    this[steps].push({ i, j, value });
  }
  guess(i, j, value) {
    this[steps].push({ i, j, value, guess: false });
    return new Solution(new Puzzle(this[puzzle].cubeSize).set(this[puzzle].puzzle).resolve(i, j, value ));
  }
  guessScs(solution) {
    const last = this[steps][this[steps].length - 1];
    if (typeof last.guess === 'boolean') {
      last.guess = true;
      this[puzzle].resolve(last.i, last.j, last.value);
      this.concat(solution);
    } else {
      throw new Error('Last resolve is not a guess result!');
    }
  }
  concat(solution) {
    solution.steps.forEach(s => this[puzzle].resolve(s.i, s.j, s.value));
    this[steps] = this[steps].concat(solution.steps);
  }
  toString() {
    let str = '---- Solution ---- \n\n';
    str += this[puzzle].toOriginString();
    str += `\n---- STEPS - ${this.length} total ----\n\n`;
    this[steps].forEach(r => {
      if (typeof r.guess === 'boolean') {
        str += `|- ${r.guess ? '>':'X'}  guess   : ${r.i}-${r.j} ${r.value}\n`;
      } else {
        str +=`|     resolve : ${r.i + 1}-${r.j + 1} ${r.value}\n`;
      }
    })
    if(this.resolved) {
      str += '\nCongratulations, puzzle resolved!\n\n';
    } else {
      str += '\nCan\'t resolve puzzle!\n\n';
    }
    str += this[puzzle].toString();
    return str;
  }
}

module.exports = Solution;