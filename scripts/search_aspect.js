const fs = require('fs');
const content = fs.readFileSync('usr/palm/applications/com.webosflux.xuptertv.fidelity/js/app.js', 'utf8');
const lines = content.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('Fa(') || l.includes('aspect') || l.includes('pi-act-scale')) {
    console.log((idx+1) + ': ' + l.substring(0, 100));
  }
});

