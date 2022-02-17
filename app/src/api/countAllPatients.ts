import {pickValue} from '../utils/pickValue';
import {Search} from './search';
import {stardogQuery} from './types';

const source = ({query = ''}: Search) => `
SELECT (COUNT(*) AS ?count)
WHERE {
    [ cpv:taxCode ?fiscalCode ;
      cpv:givenName ?firstName ; 
      cpv:familyName ?lastName ] .

    FILTER(REGEX(CONCAT(?firstName, " ", ?lastName), "${query}", "i"))
}
`;

export const countAllPatients = async (parameters: Search) =>
  stardogQuery({
    source,
    reasoning: false,
  }, parameters)
    .then(x => x.map(pickValue('count')) as [{count: number}])
    .then(x => x[0].count);
