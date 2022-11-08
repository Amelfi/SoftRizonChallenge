import {types} from '../types'

interface initialStates{
  hotels: object[],
  users: object[],
  rooms: object[],
  reservation: object[],
  countries: object[],
  reservationId: object[]
}

const initialState: initialStates = {
 hotels: [],
 users: [],
 rooms: [],
 reservation: [],
 countries: [],
 reservationId:[]
};

type Action = { type: String, payload: object[]}


export default function reducer(state = initialState, { type, payload }: Action) {
  switch (type) {
    case "GET_ALL_COUNTRIES":
      return {
        ...state,
        countries: payload
        
      };
    case "GET_ALL_USERS":
      return {
        ...state,
        users: payload

      };
    case "GET_ALL_ROOMS_BY_HOTEL":
      
      return {
        ...state,
        rooms: payload,
        
      };
    case "GET_ALL_HOTELS":
      return {
        ...state,
        hotels: payload,
      };
    case "GET_RESERVATION_BY_USER":
      return {
        ...state,
        reservation: payload,
      };
    case "GET_RESERVATION_BY_ID":
      return {
        ...state,
        reservationId: payload,
      };
    case "POST_RESERVATION":
      return {
        ...state
        
      };
    case "UPDATE_RESERVATION":
      return {
        ...state,
      };

    case "CANCEL_RESERVATION":
      return {
        ...state,
        reservation: payload,
      };
    case "RESET":
      return {
        ...state,
        reservationId: [],
      };
     
    default:
      return state;
  }
}
