const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myapp');

mongoose.connection.once('open',()=>{
    console.log('connectde to the database')
})

app.use('/graphql',graphqlHTTP({
schema: schema,
graphiql:true
}));

app.listen(4000,()=>{
    console.log("server started running on the 4000");
})