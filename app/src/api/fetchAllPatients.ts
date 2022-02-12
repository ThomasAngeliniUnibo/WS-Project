import { Patient } from '../model/patient';
import { pickValue } from '../utils/pickValue';
import {Paginated} from './paginated';
import {stardogQuery} from './types';

type Search = {
  query?: string;
};

const source = ({skip, limit, query = ''}: Paginated & Search) => `
SELECT ?fiscalCode ?firstName ?lastName
WHERE {
  ?s cpv:taxCode ?fiscalCode ;
      cpv:givenName ?firstName ; 
      cpv:familyName ?lastName .
    

  ${
query !== ''
  ? `FILTER(REGEX(CONCAT(?firstName, " ", ?lastName), "${query}", "i"))`
  : ''
  }
}
OFFSET ${skip}
LIMIT ${limit}
`;

export const fetchAllPatients = (params: Paginated & Search) => 
  stardogQuery({
    source,
    reasoning: true,
  }, params)
    .then((x) => x.map(pickValue('firstName', 'lastName', 'fiscalCode')) as Pick<Patient, 'firstName' | 'lastName' | 'fiscalCode'>[]);
