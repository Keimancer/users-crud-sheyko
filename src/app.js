const express = require('express')
const app = express()
app.use( express.json() );

//* Declaring DB and ID helper var
const usersDB = [];
let baseID = 1;

//* API actions
app.get( '/', ( req, res ) => {
    res.status( 200 ).json( {
        message: 'Server OK!'
    } );
} );

//* GET all users
app.get( '/users', ( req, res ) => {
    res.json( usersDB );
} );

//* GET user by ID
app.get( '/users/:id', ( req, res ) => {
    const id = Number( req.params.id );
    const data = usersDB.find( user => id === user.id );
    if ( data ){
        res.json( {
            data
        } );
    } else {
        res.status( 404 ).json( {
            message: 'Invalid ID.',
            error_img: 'https://http.dog/404.jpg'
        } );
    };
} );

//* POST user
app.post( '/users', ( req, res ) => {
    const data = req.body;
    const newUser = {
        id: baseID++,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        age: data.age
    };
    usersDB.push( newUser );
    res.status( 201 ).json( newUser );
} );

//* Listen
app.listen( 9000, () => {
    console.log( 'Server started at: http://localhost:9000' );
} );

module.exports = app
