import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/Paper";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useNavigate } from "react-router-dom";
import {
  getReservationByUser,
  cancelReservation,
  getReservationById,
} from "../../redux/actions";
import { useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux/es/exports";
import Swal from 'sweetalert2'
import dayjs, { Dayjs } from "dayjs";

const MyReservations = () => {
  const dispatch = useDispatch<Dispatch<any>>();
const navigation= useNavigate()
  const rows: any = useSelector<any>((state) => state.reservation);
  useEffect(() => {
    const userId = Number(sessionStorage.getItem("userId")) ?? 0;
    dispatch(getReservationByUser(userId));
  }, [dispatch]);

  const handleDelete = (id: number, dateFrom: string) => {
    console.log('first')
    if(dayjs(`${dateFrom} 12:00`).diff(dayjs(), 'hours') > 24){
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete the reservation?",
        showCancelButton: true,
        confirmButtonText: 'Yes',
        icon: 'warning',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dispatch(cancelReservation(id));
          Swal.fire('Success!', 'Reservation canceled!', 'success')
          console.log(rows)
        }
      })

    } else {
      Swal.fire({
        title: 'Sorry!',
        text: "You can't cancel a reservation 24 hours before the booked date!",
        icon: 'warning',
      })
    }
  };
    const handleUpdate = (id: number)=>{
        dispatch(getReservationById(id))
        navigation(`/reservation/${id}`)
    }
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Reservation No.</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Hotel</TableCell>
              <TableCell align="center">Date From</TableCell>
              <TableCell align="center">Date To</TableCell>
              <TableCell>Room</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length
              ? rows.map((row: any) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.countryName}</TableCell>
                    <TableCell>{row.hotelName}</TableCell>
                    <TableCell align="center">{row.dateFrom}</TableCell>
                    <TableCell align="center">{row.dateTo}</TableCell>
                    <TableCell>{row.roomNumber}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        component="label"
                        onClick={() => {
                          handleUpdate(row.id);
                        }}
                      >
                        <EditRoundedIcon />
                      </IconButton>
                        <IconButton
                          color="primary"
                          component="label"
                          onClick={() => {
                            handleDelete(row.id, row.dateFrom);
                          }}
                        >
                          <DeleteRoundedIcon />
                        </IconButton>
                    
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyReservations;
