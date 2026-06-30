const https = require('https');

https.get('https://lauratek.in:8000/guest/exam/get/details?exam_id=1', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log('Exam Details:', data));
});

https.get('https://lauratek.in:8000/guest/compiler-questions/get?question_id=1', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log('Question Details:', data));
});
