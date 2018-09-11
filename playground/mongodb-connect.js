// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

// example to generate ID
// let obj = new ObjectID();
// console.log(obj);

// object destructuring
// let user = {
//     name: 'Andrew',
//     age: 25
// };
// let {name} = user;
// console.log(name);

//mongo v3: arguments. (err, client)
MongoClient.connect('mongodb://localhost:27017/toDoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to the mongodb server.');
    }
    console.log('Connected to mongodb server.');
    //mongo v3: const db = client.db('ToDoApp');

    // db.collection('ToDos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert todo.', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2) );
    // });

    // Insert new doc in Users (name, age, location) use insertOne

    // db.collection('Users').insertOne({
    //     name: 'Andrew',
    //     age: 25,
    //     location: 'Philadelphia'
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert this user.', err);
    //     }

    //     //console.log(JSON.stringify(result.ops, undefined, 2) );
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    //mongo v3: client.close();
    db.close();
});



