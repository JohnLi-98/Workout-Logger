import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import EditIcon from "@material-ui/icons/Edit";

import styles from "./styles";
import { convertToDateTime } from "../../util/common-functions";
import DeleteSet from "./DeleteSet";

const TablePaginationActions = (props) => {
  const classes = styles();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;
  const handleFirstPageClick = (event) => {
    onChangePage(event, 0);
  };
  const handleBackClick = (event) => {
    onChangePage(event, page - 1);
  };
  const handleNextClick = (event) => {
    onChangePage(event, page + 1);
  };
  const handleLastPageClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>

      <IconButton
        onClick={handleBackClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>

      <IconButton
        onClick={handleNextClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>

      <IconButton
        onClick={handleLastPageClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const SetsTable = ({ exerciseId, sets }) => {
  const classes = styles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleRPPChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="Sets Table">
        <TableBody>
          {(rowsPerPage > 0
            ? sets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : sets
          ).map((set) => (
            <TableRow key={set.id}>
              <TableCell>
                <Accordion key={set.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel-content"
                    className={classes.accordionSummary}
                  >
                    <p>{`${convertToDateTime(set.createdAt)}: ${set.reps} ${
                      set.reps === 1 ? "rep" : "reps"
                    } @ ${set.weight} kg`}</p>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Grid container direction="column" justify="space-between">
                      <Grid container>
                        <Grid item xs={6}>
                          <p>{`Weight: ${set.weight} kg`}</p>
                          <p>Reps: {set.reps}</p>
                        </Grid>

                        <Grid item xs={6}>
                          <p>
                            Set logged on: {convertToDateTime(set.createdAt)}
                          </p>
                        </Grid>

                        <Grid item xs={12}>
                          <p>
                            Notes: {set.notes.length > 0 ? set.notes : "N/A"}
                          </p>
                        </Grid>
                      </Grid>

                      <Grid container justify="flex-end">
                        <IconButton
                          aria-label="edit set"
                          title="Edit Set"
                          className={classes.editButton}
                        >
                          <EditIcon />
                        </IconButton>

                        <DeleteSet exerciseId={exerciseId} setId={set.id} />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, { label: "All", value: -1 }]}
              colSpan={3}
              count={sets.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleRPPChange}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default SetsTable;
