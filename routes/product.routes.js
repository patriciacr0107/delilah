const express = require('express');
const router = express.Router();

const {
  create,
  findAll,
  findOne,
  updateOne,
  deleteOne,
} = require('../controllers/product.controller');

const { restrictTo, protect } = require('../controllers/auth.controller');

/* Protege las rutas con Authorization */
router.use(protect);

/* 
  Get: Obtiene todos los productos
  Post: Crea producto
 */
router.route('/').get(findAll).post(restrictTo('admin'), create);

/* 
  Get: Busca un producto
  Put: Actualiza un producto
  Delete: Borra producto
*/
router
  .route('/:id')
  .get(findOne)
  .put(restrictTo('admin'), updateOne)
  .delete(restrictTo('admin'), deleteOne);

module.exports = router;
