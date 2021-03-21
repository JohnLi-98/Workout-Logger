import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  Link,
  Paper,
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
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { Link as RouterLink } from "react-router-dom";

import styles from "./styles";
import { convertToDateTime } from "../../util/common-functions";

const workoutDuration = (workoutStart, lastSet) => {
  let duration = Math.ceil((lastSet - workoutStart) / 1000 / 60);
  duration === 1 ? (duration += " minute") : (duration += " minutes");
  if (workoutStart + 14400000 > Date.now()) {
    duration += " (In Progress)";
  }
  return duration;
};

const WorkoutsTable = ({ workouts }) => {
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
    <Paper className={classes.paper}>
      <TableContainer>
        <Table className={classes.table} aria-label="Log Table">
          <TableHead>
            <TableRow>
              <TableCell>
                <h2>Date Done:</h2>
              </TableCell>
              <TableCell align="right">
                <h2>Duration:</h2>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {workouts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  className={classes.padding}
                >
                  You have no workouts logged
                </TableCell>
              </TableRow>
            ) : (
              (rowsPerPage > 0
                ? workouts.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : workouts
              ).map((workout) => (
                <TableRow key={workout.id}>
                  <TableCell>
                    <Link
                      component={RouterLink}
                      to={`my-workout-logs/${workout.id}`}
                    >
                      {convertToDateTime(workout.createdAt)}
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    {workoutDuration(
                      workout.createdAt,
                      workout.exercises[0].sets[0].createdAt
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20, { label: "All", value: -1 }]}
                colSpan={3}
                count={workouts.length}
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
    </Paper>
  );
};

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

export default WorkoutsTable;
