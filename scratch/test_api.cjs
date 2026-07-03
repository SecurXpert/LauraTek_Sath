const https = require('https');
const fs = require('fs');
const path = require('path');

// Dynamically extract VITE_API_URL from api.ts to avoid TS compilation issues in this CJS script
const apiTsPath = path.join(__dirname, '../src/services/api/api.ts');
const apiTsContent = fs.readFileSync(apiTsPath, 'utf-8');
const match = apiTsContent.match(/export const VITE_API_URL = "(.*?)";/);
const VITE_API_URL = match ? match[1] : "https://lauratek.in:8000";

https.get(`${VITE_API_URL}/guest/exam/get/details?exam_id=1`, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log('Exam Details:', data));
});

https.get(`${VITE_API_URL}/guest/compiler-questions/get?question_id=1`, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log('Question Details:', data));
});
