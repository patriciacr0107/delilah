const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json({}));

const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const productRouter = require('./routes/product.routes');
const orderRouter = require('./routes/order.routes');

// 1 MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.status(200).json({
    app: 'Delilah Resto',
    mesajge: 'Servicio iniciado',
  });
});

app.use('/delilah-api/users/', userRouter);
app.use('/delilah-api/products/', productRouter);
app.use('/delilah-api/auth/', authRouter);
app.use('/delilah-api/orders/', orderRouter);

module.exports = app;
