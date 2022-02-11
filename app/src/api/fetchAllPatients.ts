import { Patient } from '../model/patient';
import { pickValue } from '../utils/pickValue';
import {Paginated} from './paginated';
import {stardogQuery} from './types';

type Search = {
  query?: string;
};

const source = ({skip, limit, query = ''}: Paginated & Search) => `
SELECT ?firstName ?lastName 
WHERE {
    ?p a hto:Person ;
    hto:firstName ?firstName ;
    hto:lastName ?lastName .

    ${
  query !== ''
    ? `FILTER(regex(?firstName, "${query}", "i") || regex(?lastName, "${query}", "i")) .`
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
    // .then((x) => x.map(pickValue('firstName', 'lastName', 'fiscalCode')) as Pick<Patient, 'firstName' | 'lastName' | 'fiscalCode'>[]);
    .then((x) => x.map(pickValue('firstName', 'lastName')) as Pick<Patient, 'firstName' | 'lastName'>[]);
