import {SnapshotRecord} from '../api/fetchSnapshots';
import {SnapshotCard} from './SnapshotCard';

interface MassCardProps {
  readonly records: SnapshotRecord[];
}
const MassCard = ({records}: MassCardProps) => (
  <SnapshotCard
    differential
    records={records}
    uom="Kg"
    valueType="weight"
    title="Weight"
  />
);

export default MassCard;
