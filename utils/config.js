const {
  DATABASE = 'mongodb://localhost:27017/moviesdb',
  SECRET_KEY_DEV = 'fc3dc3850a743218568b5738df1d608128f7840ed98c6d8ca78691c6947f75a0',
  JWT_SECRET,
  NODE_ENV, PORT = 3001,
} = process.env;

module.exports = {
  DATABASE, SECRET_KEY_DEV, JWT_SECRET, NODE_ENV, PORT,
};
