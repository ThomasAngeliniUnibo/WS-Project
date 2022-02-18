import {Patient} from '../model/patient';
import {pickValue} from '../utils/pickValue';
import {Paginated} from './paginated';
import {Search} from './search';
import {stardogQuery} from './types';

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

export const fetchAllPatients = async (parameters: Paginated & Search) =>
  stardogQuery({
    source,
    reasoning: false,
  }, parameters)
    .then(x => x.map(pickValue('firstName', 'lastName', 'fiscalCode')) as Array<Pick<Patient, 'firstName' | 'lastName' | 'fiscalCode'>>);
