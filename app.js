require('dotenv').config();

const express = require('express');
const app = express();
const authRouter= require('./routes/auth')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const auth=require('./middleware/authentication.js')

app.use(express.json());


// extra packages

//connectDB

const connectDB= require('./db/connect')

// routes
app.get('/', (req, res) => {
res.send('hii')
});

app.use('/api/v1/auth', authRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
