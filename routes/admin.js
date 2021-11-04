const express = require('express');
const { verifyToken, checkIfAdmin } = require('../middlewares/authentication');

const router = express.Router();
const dbTasks = require('../controllers/adminController.js.js');

router.get('/admin/mongodb', verifyToken, checkIfAdmin, dbTasks.indexDB);
router.get('/admin/mongodb/seed', verifyToken, checkIfAdmin, dbTasks.seedDB);
module.exports = router;
