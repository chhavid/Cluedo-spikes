const fs = require('fs');

const generateRoom = (points) => {
  return `<polygon fill= 'lightBlue' stroke='black' stroke-width='0.2%' points = "${points.join(' ')}"/>`;
};

const createRoom = (rooms) => {
  return rooms.map(room => {
    return generateRoom(room.points);
  });
};

const generateStart = ([x, y]) => {
  return `<rect fill='purple' stroke='black' stroke-width='0.2%' x=${x} y=${y} height="1" width="1"/>`;
};

const createStart = (cells) => {
  return cells.map(generateStart);
};

const generatePath = ([x, y]) => {
  return `<rect fill='pink' stroke='black' stroke-width='0.2%' x=${x} y=${y} height="1" width="1"/>`;
};

const createPaths = (cells) => {
  return cells.map(generatePath);
};

const main = () => {
  const boardData = JSON.parse(fs.readFileSync('./board.json', 'utf8'));
  const rooms = createRoom(boardData.rooms);
  const paths = createPaths(boardData.cells);
  const start = createStart(boardData.start);
  const board = `<html><body><svg width="200" height="170" viewBox="0 0 24 25">${rooms.join(' ')}${start.join(' ')}${paths.join(' ')}</svg></body></html>`
  fs.writeFileSync('rooms.html', board, 'utf8');
};

main();