import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import {makeExecutableSchema} from 'graphql-tools'

import mongoose from 'mongoose'
import types from './schema'
import Note from './model'
import resolvers from './resolver'
import keys from './config/keys'

const app = express()

mongoose.connect('mongodb://' + keys.userID+':'+keys.Password+'@ds137019.mlab.com:37019/notepad-db')


const schema = makeExecutableSchema({
    typeDefs: [types],
    resolvers,
  })

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: {Note}})) //The context is an object that’s accessible in every single resolver as the third argument.
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })) 

app.listen(4000)