// config (자신의 환경에 맞게 URI 및 포트 넘버 수정)
var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}

// dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// routes 
// 프로젝트 폴더안에 server, server/routes 폴더를 생성
const api = require('./server/routes/api');
const app = express();

// port
const port = process.env.PORT || '3000';
app.set('port', port);

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static path to dist
// 차후 ng build 명령을 실행하면 dist 폴더는 자동 생성됨.
app.use(express.static(path.join(__dirname, 'dist')));

// api routes
app.use('/api', api);

// 기타 모든 라우트는 index.html로 돌림
// 위에서 필요한 라우트를 모두 설정하고 마지막에 이 코드가 와야함.

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


// HTTP server 생성
const server = http.createServer(app);

// 모든 네트워크 인터페이스에 설정된 포트 부여
server.listen(port, () => console.log(`Server running on localhost:${port}`));
