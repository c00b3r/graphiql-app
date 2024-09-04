// const handleSubmit = async () => {
//     let variablesSubmit: string | object = variables === '' || Object.keys(variables).length === 0 ? '{}' : variables;
//     try {
//       if (typeof variablesSubmit !== 'object') {
//         const parsedVariables: object = JSON.parse(variablesSubmit);
//         variablesSubmit = parsedVariables;
//       }
//       try {
//         const queryTransformed = gql`
//           ${query}
//         `;
//         try {
//           const checkedHeaders: IHeaders[] = JSON.parse(headers);
//           const headersTransformed = Object.fromEntries(checkedHeaders.map((h) => [h.key, h.value]));
//           const body = await request(endpointUrl, queryTransformed, variablesSubmit, headersTransformed);
//           dispatch(saveResponse(JSON.stringify(body), 200));
//           const currentUrl = window.location.href;
//           saveHistory(currentUrl, 'GraphiQL', sdlUrl);
//           // setDocumentationVisible(true);
//           // setDocumentation('');
//           // dispatch(saveHistoryData(currentUrl));
//         } catch {
//           showAlert('Invalid graphql query');
//           console.log('err1');
//         }
//       } catch {
//         showAlert('Invalid graphql query');
//         console.log('err2');
//       }
//     } catch {
//       showAlert('Invalid variables');
//       console.log('err3');
//     }
//   };
