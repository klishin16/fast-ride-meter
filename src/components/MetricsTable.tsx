import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableProps, TableRow } from "@mui/material";
import React from "react";
import { IMetric } from "../models/IMetric";


interface ILightMetricsProps {
  metrics: IMetric[],
  remove?: (id: string) => void,
  hideRemove?: boolean,
}

const MetricsTable: React.FC<TableProps & ILightMetricsProps> = ({metrics, remove, hideRemove,...props}) => {

  return (
    <TableContainer>
      <Table sx={{ width: 1 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Red delta</TableCell>
            <TableCell align="center">Green delta</TableCell>
            <TableCell align="center">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {metrics.map((metric) => (
            <TableRow
              key={metric.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{metric.greenDelta}</TableCell>
              <TableCell align="center">{metric.redDelta}</TableCell>
              <TableCell align="center">{metric.time.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MetricsTable
