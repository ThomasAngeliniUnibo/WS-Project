import { Patient } from '../model/patient';
import { pickValue } from '../utils/pickValue';
import {stardogQuery} from './types';

const source = ({fiscalCode}: Pick<Patient, 'fiscalCode'>) => `
SELECT ?firstName ?lastName
WHERE {
    ?p hto:fiscalCode "${fiscalCode}"
}
LIMIT 1
`;

// export const fetchPatient = (parameters: {fiscalCode: string}) => 
//   stardogQuery({
//     source,
//     reasoning: false,
//   }, parameters)
//     .then(x => x.map(pickValue('firstName', 'lastName'))[0] as Patient);

export const fetchPatient = (parameters: {fiscalCode: string}): Patient => ({
  firstName: 'Mario',
  lastName: 'Rossi',
  fiscalCode: 'RSSMRA90A01L500A',
  birthDate: new Date("1990-01-01")
})