import {PatientBasicInfo} from '../model/patient';
import {pickValue} from '../utils/pickValue';
import {SnapshotRecord} from './fetchSnapshots';
import {stardogQuery} from './types';

export type Aggregator = 'max' | 'min' | 'avg' | 'none';

type Parameters_ = Pick<PatientBasicInfo, 'fiscalCode'> &
{
  aggregator: Aggregator;
  physicalEntity: string;
};

const source = ({fiscalCode, aggregator, physicalEntity}: Parameters_) => `
SELECT ?dateTime ?value
WHERE {
    [
        cpv:taxCode "${fiscalCode}";
        :personHasAnalysis [
            mu:hasValue [
                :hasPhisicalEntity [ a ${physicalEntity} ];
                mu:value ?value ;
                ${aggregator !== 'none' ? `:hasMeasureAggregator :${aggregator}` : ''}
            ] ;
            :atTimeInstant / ti:dateTime ?dateTime
        ]
    ] . 
}
ORDER BY ASC(?dateTime)
LIMIT 10
`;

export const fetchAnalysis = (aggregator: Aggregator, physicalEntity: string) => async (
  parameters: Pick<PatientBasicInfo, 'fiscalCode'>,
) =>
  stardogQuery({
    source,
    reasoning: true,
  }, {
    aggregator,
    physicalEntity,
    ...parameters,
  })
    .then(x => x.map(pickValue('dateTime', 'value')).map(({dateTime, ...rest}) => ({
      dateTime: new Date(dateTime),
      ...rest,
    })) as SnapshotRecord[],
    );
