import { SnapshotRecord } from "../api/fetchSnapshots";
import { SnapshotCard } from "./SnapshotCard";

interface MassCardProps {
  readonly records: SnapshotRecord[];
}
function MassCard({ records }: MassCardProps) {
  return (
    <SnapshotCard
      differential
      records={records}
      uom="Kg"
      valueType="weight"
      title="Weight"
    />
  );
}

export default MassCard;