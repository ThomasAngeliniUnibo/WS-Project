import { PatientBasicInfo } from "../model/patient"
import { pickValue } from "../utils/pickValue";
import { stardogQuery } from "./types";

const source = ({ fiscalCode }: Pick<PatientBasicInfo, 'fiscalCode'>) => `
SELECT (COUNT(*) as ?count)
WHERE
{
    [ 
        cpv:taxCode "${fiscalCode}" ;
        :personHasBloodAnalysis ?a
    ]
}
`;

export const fetchBloodTestCount = (
    params: Pick<PatientBasicInfo, 'fiscalCode'>
) => 
  stardogQuery({
      source,
      reasoning: true,
  }, params)
    .then((x) => x.map(pickValue('count')) as [{ count: number }])
    .then((x) => x[0].count);