import {SnapshotRecord} from '../api/fetchSnapshots';
import {SnapshotCard} from './SnapshotCard';

interface FrequencyCardProps {
  readonly records: SnapshotRecord[];
}
const FrequencyCard = ({records}: FrequencyCardProps) => (
  <SnapshotCard
    records={records}
    uom="bpm"
    valueType="rate"
    title="Heart rate"
  />
);

export default FrequencyCard;
