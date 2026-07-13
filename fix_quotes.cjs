const fs = require('fs');
const path = require('path');

function walk(dirPath) {
  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
        let cnt = fs.readFileSync(fullPath, 'utf8');
        // It replaced `from '../` with `from "@/` resulting in `from "@/...'`
        let newCnt = cnt.replace(/from\s+"(@\/[^"']+)'/g, 'from "$1"');
        if (cnt !== newCnt) {
            fs.writeFileSync(fullPath, newCnt);
            console.log('Fixed quotes in: ' + fullPath);
        }
    }
  }
}

walk(path.join(__dirname, 'src', 'pages', 'instructor'));
walk(path.join(__dirname, 'src', 'components', 'instructor'));
console.log('Done fixing quotes!');
