const express = require('express');
const moviesRouter = require('./routers/movies');
const userRouter = require('./routers/user');
const app = express();
require('./db/mongoose');
const port = process.env.PORT || 3005;

app.use(express.json());
app.use(moviesRouter);
app.use(userRouter);

app.listen(port, () => {
  console.log('server is running!');
});
