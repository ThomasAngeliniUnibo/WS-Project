import {PatientBasicInfo} from '../model/patient';
import {pickValue} from '../utils/pickValue';
import {stardogQuery} from './types';

export type SnapshotRecord = {
  dateTime: Date;
  value: number;
};

type Parameters_ = Pick<PatientBasicInfo, 'fiscalCode'> & {mu: string};

const source = ({fiscalCode, mu}: Parameters_) => `
SELECT ?dateTime ?value
WHERE
{
    [
        cpv:taxCode "${fiscalCode}" ;
        :hasEpisode [
            mu:hasValue [ 
                mu:hasMeasurementUnit :${mu} ;
                mu:value ?value
            ] ;
            :atTimeInstant / ti:dateTime ?dateTime
        ]
    ]
}
ORDER BY DESC(?date)
LIMIT 10
`;

export const fetchSnapshots = (mu: string) => async (
  parameters: Pick<PatientBasicInfo, 'fiscalCode'>,
) =>
  stardogQuery(
    {
      source,
      reasoning: true,
    },
    {
      mu,
      ...parameters,
    },
  ).then(
    x =>
      x.map(pickValue('dateTime', 'value')).map(({dateTime, ...rest}) => ({
        dateTime: new Date(dateTime),
        ...rest,
      })) as SnapshotRecord[],
  );
