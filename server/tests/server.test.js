// const _ = require('lodash');
const expect = require('expect');
const request = require('supertest');
const  {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
},{
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    });
});

describe('POST /todos', () => {
    it('Should create a new todo', (done) => {
        let text = 'Test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200).
        expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err) {
                return done(err);
            }

            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });

    });


    it('Should not create todo with invalid body data', (done) => {
        // void obj, 400status, todos.length=0
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) =>{
            if(err){
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });

});

describe('GET /todos', () => {
    it('Should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('Should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
           expect(res.body.todo.text).toBe(todos[0].text); 
        })
        .end(done);
    });

    it('Should return 404 if todo not found', (done) => {
        // make sure to get status 404 creating ObjectID
        let newId = new ObjectID();
        request(app)
        .get(`/todos/${newId.toHexString()}`)
        .expect(404).end(done);
    });

    it('Should return 404 for non-object ids', (done) => {
        // /todos/123 get status 404
        request(app)
        .get(`/todos/123`)
        .expect(404).end(done);
    });

});

describe('DELETE /todos/:id', () => {
    it('Should remove 1 todo', (done) => {
        let hexId = todos[1]._id.toHexString();

        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }

            // query db using findbyid should fail expect(obj).toNotExist() assention
            Todo.findById(hexId).then((todo) => {
                expect(todo).toNotExist();
                done();
            }).catch((e) => done(e));
        });
    });

    it('Should return 404 if todo not found', (done) => {
        let hexId = new ObjectID().toHexString();

        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('Should return 404 if objectId is invalid', (done) => {
        request(app)
        .delete('/todosd/123sfd')
        .expect(404)
        .end(done);
    });
});


describe('PATCH /todos/:id', () => {
    it('Should update the todo', (done) => {
        // grab id first item
        // update text , set completed to true
        // check 200
        // custom assertion text is changed, comleted true, completedAt is a number
        let firstItem = todos[0];
        let id = firstItem._id.toHexString();

        let body = {
            text: "this is the new text",
            completed: true,
        };

        request(app)
        .patch(`/todos/${id}`)
        .send(body)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe("this is the new text");
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number');
            done();
        })
        .end((err, res) => {
            if(err) {
                return done(err);
            }
        });

    });

    
    it('Should clear completedAt when todo is not completed', (done) => {
        // grab id of second todo
        let id = todos[1]._id.toHexString();
        let body = {
            text: "this is the new text of second todo",
            completed: false,
        };
        // update text , set completed to false
        // 200
        // text is changed, completed false, comlpetedAt null .toNotExist
        request(app)
        .patch(`/todos/${id}`)
        .send(body)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(body.text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toNotExist();
            done();    
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }
        });
    });
    
    it('Should return 404 if todo not found', (done) => {
        let hexId = new ObjectID().toHexString();

        request(app)
        .patch(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('Should return 404 if objectId is invalid', (done) => {
        request(app)
        .patch('/todosd/123sfd')
        .expect(404)
        .end(done);
    });

});
