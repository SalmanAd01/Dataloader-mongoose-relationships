import express,{Request,Response} from 'express';
const app =express();
const PORT=5000
import connectDB from './db/connect';
import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import UserResolver from './graphql/resolvers/user.resolvers';
import PostsResolvers from './graphql/resolvers/Posts.resolvers';
import SocialMediasResolvers from './graphql/resolvers/SocialMedias.resolvers';
import path from 'path';
import { buildSchema } from 'type-graphql';
app.get('/',(req:Request,res:Response)=>{
    res.send('Hello World')
})
const startServer = async()=>{
    const schema = await buildSchema({
        resolvers: [UserResolver, PostsResolvers, SocialMediasResolvers],
        emitSchemaFile: path.join(__dirname, 'schema.gql'),
    });
    const server = new ApolloServer({
        // @ts-ignore
        schema,
        context: ({req}) => ({req})
    })
    await connectDB()
    await server.start()
    server.applyMiddleware({app})

    app.listen(PORT,()=>{
        console.log(`http://localhost:${PORT}/graphql`)
    })
}
startServer().then(()=>{
    console.log('Server started')
}).catch((err)=>{
    console.log(err)
})

