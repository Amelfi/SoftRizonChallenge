import axios from "axios";
import { Dispatch } from "redux";
import { types } from "../types";

export const getAllCountries = () => {
  return async function (dispatch: Dispatch) {
    const json = await axios.get(`http://localhost:8000/countries`);
    dispatch({
      type: types.GET_ALL_COUNTRIES,
      payload: json.data,
    });
  };
};

export const getAllUser = () => {
  return async function (dispatch: Dispatch) {
    const json = await axios.get(`http://localhost:8000/users`);
    dispatch({
      type: types.GET_ALL_USERS,
      payload: json.data,
    });
  };
};
export const getAllRoomsByHotel = (
  hotelId: number,
  dateFrom: string,
  dateTo: string
) => {
  return async function (dispatch: Dispatch) {
    let availableRooms = [];
    if (hotelId > 0 && dateFrom !== "" && dateTo !== "") {
      const rooms = await axios.get(
        `http://localhost:8000/rooms?hotelId=${hotelId}`
      );
      const reservations = await axios.get(
        `http://localhost:8000/reservation?hotelId=${hotelId}`
      );
      const filteredRes = reservations.data.filter(
        (r: any) =>
          (dateFrom >= r.dateFrom && dateFrom < r.dateTo) ||
          (dateTo > r.dateFrom && dateTo <= r.dateTo) ||
          (dateFrom <= r.dateFrom && dateTo >= r.dateTo) ||
          (dateFrom >= r.dateFrom && dateTo <= r.dateTo)
      );
      availableRooms = rooms.data.filter((r: { id: Number }) => {
        const notAvailable = filteredRes.filter(
          (res: { rooms: Number }) => r.id === res.rooms
        );
        if (notAvailable.length === 0) return true;
        return false;
      });
    }
    dispatch({
      type: types.GET_ALL_ROOMS_BY_HOTEL,
      payload: availableRooms,
    });
  };
};
export const getAllHotels = () => {
  return async function (dispatch: Dispatch) {
    const json = await axios.get(`http://localhost:8000/hotels`);
    dispatch({
      type: types.GET_ALL_HOTELS,
      payload: json.data.sort(
        (a: { countryId: number }, b: { countryId: number }) =>
          a.countryId > b.countryId ? 1 : -1
      ),
    });
  };
};
export const getReservationByUser = (userId: number) => {
  return async function (dispatch: Dispatch) {
    const json = await axios.get(
      `http://localhost:8000/reservation?userId=${userId}&canceled=false`
    );
    dispatch({
      type: types.GET_RESERVATION_BY_USER,
      payload: json.data,
    });
  };
};

export const getReservationById = (id: number) => {
  return async function (dispatch: Dispatch) {
    const json = await axios.get(
      `http://localhost:8000/reservation/${id}?canceled=false`
    );
    dispatch({
      type: types.GET_RESERVATION_BY_ID,
      payload: json.data,
    });
  };
};
export const postReservation = (payload: object) => {
  return async function (dispatch: Dispatch) {
    console.log(payload);
    const json = await axios.post(`http://localhost:8000/reservation`, {
      ...payload,
      canceled: false,
    });
    dispatch({
      type: types.POST_RESERVATION,
      payload: json.data,
    });
  };
};
export const updateReservation = (payload: any) => {
  return async function (dispatch: Dispatch) {
    const json = await axios.patch(
      `http://localhost:8000/reservation/${payload.id}`,
      payload
    );
    dispatch({
      type: types.GET_RESERVATION_BY_USER,
      payload: json.data,
    });
  };
};
export const cancelReservation = (id: number) => {
  return async function (dispatch: Dispatch) {
    const json = await axios.patch(`http://localhost:8000/reservation/${id}`, {
      canceled: true,
    });
    dispatch({
      type: types.CANCEL_RESERVATION,
      payload: json.data,
    });
  };
};

export const reset = (payload: object) => {
  return async function (dispatch: Dispatch) {
    console.log(payload);
    const json = await axios.post(`http://localhost:8000/reservation`, {
      ...payload,
      canceled: false,
    });
    dispatch({
      type: types.POST_RESERVATION,
      payload: json.data,
    });
  };
};
