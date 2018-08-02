const Solution = require('./Solution');

/**
 * @param {Solution} solution
 * @returns {Solution} solution
 */
const resolve = solution => {
  while(!solution.done) {
    let valueSet = solution.valueSet;
    while(valueSet.length > 0) {
      const s = valueSet[0];
      const resolve = [];
      const length = s.valueSet.length;
      if (length === 0) {
        return false;
      } else if (length === 1) {
        solution.resolve(s.i, s.j, s.valueSet[0]);
        valueSet = solution.valueSet;
      } else {
        break;
      }
    }
    // TODO: 预测优化
    for (const s of valueSet) {
      for (const value of s.valueSet) {
        // try to guess one time
        const nrs = resolve(solution.guess(s.i, s.j, value));
        if (nrs) {
          solution.guessScs( nrs );
          return solution;
        }
      }
    }
    if (valueSet.length > 0) {
      return false;
    }
  }
  return solution;
}

exports.resolve = p => resolve(new Solution(p));
