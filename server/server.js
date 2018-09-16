let express = require('express');
let bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

const port = process.env.PORT || 3000;

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

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        })
    }, (e) => {
        res.status(400).send(e);
    });
});

app.delete('/todos/:id', (req, res) => {
    // get the id
    let id = req.params.id;
    // validate the id -> not valid? return 404
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    // remove todo by iod 
    // success -> if no doc -> 404, if doc -> send doc baxk with 200
    // error -> 400 with empty body
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.status(200).send(todo);
    }).catch((err) => {
        res.status(400).send();
    });
    

});


app.listen(port, () => {
    console.log(`Started on port ${port}`);
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

// challenge
// GET /todos/someid
// vaòid id: 5b9b7748326d36382b966320

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    // validate id - isValid if not 404 use send()
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    // findbyId? [todo? send(todo) : ERROR 404 send({})]: ERROR 400 send({}) 
    Todo.findById(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

    

module.exports = {app};
