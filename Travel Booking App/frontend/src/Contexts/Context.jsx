import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Reducer } from "../Reducers/Reducer";
import { useNavigate } from "react-router-dom";
import { api } from "../Utils/Api";

const BookContext = createContext();
const initialState = {
  user: {},
  flights: [],
  singleFlight: {},
  bookings: [],
};

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const navigate = useNavigate();

  const getFlights = async (filterFields) => {
    try {
      const res = await fetch(`${api}/api/flight/getFlightsByDateTime`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filterFields),
      });
      const data = await res.json();

      if (data.success)
        dispatch({ type: "SET_FLIGHTS", payload: data.flights });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSingleFlight = async (id) => {
    try {
      const res = await fetch(`${api}/api/flight/getFlight/${id}`);
      const data = await res.json();

      if (data.success)
        dispatch({ type: "SET_SINGLE_FLIGHT", payload: data.flight });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllBookings = async () => {
    try {
      const res = await fetch(`${api}/api/booking/getAllBookings`, {
        method: "GET",
        headers: {
          "Content-Type": "application-json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });
      const data = await res.json();

      if (data.success)
        dispatch({ type: "SET_BOOKINGS", payload: data.bookings });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("travel-book-app-user"));
    if (stored) dispatch({ type: "SET_USER", payload: stored });
    else dispatch({ type: "REMOVE_USER" });
  }, [navigate]);

  return (
    <BookContext.Provider
      value={{
        ...state,
        getFlights,
        getSingleFlight,
        dispatch,
        getAllBookings,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

const useGlobalContext = () => useContext(BookContext);
export { useGlobalContext, Context };
