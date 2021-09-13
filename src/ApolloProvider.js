import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client"
import App from './App'

const httpLink = new HttpLink({uri:'https://shrouded-spire-92510.herokuapp.com/'})

const authMiddleware = new ApolloLink((operation,forward)=>{
  operation.setContext(({headers = {}})=>({
    headers:{
      ...headers,
      authorization:localStorage.getItem('jwtToken') || null,
    }
  }))
  return forward(operation)
})

const client = new ApolloClient({

  
  cache:new InMemoryCache(),
  link:concat(authMiddleware,httpLink)
  
})


function ApolloSetup(){
    return(
        <ApolloProvider client={client}>
        
            <App/>
        
        </ApolloProvider>
    )
}

export default ApolloSetup