const { getCubeIndex, getIndexCube } = require('../utils/puzzle');
const Empty = ' ';
const InputError = 'Wrong Puzzle Input!';

const cubeSize = Symbol('Puzzle#CubeSize');
const puzzle = Symbol('Puzzle#puzzle');
const origin = Symbol('Puzzle#origin');
const originEmpty = Symbol('Puzzle#originEmpty');

const toCube = (puzzle, cubeSize) => {
  const cube = [];
  const rowSize = puzzle[0].length / cubeSize;
  const colSize = puzzle.length / cubeSize;
  for (let i = 0; i < colSize; i ++) {
    cube[i] = [];
    for (let j = 0; j < rowSize; j ++) {
      const c = [];
      for (let z = 0; z < cubeSize; z ++) {
        const start = cubeSize * j;
        c[z] = puzzle[cubeSize * i + z].slice(start, start + cubeSize);
      }
      cube[i][j] = c;
    }
  }
  return cube;
}
const getCube = (puzzle, cubeSize) => {
  const cube = [];
  const rowSize = puzzle[0].length / cubeSize;
  const colSize = puzzle.length / cubeSize;
  for (let i = 0; i < colSize; i ++) {
    for (let j = 0; j < rowSize; j ++) {
      let c = [];
      for (let z = 0; z < cubeSize; z ++) {
        const start = cubeSize * j;
        c= c.concat(puzzle[cubeSize * i + z].slice(start, start + cubeSize));
      }
      cube[i * cubeSize + j] = c;
    }
  }
  return cube;
}
const validate = arr => typeof [].concat(arr).sort((a,b) => a < b).find((a, i, arr) => a <= 0 || a > arr.length || a === Empty || a === (arr[i + 1] || Empty)) === 'undefined';

const validateMap = map => !map.find(arr => !validate(arr));

const puzzle2Str = (puzzle, cSize) => {
  const length = cSize * cSize;
  const line = [];
  for( let i = 0; i <2 * length + 2 * cSize + 1 ; i++) {
    line.push('-');
  }
  const splitLine = line.join('');
  line.splice(length + cSize - 4, 8, ' Puzzle ');
  const startLine = line.join('');
  const string = puzzle.map((row, colIndex) => {
    const str = '| ' + row.map((item, rowIndex) => (rowIndex + 1)%cSize === 0 ?item + ' |' : item).join(' ');
    return (colIndex + 1) % cSize === 0 ? str + '\n' + splitLine : str;
  }).join('\n');
  return `${startLine}\n${string}\n`;
}

module.exports = class Puzzle {
  /**
   * @constructor
   * @param {Number} size
   * @param {Boolean} enableValidate
   */
  constructor(size, enableValidate = false) {
    this[cubeSize] = size;
    this.enableValidate = enableValidate;
    this.clearPuzzle();
  }
  set(p) {
    this.clearPuzzle();
    const emptySet = [];
    const length = this.length;
    if (Array.isArray(p[0])) {
      if(p.length !== length || p.find(row => !Array.isArray(row) || row.length !== length)) {
        throw new Error(InputError);
      }
      this[puzzle] = p.map(arr => [].concat(arr));
      this[origin] = p;
    } else {
      if(p.length !== this.size) {
        throw new Error(InputError);
      }
      for( let i = 0; i < length; i++) {
        this[puzzle].push(p.slice(i * length, (i + 1) * length));
        this[origin].push(p.slice(i * length, (i + 1) * length));
      }
    }
    for (let i = 0; i < length; i++) {
      const row = this[puzzle][i];
      const orow = this[origin][i];
      for (let j = 0; j < length; j++) {
        const item = row[j];
        if(typeof item === 'undefined' || item === '' || item === Empty) {
          row[j] = Empty;
          orow[j] = Empty;
          emptySet.push({ i, j });
        }
        if (item !== Empty && (item <= 0 || item > this[length])) {
          this.clearPuzzle();
          throw new Error(InputError);
        }
      }
    }
    this[originEmpty] = emptySet;
    return this;
  }
  clearPuzzle() {
    this[puzzle] = [];
    this[origin] = [];
    this[originEmpty] = [];
  }
  get cubeSize() {
    return this[cubeSize];
  }
  get length() {
    return this[cubeSize] * this[cubeSize];
  }
  get size() {
    return this.length * this.length;
  }
  get emptySet() {
    const emptySet = [];
    this[originEmpty].forEach((p) => {
      if (this[puzzle][p.i][p.j] === Empty) {
        emptySet.push(p);
      }
    });
    return emptySet;
  }
  get puzzle() {
    return this.xSet;
  }
  get xSet() {
    return this[puzzle].map(arr => [].concat(arr));
  }
  get ySet() {
    return this[puzzle][0].map((v, i) => this[puzzle].map(row => row[i]));
  }
  get cubeSet() {
    return getCube(this[puzzle], this.cubeSize);
  }
  get resolved() {
    return validateMap(this.xSet) && validateMap(this.ySet) && validateMap(this.cubeSet);
  }
  toString() {
    return puzzle2Str(this[puzzle], this.cubeSize); 
  }
  toOriginString() {
    return puzzle2Str(this[origin], this.cubeSize); 
  }
  toCube() {
    return toCube(this[puzzle], this.cubeSize);
  }
  resolve(i,j,value) {
    if(this[origin][i][j] !== Empty) {
      throw new Error(`Can't resolve one given value {${i}:${j} - ${this[origin][i][j]} - ${value}}!`);
    } else if(this.enableValidate) {
      const error = this.validate(i,j,value);
      if (error) {
        throw new Error(error);
      }
    }
    this[puzzle][i][j] = value;
    return this;
  }
  validate(i,j,value) {
    if(value <= 0 ) {
      return `resolve value ${value} can\'t < 0 !`;
    }
    if(value > this[length] ) {
      return `resolve value ${value} can\'t > ${this[length]} !`;
    }
    const x = [].concat(this.xSet[i]);
    x.splice(j, 1, value);
    if(!validate(x)) {
      return `value ${value} don\'t match row ${i} ! - column ${j}`;
    }
    const y = [].concat(this.ySet[j]);
    y.splice(i, 1, value);
    if(!validate(y)) {
      return `value ${value} don\'t match column ${j}! -row ${i}`;
    }
    const c = [].concat(this.CubeSet[getIndexCube(i,j,this.cubeSize)]);
    c.splice(getCubeIndex(i,j,this.cubeSize), 1, value);
    if(!validate(c)) {
      return `value ${value} don\'t match cube ${i}:${j}!`;
    }
    return false;
  }
}
