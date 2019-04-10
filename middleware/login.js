const jwt = require('jsonwebtoken');
const config = require('config');

const login = (req,res,next) => {
  const token = req.header('x-auth-token');
  if(!token) return res.status(401).send('connection denied');
  try{
    const decode = jwt.verify(token,config.get('jwtPrivateKey'))
    next();
  }catch(err){
    res.status(500).send(err);
  }
}

module.exports = login;
