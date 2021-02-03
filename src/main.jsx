import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById('root')
);
