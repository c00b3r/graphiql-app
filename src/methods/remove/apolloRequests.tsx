// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

// const client = new ApolloClient({
//   uri: endpointUrl,
//   cache: new InMemoryCache(),
//   headers: Object.fromEntries(headers.map((h) => [h.key, h.value])),
// });

// async function fetchGraphQL(query: string | readonly string[], variables?: string | object | undefined) {
//   const parsedVariables = variables ? (typeof variables === 'string' ? JSON.parse(variables) : variables) : {};
//   const result = await client.query({
//     query: gql(query),
//     variables: parsedVariables,
//   });
//   return result;
// }

// const handleSubmitPoke = async () => {
// try {
//   setEndpointUrl(mockEndpointUrlPoke)
//   const { data } = await fetchGraphQL(mockQueryPoke, mockVariablesPoke);
//   setResponse(data);
//   setStatusCode(200);
//   // setSdlUrl(`${endpointUrl}?sdl`);
//   setDocumentationVisible(true);

//   const postData: IPostData = {
//     endpointUrl: mockEndpointUrlPoke,
//     sdlUrl,
//     headers,
//     query: mockQueryPoke,
//     variables: mockVariablesPoke,
//   };
//   dispatch(saveGQLData(postData));
// } catch (error) {
//   const Ierror = error as IErrors;
//   const statusCode = Ierror.response?.status || 500;
//   const errorMessage = Ierror.response?.errors || Ierror.message;
//   setResponse(errorMessage);
//   setStatusCode(statusCode);
//   setDocumentationVisible(false);
// }
//   };
