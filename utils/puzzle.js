exports.getIndexCube = (i,j, cubeSize) => Math.floor(i / cubeSize) * cubeSize + Math.floor(j / cubeSize);
exports.getCubeIndex = (i,j, cubeSize) => i % cubeSize * cubeSize + j % cubeSize;