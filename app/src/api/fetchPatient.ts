import {Patient, PatientBasicInfo} from '../model/patient';
import {pickValue} from '../utils/pickValue';
import {stardogQuery} from './types';

const source = ({fiscalCode}: Pick<Patient, 'fiscalCode'>) => `

SELECT 
    ?firstName
    ?lastName
    ?birthDate
    (GROUP_CONCAT(?relativeFiscalCode; SEPARATOR=";") AS ?relativeFiscalCodes)
    (GROUP_CONCAT(?relativeFirstName; SEPARATOR=";") AS ?relativeFirstNames)
    (GROUP_CONCAT(?relativeLastName; SEPARATOR=";") AS ?relativeLastNames)
    ?city
WHERE {
    ?s  cpv:taxCode "${fiscalCode}" ;
        cpv:givenName ?firstName ; 
        cpv:familyName ?lastName ;
        cpv:dateOfBirth ?birthDate ;
        OPTIONAL { 
           ?s cpv:hasRelationshipWith [
              cpv:taxCode ?relativeFiscalCode ;
              cpv:givenName ?relativeFirstName ; 
              cpv:familyName ?relativeLastName ;
           ]
        }
        OPTIONAL {
          ?s cpv:hasCurrentResidence [
             clv:hasCity [ l0:name ?city ]
          ]
        } 
}
GROUP BY ?s ?firstName ?lastName ?birthDate ?city
LIMIT 1
`;

// Export const fetchPatient = (parameters: {fiscalCode: string}) =>
//   stardogQuery({
//     source,
//     reasoning: false,
//   }, parameters)
//     .then(x => x.map(pickValue('firstName', 'lastName'))[0] as Patient);

const zip = <A, B, C>(a: A[], b: B[], c: C[]): Array<[A, B, C]> => a.map((k, i) => [k, b[i], c[i]]);

export const fetchPatient = async (parameters: {fiscalCode: string}): Promise<Patient> =>
  stardogQuery({
    source,
    reasoning: true,
  }, parameters)
    .then(x => (x as any[]).map(pickValue('firstName', 'lastName', 'birthDate', 'relativeFiscalCodes', 'relativeFirstNames', 'relativeLastNames', 'city'))[0])
    .then(({firstName, lastName, birthDate, relativeFirstNames, relativeFiscalCodes, relativeLastNames, city}) => {
      const relatives: PatientBasicInfo[]
        = relativeFiscalCodes === '' ? []
          : zip(
            (relativeFiscalCodes as string).split(';'),
            (relativeFirstNames as string).split(';'),
            (relativeLastNames as string).split(';'),
          )
            .map(([fiscalCode, firstName, lastName]) => ({
              fiscalCode,
              firstName,
              lastName,
            }));

      return {
        fiscalCode: parameters.fiscalCode,
        firstName,
        lastName,
        birthDate: new Date(birthDate),
        relatives,
        city,
      };
    });
