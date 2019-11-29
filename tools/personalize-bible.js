/* global process, __dirname */

var fs = require('fs');
var minimist = require('minimist');

var { mappingFile } = minimist(process.argv.slice(2));

if (!mappingFile) {
  console.log(
    'Usage: node tools/personalize-bible.js --mappingFile data/pokemon-mapping.json > mybible.html'
  );
  process.exit();
}

var bibleText = fs.readFileSync(`${__dirname}/../data/bible.html`, {
  encoding: 'utf8'
});
var mapping = require(`${__dirname}/../${mappingFile}`);

for (var target in mapping) {
  bibleText = bibleText.replace(
    new RegExp(target, 'g'),
    mapping[target].replacement
  );
}

console.log(bibleText);
