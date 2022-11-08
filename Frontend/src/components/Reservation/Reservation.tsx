import React, { useState, useEffect } from "react";
// import * as yup from "yup";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  getAllRoomsByHotel,
  postReservation,
  getReservationById,
  updateReservation,
} from "../../redux/actions";
import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  TextField,
  Card,
  Button,
  Grid,
} from "@mui/material";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useParams } from "react-router-dom";

const Reservation = () => {
  const { id } = useParams();
  const dispatch = useDispatch<Dispatch<any>>();
  const room: any = useSelector<any>((state) => state.rooms);
  const reservationId: any = useSelector<any>((state) => state.reservationId);
  interface iinitialValues {
    countryId: number;
    countryName: string;
    hotelId: number;
    hotelName: string;
    dateFrom: Dayjs | null;
    dateTo: Dayjs | null;
    roomId: number;
    roomNumber: string;
    userId: number;
  }
  const initialValues: iinitialValues = {
    countryId: 0,
    countryName: "None",
    hotelId: 0,
    hotelName: "None",
    dateFrom: null,
    dateTo: null,
    roomId: 0,
    roomNumber: "None",
    userId: 0,
  };

  interface iinitialDateVal {
    minDateTo: undefined | Dayjs;
    maxDateTo: undefined | Dayjs;
  }

  const initialDateVal: iinitialDateVal = {
    minDateTo: undefined,
    maxDateTo: undefined,
  };

  const [form, setForm] = useState(initialValues);
  const { hotelId, dateFrom, dateTo, roomId, roomNumber } = form;
  const [dateToVal, setDateToVal] = useState(initialDateVal);
  // const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const desc = room.find((r: { id: number }) => r.id === value).roomNumber;
    setForm({ ...form, [name]: value, roomNumber: desc });
  };

  const datePickerHandleChange = (newValue: number | null) => {
    setForm({ ...form, dateFrom: dayjs(newValue) });
    setDateToVal({
      minDateTo: dayjs(newValue).add(1, "day"),
      maxDateTo: dayjs(newValue).add(5, "day"),
    });
  };

  // const validationSchema = yup.object().shape({
  //   user: yup.string().required("Email is required"),
  //   password: yup
  //     .string()
  //     .min(8, "Password should be of minimum 8 characters length")
  //     .required("Password is required"),
  // });

  // const dispatch: Dispatch<any>= useDispatch()
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (dateFrom !== null && dateTo !== null) {
      if(id === undefined){
        dispatch(
          postReservation({
            ...form,
            dateFrom: dateFrom.format("YYYY-MM-DD"),
            dateTo: dateTo.format("YYYY-MM-DD"),
          })
        );
      } else {
        dispatch(
          updateReservation({
            id,
            dateFrom: dateFrom.format("YYYY-MM-DD"),
            dateTo: dateTo.format("YYYY-MM-DD"),
            roomId, 
            roomNumber,
          })
        );
      }
    }
  };

  useEffect(() => {
    if (Object.keys(reservationId).length > 0) {
      const {
        countryId,
        countryName,
        hotelId,
        hotelName,
        dateFrom,
        dateTo,
        roomId,
        roomNumber,
        userId,
      } = reservationId;
      setForm({
        ...form,
        countryId,
        countryName,
        hotelId,
        hotelName,
        dateFrom: dayjs(dateFrom),
        dateTo: dayjs(dateTo),
        roomId,
        roomNumber,
        userId,
      });
    }
  }, [reservationId]);

  useEffect(() => {
    if (id === undefined) {
      const countryId: number =
        Number(sessionStorage.getItem("countryId")) ?? 0;
      const countryName: string = sessionStorage.getItem("countryName") ?? "";
      const hotelId: number = Number(sessionStorage.getItem("hotelId")) ?? 0;
      const hotelName: string = sessionStorage.getItem("hotelName") ?? "";
      const userId: number = Number(sessionStorage.getItem("userId")) ?? "";

      setForm({
        ...form,
        countryId,
        countryName,
        hotelId,
        hotelName,
        userId,
      });
    }
  }, []);

  useEffect(() => {
    if (dateFrom !== null && dateTo !== null) {
      dispatch(
        getAllRoomsByHotel(
          hotelId,
          dateFrom.format("DD/MM/YYYY"),
          dateTo.format("DD/MM/YYYY")
        )
      );
    }
  }, [dispatch, dateFrom, dateTo]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Card sx={{ width: 275, p: 3 }}>
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ mb: 2 }} fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date From: "
                value={dateFrom}
                onChange={datePickerHandleChange}
                minDate={new Date().setDate(new Date().getDate() + 1)}
                maxDate={new Date().setMonth(new Date().getMonth() + 1)}
                renderInput={(params) => <TextField {...params} />}
                inputFormat={"DD/MM/YYYY"}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl sx={{ mb: 2 }} fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date To: "
                value={dateTo}
                onChange={(newValue) => {
                  setForm({ ...form, dateTo: dayjs(newValue) });
                }}
                minDate={dateToVal.minDateTo}
                maxDate={dateToVal.maxDateTo}
                renderInput={(params) => <TextField {...params} />}
                inputFormat={"DD/MM/YYYY"}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl sx={{ mb: 2 }} fullWidth>
            <InputLabel id="demo-simple-select-error-label">Room: </InputLabel>
            <Select
              labelId="demo-simple-select-error-label"
              id="roomId"
              value={roomId}
              label="Room: "
              name="roomId"
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value={0} key={0}>
                {<em>None</em>}
              </MenuItem>
              {room.map((e: { id: number; roomNumber: string }) => (
                <MenuItem value={e.id} key={e.id}>
                  {e.roomNumber}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText style={{ display: "none" }}>Error</FormHelperText>
          </FormControl>
          <Button type="submit" color="primary" fullWidth variant="contained">
            BOOK NOW
          </Button>
        </form>
      </Card>
    </Grid>
  );
};

export default Reservation;
