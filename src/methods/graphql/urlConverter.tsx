import { IHeaders } from '@/app/GRAPHQL/interfaces';
import { IResults } from '../interfaces';

// http://localhost:5137/GRAPHQL/{endpointUrlBase64encoded}/{bodyBase64encoded}?header1=header1value&header2=header2value...
export function urlConverter(endpointUrl: string, headers: IHeaders[], query: string, variables: string | object) {
  let resultUrl = '';
  if (endpointUrl) {
    resultUrl += btoa(endpointUrl);
  }
  if (variables || query) {
    const body = {
      query,
      variables,
    };
    if (endpointUrl) {
      resultUrl += '/';
    }
    try {
      resultUrl += btoa(JSON.stringify(body));
    } catch {
      resultUrl += JSON.stringify(body);
    }
  }
  if (headers) {
    const headersList = [];
    for (let i = 0; i < headers.length; i += 1) {
      headersList.push(`${headers[i].key.replaceAll(/\//gi, '%2F')}=${headers[i].value.replaceAll(/\//gi, '%2F')}`);
    }
    const headersResult = headersList.join('&');
    resultUrl += `?${headersResult}`;
  }

  return resultUrl;
}

// http://localhost:5137/GRAPHQL/{endpointUrlBase64encoded}/{bodyBase64encoded}?header1=header1value&header2=header2value...
export function dataFromUrl(data: string, history: boolean) {
  const dataSplitted = data.split('/');
  if (history === false) {
    if (dataSplitted.length > 6 || dataSplitted.length < 5) {
      return false;
    }
  }

  const encodedData = dataSplitted.slice(4, dataSplitted.length);
  const results: IResults = {
    headers: [],
    query: '',
    endpointUrl: '',
    variables: '',
  };

  for (let i = 0; i < encodedData.length; i += 1) {
    if (encodedData[i].includes('?')) {
      // this is header
      const bodyAndHeadersCodes = encodedData[i].split('?');
      const headersCoded = bodyAndHeadersCodes[1];
      const headersCodedMerged = headersCoded.replaceAll(/%2F/gi, '/');
      const headersCodedArray = headersCodedMerged.split('&');
      const headersObjArray: IHeaders[] = [];
      for (let i = 0; i < headersCodedArray.length; i += 1) {
        const values = headersCodedArray[i].split('=');
        headersObjArray.push({
          key: values[0],
          value: values[1],
        });
      }
      results.headers = headersObjArray;

      const bodyEncoded = atob(bodyAndHeadersCodes[0]);
      try {
        const isBody = JSON.parse(bodyEncoded);
        // Это был Body
        results.query = isBody.query;
        results.variables = typeof isBody.variables === 'string' ? isBody.variables : JSON.stringify(isBody.variables);
      } catch {
        // Ошибочные данные были переданы в url или были только endpoint и headers
        results.endpointUrl = bodyEncoded;
      }
    } else {
      const QueryOrEndpoint = atob(encodedData[i]);
      try {
        const isBody = JSON.parse(QueryOrEndpoint);
        // Это был Body
        results.query = isBody.query;
        results.variables = isBody.variables;
      } catch {
        // Это был endpointUrl
        results.endpointUrl = QueryOrEndpoint;
      }
    }
  }
  return results;
}

export function makeNewUrl(currentUrl: string, convertedDataToUrl: string) {
  const currentUrlParsed = new URL(currentUrl);
  const protocol = `${currentUrlParsed.protocol ? currentUrlParsed.protocol + '//' : 'https://'}`;
  const hostname = currentUrlParsed.hostname;
  const port = currentUrlParsed.port ? ':'+currentUrlParsed.port : '';
  const newUrl = `${protocol}${hostname}${port}/GRAPHQL/${convertedDataToUrl}`
  return newUrl
}

// export function urlConverter(endpointUrl: string, body: string, headers: IHeaders[]) {
//   const endpointUrlBase64encoded = btoa(endpointUrl);
//   const bodyBase64encoded = btoa(body);
//   const headersList = [];
//   for (let i = 0; i < headers.length; i += 1) {
//     headersList.push(`${headers[i].key.replaceAll(/\//gi, '%2F')}=${headers[i].value.replaceAll(/\//gi, '%2F')}`);
//   }
//   const headersResult = headersList.join('&');
//   const newUrl = `${endpointUrlBase64encoded}/${bodyBase64encoded}?${headersResult}`;

//   const mockData = `http://localhost:5137/GRAPHQL/${newUrl}`;
//   dataFromUrl(mockData);
//   return newUrl;
// }

// export function dataFromUrl(data: string) {
// const dataSplitted = data.split('/');
// const endpointUrlBase64coded = dataSplitted[dataSplitted.length - 2];
// const bodyAndHeadersCodes = dataSplitted[dataSplitted.length - 1].split('?');
// const bodyCoded = bodyAndHeadersCodes[0];
// const headersCodedMerged = bodyAndHeadersCodes[1].replaceAll(/%2F/gi, '/');
// const headersObjArray = [];
// const headersCodedArray = headersCodedMerged.split('&');
// for (let i = 0; i < headersCodedArray.length; i += 1) {
//   const values = headersCodedArray[i].split('=');
//   headersObjArray.push({
//     key: values[0],
//     value: values[1],
//   });
// }
// const endpointUrl = atob(endpointUrlBase64coded);
// const body = atob(bodyCoded);

// const result = {
//   endpointUrl,
//   body,
//   headersObjArray,
// };
// return result;
// }
