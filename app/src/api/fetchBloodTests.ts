import {PatientBasicInfo} from '../model/patient';
import {pickValue} from '../utils/pickValue';
import {SnapshotRecord} from './fetchSnapshots';
import {stardogQuery} from './types';

type Parameters_ = Pick<PatientBasicInfo, 'fiscalCode'> &
{
  bloodMeasurement: string;
};

const source = ({fiscalCode, bloodMeasurement}: Parameters_) => `
SELECT ?dateTime ?value
WHERE
{
    [
        cpv:taxCode "${fiscalCode}" ;
        :personHasBloodAnalysis [
            mu:hasValue [
                :hasBloodMeasurement cmo:${bloodMeasurement} ;
                mu:value ?value
            ] ;
            :atTimeInstant / ti:dateTime ?dateTime
        ]
    ]
}
ORDER BY ASC(?dateTime)
LIMIT 10
`;

export const fetchBloodTests = (bloodMeasurement: string) => async (
  parameters: Pick<PatientBasicInfo, 'fiscalCode'>,
) =>
  stardogQuery({
    source,
    reasoning: true,
  }, {
    bloodMeasurement,
    ...parameters,
  })
    .then(x => x.map(pickValue('dateTime', 'value')).map(({dateTime, ...rest}) => ({
      dateTime: new Date(dateTime),
      ...rest,
    })) as SnapshotRecord[],
    );
