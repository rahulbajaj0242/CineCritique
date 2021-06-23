const mongoose = require('mongoose');

//connected using mongodb atlas
const DB =
  'mongodb+srv://movieManager:movieManager@atlas@cluster0.tf9mz.mongodb.net/moviesStack?retryWrites=true&w=majority';

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected!');
  })
  .catch((error) => {
    console.log(error);
  });
