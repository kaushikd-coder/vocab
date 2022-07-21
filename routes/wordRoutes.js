import express from 'express';
import {
  fetchAndAddWords,
  getAllWords,
  getSingleWord,
} from './../controllers/wordControllers.js';

const router = express.Router();

router.route('/').post(fetchAndAddWords).get(getAllWords);
router.route('/:id').get(getSingleWord);

export default router;
