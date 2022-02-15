import { PatientBasicInfo } from "../model/patient";
import { pickValue } from "../utils/pickValue";
import { stardogQuery } from "./types";

export type ExaminationRecord = {
    date: Date,
    report: string,
    disease: string,
    symptom: string,
}

const source = ({ fiscalCode = '' }: Pick<PatientBasicInfo, 'fiscalCode'>) => `
SELECT ?date ?report ?symptom ?disease
WHERE
{
    [ 
        cpv:taxCode "${fiscalCode}" ;
        fse:hasMedicalRecord / fse:hasExaminationRecord / fse:hasMedicalExamination ?e
    ] .
        
    ?e fse:medicalReport ?report ;
        ti:date ?date ;
        fse:examinationDiseaseReport ?disease ;

    OPTIONAL { ?e fse:examinationSymptomRecord ?symptom }
}
ORDER BY DESC(?date)
`;

export const fetchExaminationRecordData = (params: Pick<PatientBasicInfo, 'fiscalCode'>) =>
  stardogQuery({
      source,
      reasoning: true,
  }, params)
    .then((x) => x.map(pickValue('date', 'report', 'disease', 'symptom')) as ExaminationRecord[])