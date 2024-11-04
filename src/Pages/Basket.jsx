import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { ContextPage } from "../ContextApi/ContextPage";
import { useContext } from "react";

export default function Basket() {
  const { basket, removeFromBasket, } = useContext(ContextPage);

  const handleClick = (item) => {
    removeFromBasket(item);
  };
    

  return (
    <TableContainer component={Paper} className="container basketpage">
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Adet</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket?.map((item, idx) => (
            <TableRow
              key={`${idx}es`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.title}
              </TableCell>
              <TableCell align="right">{item.adet}</TableCell>
              <TableCell align="right">{item.price} TL</TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleClick(item);
                  }}
                >
                  Remove From Basket
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


