import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
//import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'
import {makeExecutableSchema} from 'graphql-tools'

import mongoose from 'mongoose'
import types from './schema'
import Note from './model'
import resolvers from './resolver'

const app = express()

mongoose.connect('mongodb://admin:Password@ds137019.mlab.com:37019/notepad-db')


const schema = makeExecutableSchema({
    typeDefs: [types],
    resolvers,
  })

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: {Note}})) 
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })) // enable GraphiQL

app.listen(4000)