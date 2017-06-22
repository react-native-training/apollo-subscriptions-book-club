import React from 'react';
import {
  AppRegistry
} from 'react-native';

import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

const wsClient = new SubscriptionClient(`YOURWEBSOCKETURI`, {
  reconnect: true
});

const networkInterface = createNetworkInterface({
  uri: `YOURMAINURI`
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
});

import App from './app';

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

AppRegistry.registerComponent('RNGraphCool', () => ApolloApp);
