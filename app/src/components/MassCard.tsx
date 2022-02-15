import { Typography } from "@mui/material";
import { SnapshotRecord } from "../api/fetchMassSnapshots";
import { SnapshotCard } from "./SnapshotCard";

interface MassCardProps {
  readonly records: SnapshotRecord[];
}
function MassCard({ records }: MassCardProps) {
  return (
    <SnapshotCard
      records={records}
      uom="Kg"
      valueType="weight"
      title="Weight"
    />
  );
}

export default MassCard;
