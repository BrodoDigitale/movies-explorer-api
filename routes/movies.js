const router = require('express').Router();
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.delete('/movies/:movieId', deleteMovieValidation, deleteMovie);
router.post('/movies', createMovieValidation, createMovie);

module.exports = router;
