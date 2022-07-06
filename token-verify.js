const jwt = require('jsonwebtoken');

const secret = 'secreto';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY1NzA1NTgzMiwiZXhwIjoxNjU3NjYwNjMyfQ.0Mu-azLqciwYRldjomPxDPkkoPEA6EMsFHzGao7FR98';

function verifyToken(token , secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
