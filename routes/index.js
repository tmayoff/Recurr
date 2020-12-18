import auth from './auth';
import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', auth.optional, (req, res, next) => {

  res.render('index', { title: 'Express' });
});

export default router;