const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// let id = '5b9b7748326d36382b966320';
// let id = '5b9b7748326d36382b96632011';

// if (!ObjectID.isValid(id)){
//     return console.log('id not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found.');
//     }
//     console.log('todoById', todo);
// }).catch((e) => {
//     console.log(e);
// });

// challenge
let user_id = '5b9a8482296b3d1c355ee21b';

if(!ObjectID.isValid(user_id)){
    return console.log('User id not valid.');
}

User.findById(user_id).then((u) => {
    if(!u){
        return console.log('User not found.');
    }
    console.log('User found', u);
}).catch((e) => {
    console.log(e);
});






