const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');

const {GraphQLNonNull,GraphQLObjectType,GraphQLInt, GraphQLString, GraphQLID, GraphQLList} = graphql;
const _ = require('lodash');

// var books = [
//     {name:"maiin",genre:"laita",id:"1", authorid:"1"},
//     {name:"maiin",genre:"isekai",id:"2",authorid:"3"},
//     {name:"maiin",genre:"isekai",id:"3",authorid:"2"},
// ]
// var author = [
//     {name:"surjeet",age:21,id:"1"},
//     {name:"lodhi",age:21,id:"2"},
//     {name:"rajput",age:21,id:"3"}
// ]
const BookType = new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id:{
            type: GraphQLID
        },
        name :{type: GraphQLString},
        genre: {type: GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent, args){
                return Author.findById(parent.authorid)
            }
        }
    })
})
const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields:()=>({
        id:{
            type: GraphQLID
        },
        name :{type: GraphQLString},
        age: {type: GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args)
            {
                return Book.find({authorid: parent.id});
                // return _.filter(books, {authorid:parent.id});
            }
        }
        
    })
})

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        book: {
            type: BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args)
            {
              //code for get data from the db
            //   return  _.find(books,{id:args.id})
            return Book.findById(args.id);
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args)
            {
                return Author.findById(args.id);
            //    return _.find(author,{id:args.id});
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args)
            {
                return Book.find({});
                // return books;
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent, args)
            {
                return Author.find({});
                // return author;
            }
        }
    }
})
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor: {
            type:AuthorType,
            args: {
                name :{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args)
            {
                let author = new Author({
                    name: args.name,
                    age:args.age
                });
               return author.save();
            }
        },
        addBook:{
            type: BookType,
            args: {
                name:{type:new GraphQLNonNull(GraphQLString)},
             genre:{type:new GraphQLNonNull(GraphQLString)},
             authorId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let book =new Book({
                    name: args.name,
                    genre:args.genre,
                    authorid:args.authorId
                });
                return book.save();
            }
        }
    }
})
module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})