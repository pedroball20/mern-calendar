/*
Rutas de Usuarios / events
host + /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require('../controllers/events');

const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');

router.use(validarJWT);

//todas tienen que pasar por la validacion del JWT

// Obtener Eventos
router.get('/', getEventos);

// Crear Eventos
router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatorio').custom(isDate),
    check('end', 'Fecha de finalizacion es obligatorio').custom(isDate),
    validarCampos,
  ],

  crearEvento
);

// Actualizar Eventos
router.put(
  '/:id',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatorio').custom(isDate),
    check('end', 'Fecha de finalizacion es obligatorio').custom(isDate),
    validarCampos,
  ],
  actualizarEvento
);

// Eli Eventos
router.delete('/:id', eliminarEvento);

module.exports = router;
