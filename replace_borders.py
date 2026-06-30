import sys

file_path = r'c:\Users\sathw\OneDrive\Desktop\Laura_Userside\src\components\ui\Resume.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace border-red-500 conditionals
content = content.replace('? "border-red-500" : ""', '? "border-black" : "border-black"')
content = content.replace('? "border-red-500" : "border-black"', '? "border-black" : "border-black"')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Replaced red borders with black borders.')
