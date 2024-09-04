'use client';

import 'graphiql/graphiql.css';
import './page.css';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import React from 'react';
const fetcher = createGraphiQLFetcher({ url: 'https://beta.pokeapi.co/graphql/v1beta' });
export default function GqlQueryInput() {
  return <GraphiQL fetcher={fetcher} />;
}
