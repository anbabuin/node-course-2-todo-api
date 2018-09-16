const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// Todo.remove({}) removes all
/*Todo.remove({}).then((result) => {
    console.log(result);
});*/

// returns object back
// Todo.findOneAndRemove()
// Todo.findOneAndRemove({_id: '5b9eb870661557f78e8bd5bd'}).then((todo) => {
//     console.log(todo);
// });

// returns object back
Todo.findByIdAndRemove('5b9eb870661557f78e8bd5bd').then((todo) => {
    console.log(todo);
});