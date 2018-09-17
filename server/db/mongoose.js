let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');


module.exports = {mongoose};
// module.exports = {
//     moongose: mongoose
// };

// enviroments:
// production (app on heroku)
// development env (locally)
// test (mocha)
