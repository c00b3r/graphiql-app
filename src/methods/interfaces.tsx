import { IHeaders } from '@/app/GRAPHQL/interfaces';

export interface IResults {
  headers: IHeaders[];
  query: string;
  endpointUrl: string;
  variables: string;
}
