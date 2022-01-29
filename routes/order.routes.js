const express = require('express');
const router = express.Router();

const { restrictTo, protect } = require('../controllers/auth.controller');
const {
  createOrderLines,
  findAll,
  findOne,
  create,
  myOrders,
  deleteOrder,
  deleteLines,
} = require('../controllers/order.controller');

/* Protege las rutas con Authorization */
router.use(protect);

/* Busca mis ordenes */
router.route('/my-orders').get(myOrders);

/* 
Post: Crea Orden
Get: Lista todas las Ordenes para el Admin
*/
router.route('/').post(create).get(restrictTo('admin'), findAll);

/*
  Get: Lista el detalle de la orden
  Delete: Borra el detalle del pedido para insertar(update) un nuevo detalle
*/
router.route('/order-lines/:id').get(findOne).delete(deleteLines);

/* Crea el detalle de la orden */
router.route('/order-lines').post(createOrderLines);

/* Elimina la orden y el detalle */
router.route('/:id').delete(restrictTo('admin'), deleteOrder);

module.exports = router;
