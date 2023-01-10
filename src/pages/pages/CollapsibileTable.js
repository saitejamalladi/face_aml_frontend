import * as React from "react";
import {
  Box,
  Collapse,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import CorrectSymbol from "../../components/icons/CorrectSymbol";
import IncorrectSymbol from "../../components/icons/IncorrectSymbol";
import JSONPretty from "react-json-pretty";
import DisplayProfile from "./DisplayProfile";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={() => setOpen(!open)}
      >
        <TableCell component="th" scope="row">
          {row.hit_id}
        </TableCell>

        <TableCell>{row.name_matched}</TableCell>
        <TableCell align="right">{row.name_confidence}</TableCell>
        <TableCell align="right">
          {row.face_found ? <CorrectSymbol /> : <IncorrectSymbol />}
        </TableCell>
        <TableCell align="right">
          {row.face_matched ? <CorrectSymbol /> : <IncorrectSymbol />}
        </TableCell>
        <TableCell align="right">
          {((row?.face_match_score || 0) / 100)?.toFixed(3) || "-"}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container>
              <Grid item md={3}>
                {row.face_found && (
                  <DisplayProfile face={row.face_data} row={row} />
                )}
              </Grid>
              <Grid item md={9}>
                <Grid container spacing={2}>
                  <Grid item sm={12} md={4}>
                    <Typography variant={"h4"}>Rosette</Typography>
                    <Box>
                      <JSONPretty id="json-pretty" data={row.rosetteResponse} />
                    </Box>
                  </Grid>
                  <Grid item sm={12} md={4}>
                    <Typography variant={"h4"}>Face Image Data</Typography>
                    <Box>
                      {row.face_data ? (
                        <JSONPretty id="json-pretty" data={row.face_data} />
                      ) : (
                        " - "
                      )}
                    </Box>
                  </Grid>
                  <Grid item sm={12} md={4}>
                    <Typography variant={"h4"}>Face Comparision</Typography>
                    <Box>
                      {row.aws_response ? (
                        <JSONPretty id="json-pretty" data={row.aws_response} />
                      ) : (
                        " - "
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
export default function CollapsibleTable({ responseData: rows }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Hit Id</TableCell>
            <TableCell>Name Matched</TableCell>
            <TableCell align="right">Name Confidence</TableCell>
            <TableCell align="right">Face Found</TableCell>
            <TableCell align="right">Face Matched</TableCell>
            <TableCell align="right">Face Match Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
