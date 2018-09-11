// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/toDoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to the mongodb server.');
    }
    console.log('Connected to mongodb server.');

    // 5b977e4664d8112a888182dd
    // 5b9785c35cf3f2fa5767d513
    // db.collection('ToDos').find({
    //     _id: new ObjectID('5b9785c35cf3f2fa5767d513')
    // }).toArray().then((docs)=>{
    // console.log('Todos');
    // console.log(JSON.stringify(docs, undefined ,2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('ToDos').find().count().then((count) => {
    //     console.log(`Todos: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({name: 'Andrew'}).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined ,2));
    }, (err) => {
        console.log('Unable to fetch users', err);
    });


    // db.close();
});



