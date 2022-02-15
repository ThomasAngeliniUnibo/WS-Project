import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { deepPurple, red } from "@mui/material/colors";
import { diff, zip, zipWith } from "../utils/arrays";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Bar,
} from "recharts";
import { SnapshotRecord } from "../api/fetchSnapshots";

interface SnapshotCardProps {
  readonly records: SnapshotRecord[];
  readonly title: string;
  readonly differential?: boolean;
  readonly uom: string;
  readonly valueType: string;
}

const formatXAxis = (date: Date): string =>
  `${date.getFullYear().toString()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

export const SnapshotCard: FC<SnapshotCardProps> = ({
  differential,
  title,
  records: unsorted,
  uom,
  valueType,
}) => {
  const makeTooltip: (
    uom: string
  ) => FC<{ active?: boolean; payload?: any[] }> =
    (uom: string) =>
    ({ active, payload }) => {
      if (active && payload && payload.length) {
        return (
          <Paper
            square
            component={Box}
            padding={2}
            display="flex"
            flexDirection="column"
            border="1px solid #888"
            sx={{ opacity: 0.9 }}
          >
            <Typography variant="h6">
              {payload[0].payload.dateTime.toLocaleDateString("en-US")}
            </Typography>
            <Typography variant="subtitle1">
              Value: {payload[0].payload[valueType]} {uom}
            </Typography>
            {payload[0].payload.differential && (
              <Typography variant="subtitle1">
                Differential: {payload[0].payload.differential} {uom}
              </Typography>
            )}
          </Paper>
        );
      }
      return null;
    };

  const records = unsorted
    .sort(({ dateTime: a }, { dateTime: b }) => a.getTime() - b.getTime())
    .map(({ dateTime, value }) => ({
      dateTime,
      [valueType]: value,
    }));
  const CustomTooltip = makeTooltip(uom);

  if (differential) {
    const differentials = zip(
      records.slice(1).map((x) => x[valueType]),
      records.map((x) => x[valueType])
    ).map(diff);

    const data = zipWith(
      [0, ...differentials],
      records
    )((differential, { dateTime, [valueType]: _valueType }) => ({
      differential,
      dateTime,
      [valueType]: _valueType,
    }));

    return (
      <Card
        sx={{
          p: 4,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="overline">{title}</Typography>
        <ResponsiveContainer width="100%" height={275}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="dateTime" tickFormatter={formatXAxis} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#0001" }} />
            <Legend />
            <Bar dataKey={valueType} barSize={20} fill={deepPurple[300]} />
            <Bar dataKey="differential" barSize={20} fill={red[300]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    );
  } else {
    return (
      <Card
        sx={{
          p: 4,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="overline">{title}</Typography>
        <ResponsiveContainer width="100%" height={275}>
          <BarChart data={records}>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="dateTime" tickFormatter={formatXAxis} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#0001" }} />
            <Legend />
            <Bar dataKey={valueType} barSize={20} fill={deepPurple[300]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    );
  }
};
