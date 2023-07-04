export const AdminReducer = (state, action) => {
  switch (action.type) {
    case "SET_ADMIN":
      return {
        ...state,
        admin: action.payload,
      };

    case "SET_FLIGHTS":
      return {
        ...state,
        flights: action.payload,
      };

    case "SET_BOOKINGS":
      return {
        ...state,
        bookings: action.payload,
      };

    case "ADD_FLIGHT":
      return {
        ...state,
        flights: [...state.flights, action.payload],
      };

    case "UPDATE_FLIGHT":
      const { id, flight } = action.payload;
      let tempFlights = state.flights;

      tempFlights = tempFlights.map((f) => {
        if (f._id === id) {
          const arr = Object.keys(f);
          arr.map((i) => (f[i] = flight[i]));
          return f;
        }
        return f;
      });
      
      return {
        ...state,
        flights: tempFlights,
      };

    case "DELETE_FLIGHT":
      return {
        ...state,
        flights: state.flights.filter((f) => f._id !== action.payload),
      };

    default:
      return state;
  }
};
