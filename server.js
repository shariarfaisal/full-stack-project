const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
app.listen(PORT,() => {
  console.log(`server is runnig on port ${PORT}`);
})
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRoute = require('./routers/users');
const cors = require('cors')
// Connect with mongodb ...
const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://localhost:27017/social',
  {useNewUrlParser: true},
  () => {
  console.log('Database connection established...');
})


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api/users',userRoute);
app.get('/',(req,res,next) => {
  res.json({
    message: 'Welcome to my full stack project'
  })
})
