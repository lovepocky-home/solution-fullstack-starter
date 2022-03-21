import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const uri = '/api/graphql'; // <-- add the URL of the GraphQL server here
const wsUri = uri + '/sub'
export function createApollo(httpLink: HttpLink) {
  // https://stackoverflow.com/a/47472874
  const url = new URL(wsUri, window.location.href);
  url.protocol = url.protocol.replace('http', 'ws');
  // url.href; // => ws://www.example.com:9999/path/to/websocket

  const http = httpLink.create({ uri });
  const ws = new WebSocketLink({
    uri: url.href,
    options: { reconnect: true },
  });
  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({ query }) => {
      // @ts-ignore
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    ws,
    http
  );
  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  imports: [HttpClientModule],
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
