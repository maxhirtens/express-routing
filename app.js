const express = require('express');
const ExpressError = require('./expressError')

const app = express();

app.use(express.json()); //For JSON

// home route
app.get('/', function (req, res, next) {
  res.send('Welcome to the Home Page - try /mean /median or /mode')
});

// mean route
app.get('/mean/:nums', function (req, res, next) {
  let nums = Array.from(req.params.nums.split(','));
  console.log(nums);
  try {
    let total = 0;
    for (let num of nums) {
      num = parseInt(num);
      total += num;
    } return res.send({
      'operation': 'mean',
      'value': total / nums.length
    });
  }
  catch (e) {
    next(e);
  }
});

// median route
app.get('/median/:nums', function (req, res, next) {
  let nums = Array.from(req.params.nums.split(','));
  nums.sort();
  console.log(nums);
  try {
    let middle = nums[Math.floor((nums.length - 1) / 2)];
    console.log(middle);
    return res.send({
      'operation': 'median',
      'value': middle
    });
  }
  catch (e) {
    console.log(e);
    next(e);
  }
});

// mode route
app.get('/mode/:nums', function (req, res, next) {
  let nums = Array.from(req.params.nums.split(','));
  try {
    let mapping = {};
    for (let i = 0; i < nums.length; i++) {
      if (!mapping[nums[i]]) mapping[nums[i]] = 0;
      mapping[nums[i]] += 1
    }
    let mode = Object.keys(mapping).reduce((a, b) => mapping[a] > mapping[b] ? a : b);
    return res.send({
      'operation': 'mode',
      'value': mode
    });
  }
  catch (e) {
    console.log(e);
    next(e);
  }
});

// 404 handler
app.use((req, res, next) => {
  const e = new ExpressError("Page Not Found", 404)
  next(e)
});

// Error handler
app.use(function (err, req, res, next) { //Note the 4 parameters!
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.msg;

  // set the status and alert the user
  return res.status(status).json({
    error: { message, status }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000")
});
