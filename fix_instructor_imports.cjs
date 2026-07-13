const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'pages', 'instructor');
const files = fs.readdirSync(dir);
let changed = 0;
files.forEach(f => {
  if (f.endsWith('.tsx')) {
    const filePath = path.join(dir, f);
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content
      .replace(/from\s+['"]\.\.\/components\//g, 'from "@/components/instructor/')
      .replace(/from\s+['"]\.\.\/api\//g, 'from "@/services/instructor/')
      .replace(/from\s+['"]\.\.\/contexts\//g, 'from "@/context/instructor/');
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent);
      changed++;
    }
  }
});
console.log('Fixed pages files: ' + changed);

const componentsDir = path.join(__dirname, 'src', 'components', 'instructor');
let componentsChanged = 0;
function walk(dirPath) {
  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
        let cnt = fs.readFileSync(fullPath, 'utf8');
        let newCnt = cnt
          .replace(/from\s+['"](?:\.\.\/)+components\//g, 'from "@/components/instructor/')
          .replace(/from\s+['"](?:\.\.\/)+api\//g, 'from "@/services/instructor/')
          .replace(/from\s+['"](?:\.\.\/)+contexts\//g, 'from "@/context/instructor/')
          .replace(/from\s+['"](?:\.\.\/)+pages\/services\/api\/api['"]/g, 'from "@/pages/instructor/services/api/api"');
        if (cnt !== newCnt) {
            fs.writeFileSync(fullPath, newCnt);
            componentsChanged++;
        }
    }
  }
}
walk(componentsDir);
console.log('Fixed components files: ' + componentsChanged);
