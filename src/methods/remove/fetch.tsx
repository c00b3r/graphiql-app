// const handleSubmitSwapi = async () => {
//     try {
//       const myHeaders = new Headers();
//       myHeaders.append('Content-Type', 'application/json');

//       const graphql = JSON.stringify({
//         query: '{\r\n  allFilms {\r\n    films {\r\n      title\r\n    }\r\n  }\r\n}',
//         variables: {},
//       });
//       const requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: graphql,
//         redirect: 'follow',
//       };

//       fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', requestOptions)
//         .then((response) => response.text())
//         .then((result) => {
//           setStatusCode(200);
//           setResponse(JSON.parse(result));
//         })
//         .catch((error) => console.error(error));
//     } catch (error) {
//     }
//   };
