const { Router } = require('express');

const CrushController = require('../controllers/CrushController.js');

const ensureAuth = require('../middlewares/ensureAuth');

const crushRoutes = Router();

const crushController = new CrushController();

crushRoutes.get('/search', ensureAuth, crushController.findByPattern);
crushRoutes.get('/', crushController.list);
crushRoutes.get('/:id', crushController.find);
crushRoutes.post('/', ensureAuth, crushController.create);
crushRoutes.put('/:id', ensureAuth, crushController.update);
crushRoutes.delete('/:id', ensureAuth, crushController.remove);

module.exports = crushRoutes;
