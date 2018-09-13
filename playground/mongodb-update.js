// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/toDoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to the mongodb server.');
    }
    console.log('Connected to mongodb server.');

    // db.collection('ToDos').findOneAndUpdate({
    //     _id: new ObjectID("5b9a1eaa6a84a15e73422014")
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });
    
db.collection('Users').findOneAndUpdate({
    // name: 'Jen'
    _id: new ObjectID("5b977f3052fa3228dcc1536f")
}, {
    $set: {
        name: 'Wowo'
    },  
    $inc: { 
        age: 1 
    }
}, {
    returnOriginal: false
}).then((result) => {
    console.log(result);
});

    // db.close();
});



