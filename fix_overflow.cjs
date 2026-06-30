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
            
            // Outer container
            if (content.includes('className="flex h-screen') && !content.includes('className="flex h-screen overflow-hidden')) {
                // If it already has overflow-hidden somewhere in the same class list, skip it.
                // A bit hard to check exactly, so let's just do a simple replace
                content = content.replace(/className=\"flex h-screen([^\"]*)\"/g, (match, p1) => {
                    if (p1.includes('overflow-hidden')) return match;
                    return `className="flex h-screen${p1} overflow-hidden"`;
                });
                changed = true;
            }

            // Inner container
            if (content.includes('className="flex-1 flex flex-col min-w-0"') || content.includes('className="flex-1 flex flex-col min-w-0 ') ) {
                content = content.replace(/className=\"flex-1 flex flex-col min-w-0([^\"]*)\"/g, (match, p1) => {
                    if (p1.includes('overflow-hidden')) return match;
                    return `className="flex-1 flex flex-col min-w-0${p1} overflow-hidden"`;
                });
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
