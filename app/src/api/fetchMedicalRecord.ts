import {PatientBasicInfo} from '../model/patient';
import {pickValue} from '../utils/pickValue';
import {stardogQuery} from './types';

const examinationSource = ({fiscalCode = ''}: Pick<PatientBasicInfo, 'fiscalCode'>) => `
SELECT (COUNT(*) AS ?count)
WHERE
{
    [ 
        cpv:taxCode "${fiscalCode}" ;
        fse:hasMedicalRecord / fse:hasExaminationRecord / fse:hasMedicalExamination ?e
    ]
}
`;

const symptomSource = ({fiscalCode = ''}: Pick<PatientBasicInfo, 'fiscalCode'>) => `
SELECT (COUNT(*) AS ?count)
WHERE
{
    [ 
        cpv:taxCode "${fiscalCode}" ;
        fse:hasMedicalRecord / fse:hasSymptomRecord / fse:personHasSymptom ?s
    ]
}
`;

const diseaseSource = ({fiscalCode = ''}: Pick<PatientBasicInfo, 'fiscalCode'>) => `
SELECT (COUNT(*) AS ?count)
WHERE
{
    [ 
        cpv:taxCode "${fiscalCode}" ;
        fse:hasMedicalRecord / fse:hasDiseaseRecord / fse:hasDisease ?d
    ]
}
`;

export const fetchExaminationRecord = async (parameters: Pick<PatientBasicInfo, 'fiscalCode'>) =>
  stardogQuery({
    source: examinationSource,
    reasoning: true,
  }, parameters)
    .then(x => x.map(pickValue('count')) as [{count: number}])
    .then(x => x[0].count);

export const fetchSymptomRecord = async (parameters: Pick<PatientBasicInfo, 'fiscalCode'>) =>
  stardogQuery({
    source: symptomSource,
    reasoning: true,
  }, parameters)
    .then(x => x.map(pickValue('count')) as [{count: number}])
    .then(x => x[0].count);

export const fetchDiseaseRecord = async (parameters: Pick<PatientBasicInfo, 'fiscalCode'>) =>
  stardogQuery({
    source: diseaseSource,
    reasoning: true,
  }, parameters)
    .then(x => x.map(pickValue('count')) as [{count: number}])
    .then(x => x[0].count);
