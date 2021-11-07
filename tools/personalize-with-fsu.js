/* global process, __dirname */

var fs = require('fs');
var minimist = require('minimist');
var FSU = require('fuck-shit-up').create;
var Probable = require('probable').createProbable;
var seedrandom = require('seedrandom');
var split = require('split');
var { Transform } = require('stream');

const { linesToPassThrough, seed } = minimist(process.argv.slice(2));
var probable = Probable();

if (seed) {
  probable = Probable({ random: seedrandom(seed) });
}

var fsu = FSU({ probable });

var bibleStream = fs.createReadStream(`${__dirname}/../data/bible.html`);
var lineStream = split();
var fsuStream = new Transform({ transform: transformLine, objectMode: true });

var lineCount = 0;

bibleStream.pipe(lineStream);
lineStream.pipe(fsuStream);
fsuStream.pipe(process.stdout);

function transformLine(s, encoding, done) {
  if (lineCount < +linesToPassThrough) {
    process.nextTick(addBreak, null, s);
    return;
  }

  fsu(s, addBreak);

  function addBreak(error, transformed) {
    if (error) {
      done(error);
      return;
    }
    lineCount += 1;
    done(null, transformed + '\n');
  }
}
