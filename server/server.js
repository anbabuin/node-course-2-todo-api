let express = require('express');
let bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let port = 3000;

let app = express();


app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) =>{
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/', (req, res) => {

});

app.listen(port, () => {
    console.log('Started on port ', port);
});



//challenge
// let newTodo2 = new Todo({
//     text : 'Do the challenge',
//     completed: true,
//     completedAt: 01
// });

// newTodo2.save().then((doc) => {
//     console.log('newTodo2 was saved!', JSON.stringify(doc, undefined, 2));
// }, (e) => {
//     console.log('There was an error: ', e);
// });

module.exports = {app};
