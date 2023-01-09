const express = require('express');
const ExpressError = require('./expressError')

const app = express();


// 404 handler
app.use((req, res, next) => {
  const e = new ExpressError("Page Not Found", 404)
  next(e)
})

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
