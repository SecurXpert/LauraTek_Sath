const fs = require('fs');
const path = require('path');

const srcDir = path.join('c:', 'Users', 'sathw', 'OneDrive', 'Desktop', 'Laura_Userside', 'src');

function walk(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;
            
            // Outer container replacement: flex h-screen -> fixed inset-0 flex
            if (content.includes('className="flex h-screen')) {
                content = content.replace(/className=\"flex h-screen/g, 'className="fixed inset-0 w-full h-full flex');
                changed = true;
            }

            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

walk(srcDir);
