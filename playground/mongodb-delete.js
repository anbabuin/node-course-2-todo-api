// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/toDoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to the mongodb server.');
    }
    console.log('Connected to mongodb server.');

    // db.collection('ToDos').find().toArray().then((docs) => {
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Something went wrong', err);
    // });

    // {
    //     text: 'Eat lunch',
    //     completed: false
    // }

    //deleteMany
    // db.collection('ToDos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    //deleteOne
    // db.collection('ToDos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    //findOneAndDelete
    // db.collection('ToDos').findOneAndDelete({completed: false}).then((wowo) => {
    //     console.log(wowo);
    // });

    //challenge
    // db.collection('Users').deleteMany({name: 'Andrew'}).then((result) => {
    //     console.log(result);
    // });

    // {
    //     "_id" : ObjectId("5b978056b1125a24f4f30887"),
    //     "name" : "Mike",
    //     "age" : 25,
    //     "location" : "Philadelphia"
    // }
    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5b978056b1125a24f4f30887')}).then((result) => {
            console.log(result);
        });


    // db.close();
});



