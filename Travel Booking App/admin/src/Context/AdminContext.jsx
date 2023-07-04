import React, { createContext, useContext, useEffect, useReducer } from "react";
import { AdminReducer } from "../Reducer/AdminReducer";
import { useNavigate } from "react-router-dom";
import { api } from "../Utils/Api";

const Context = createContext();

const initialState = {
  admin: {},
  flights: [],
  bookings: [],
};

const AdminContext = ({ children }) => {
  const [state, dispatch] = useReducer(AdminReducer, initialState);
  const navigate = useNavigate();

  const fetchFlights = async () => {
    try {
      const res = await fetch(`${api}/api/flight/getAllFlights`);
      const data = await res.json();
      dispatch({ type: "SET_FLIGHTS", payload: data.flights });
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${api}/api/booking/getBookings`);
      const data = await res.json();
      dispatch({ type: "SET_BOOKINGS", payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("travel-book-admin");
    if (stored) dispatch({ type: "SET_ADMIN", payload: JSON.parse(stored) });
    else navigate("../login");
  }, [navigate]);

  useEffect(() => {
    fetchBookings();
    fetchFlights();
  }, [state]);

  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

const useGlobalContext = () => useContext(Context);
export { AdminContext, useGlobalContext };
