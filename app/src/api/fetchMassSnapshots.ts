import { PatientBasicInfo } from "../model/patient";
import { pickValue } from "../utils/pickValue";
import { fetchSnapshots } from "./fetchSnapshots";
import { stardogQuery } from "./types";

export const fetchMassSnapshots = fetchSnapshots("kg");

// export type SnapshotRecord = {
//   dateTime: Date;
//   value: number;
// };

// const source = ({ fiscalCode }: Pick<PatientBasicInfo, "fiscalCode">) => `
// SELECT ?dateTime ?value
// WHERE
// {

//     [
//         cpv:taxCode "${fiscalCode}" ;
//         :hasEpisode [
//             mu:hasValue [ 
//                 mu:hasMeasurementUnit :kg ;
//                 mu:value ?value
//             ] ;
//             :atTimeInstant / ti:dateTime ?dateTime
//         ]
//     ]
// }
// ORDER BY DESC(?date)
// LIMIT 10
// `;

// export const fetchMassSnapshots = (
//   params: Pick<PatientBasicInfo, "fiscalCode">
// ) =>
//   stardogQuery(
//     {
//       source,
//       reasoning: true,
//     },
//     params
//   ).then(
//     (x) =>
//       x.map(pickValue("dateTime", "value")).map(({ dateTime, ...rest }) => ({
//         dateTime: new Date(dateTime),
//         ...rest,
//       })) as SnapshotRecord[]
//   );
