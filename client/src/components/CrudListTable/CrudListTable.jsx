import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import Preloader from '../Preloader/Preloader';
import EditLink from '../EditLink/EditLink';
import DeleteLink from '../DeleteLink/DeleteLink';
import UpdateButton from '../UpdateButton/UpdateButton';

const CrudListTable = ({ rows, cols, loading }) => {
  const getCellLabelComponent = (col, value, row) => {
    if (col === 'actions') {
      return value.map(({ key, link }, index) => {
        if (key === 'edit') {
          return <EditLink link={link} key={`action-${key}-${col}-${index}`} />;
        }

        if (key === 'delete') {
          return <DeleteLink link={link} key={`action-${key}-${col}-${index}`} />;
        }

        if (key === 'allowUser' && row.role === 'waiting') {
          return <UpdateButton user={row} key={`action-${key}-${col}-${index}`} />;
        }
      });
    }

    return value;
  };

  return !loading ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {cols.map(({ label, key, ...rest }, index) => (
              <TableCell {...rest} key={`col-${key}-${index}`}>
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={`row-${index}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {cols.map(({ key, ...rest }, index) => (
                <TableCell {...rest} key={`row-${row[key]}-${index}`}>
                  {getCellLabelComponent(key, row[key], row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Preloader />
  );
};

export default CrudListTable;
