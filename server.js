import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import {makeExecutableSchema} from 'graphql-tools'
import compression from 'compression'
//import { Engine } from 'apollo-engine'; 
import { ApolloEngine } from 'apollo-engine';

import mongoose from 'mongoose'
import types from './schema'
import Note from './model'
import resolvers from './resolver'
import keys from './config/keys'

//https://www.apollographql.com/docs/engine/1.0-migration.html
const GRAPHQL_PORT = 3000;
const ENGINE_API_KEY = keys.APIKey; // TODO   process.env??
const engine = new ApolloEngine({
  apiKey: ENGINE_API_KEY,
});

const app = express()

mongoose.connect('mongodb://' + keys.userID+':'+keys.Password+'@ds137019.mlab.com:37019/notepad-db')


const schema = makeExecutableSchema({
    typeDefs: [types],
    resolvers,
  })

app.use(compression()); //performance
app.use('/api/graphql', bodyParser.json(), graphqlExpress({ schema, 
  context: {Note}, 
  tracing: true,
  cacheControl: true})) //The context is an object that’s accessible in every single resolver as the third argument.
app.get('/graphiql', graphiqlExpress({ endpointURL: '/api/graphql' })) 

engine.listen({
  port: GRAPHQL_PORT,
  graphqlPaths: ['/api/graphql'], //no need to specify if /graphql // URL for the GraphQL POST endpoint this instance of GraphiQL serves
  expressApp: app,
  launcherOptions: {
    startupTimeout: 3000,
  },
}, () => {
  console.log('Listening!');
});