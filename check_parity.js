const fs = require('fs');
const en = JSON.parse(fs.readFileSync('messages/en.json','utf8'));
const zh = JSON.parse(fs.readFileSync('messages/zh.json','utf8'));
const tw = JSON.parse(fs.readFileSync('messages/zh-tw.json','utf8'));

const namespaces = ['about','pricing','solutions','securityPage','contact','demo','join','support','terms','privacy','form'];

function flatKeys(obj, prefix) {
  prefix = prefix || '';
  return Object.entries(obj).flatMap(function([k, v]) {
    var full = prefix ? prefix+'.'+k : k;
    return typeof v === 'object' && v !== null && !Array.isArray(v) ? flatKeys(v, full) : [full];
  });
}

var allOk = true;
for (var ns of namespaces) {
  var enKeys = new Set(flatKeys(en[ns] || {}));
  var zhKeys = new Set(flatKeys(zh[ns] || {}));
  var twKeys = new Set(flatKeys(tw[ns] || {}));
  var missing_zh = [...enKeys].filter(function(k){ return !zhKeys.has(k); });
  var missing_tw = [...enKeys].filter(function(k){ return !twKeys.has(k); });
  var extra_zh   = [...zhKeys].filter(function(k){ return !enKeys.has(k); });
  var extra_tw   = [...twKeys].filter(function(k){ return !enKeys.has(k); });
  if (missing_zh.length || missing_tw.length || extra_zh.length || extra_tw.length) {
    allOk = false;
    console.log('MISMATCH in namespace: ' + ns);
    if (missing_zh.length) console.log('  zh missing: ' + JSON.stringify(missing_zh));
    if (missing_tw.length) console.log('  zh-tw missing: ' + JSON.stringify(missing_tw));
    if (extra_zh.length)   console.log('  zh extra: '   + JSON.stringify(extra_zh));
    if (extra_tw.length)   console.log('  zh-tw extra: ' + JSON.stringify(extra_tw));
  } else {
    console.log('OK: ' + ns + ' (' + enKeys.size + ' keys)');
  }
}
if (allOk) console.log('\nAll namespaces: PERFECT PARITY');
