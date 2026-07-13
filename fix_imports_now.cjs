const fs = require('fs');
const path = require('path');

function replaceBrokenImports(dir) {
  if (!fs.existsSync(dir)) return 0;
  const files = fs.readdirSync(dir);
  let changes = 0;
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      changes += replaceBrokenImports(fullPath);
    } else if (fullPath.match(/\.(js|jsx|ts|tsx)$/)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;

      content = content.replace(/from\s+['"]\.\.\/components\//g, "from '@/components/");
      content = content.replace(/from\s+['"]\.\.\/services\//g, "from '@/services/");
      content = content.replace(/from\s+['"]\.\.\/assets\//g, "from '@/assets/");
      content = content.replace(/from\s+['"]\.\.\/hooks\//g, "from '@/hooks/");
      content = content.replace(/from\s+['"]\.\.\/pages\//g, "from '@/pages/");
      content = content.replace(/from\s+['"]\.\.\/context\//g, "from '@/context/");

      if (content !== original) {
        fs.writeFileSync(fullPath, content);
        changes++;
      }
    }
  }
  return changes;
}

const srcDir = path.join(__dirname, 'src');
let total = 0;
total += replaceBrokenImports(path.join(srcDir, 'pages', 'user'));
total += replaceBrokenImports(path.join(srcDir, 'pages', 'guest'));
total += replaceBrokenImports(path.join(srcDir, 'layouts'));
console.log('Fixed imports in ' + total + ' files.');
