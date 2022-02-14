import { PatientBasicInfo } from "../model/patient";
import { pickValue } from "../utils/pickValue";
import { stardogQuery } from "./types";

const examinationSource = ({ fiscalCode = '' }: Pick<PatientBasicInfo, 'fiscalCode'>) => `
SELECT (COUNT(*) AS ?count)
WHERE
{
    [ 
        cpv:taxCode "${fiscalCode}" ;
        fse:hasMedicalRecord / fse:hasExaminationRecord / fse:hasMedicalExamination ?e
    ]
}
`;

const symptomSource = ({ fiscalCode = '' }: Pick<PatientBasicInfo, 'fiscalCode'>) => `
SELECT (COUNT(*) AS ?count)
WHERE
{
    [ 
        cpv:taxCode "${fiscalCode}" ;
        fse:hasMedicalRecord / fse:hasSymptomRecord / fse:personHasSymptom ?s
    ]
}
`;

const diseaseSource = ({ fiscalCode = '' }: Pick<PatientBasicInfo, 'fiscalCode'>) => `
SELECT (COUNT(*) AS ?count)
WHERE
{
    [ 
        cpv:taxCode "${fiscalCode}" ;
        fse:hasMedicalRecord / fse:hasDiseaseRecord / fse:hasDisease ?d
    ]
}
`;

export const fetchMedicalRecords = (params: Pick<PatientBasicInfo, 'fiscalCode'>) =>
  stardogQuery({
      source: examinationSource,
      reasoning: true,
  }, params)
    .then((x) => x.map(pickValue('count')) as [{ count: number }])
    .then((x) => x[0].count);