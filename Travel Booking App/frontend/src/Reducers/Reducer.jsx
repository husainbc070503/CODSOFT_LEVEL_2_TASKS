export const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "REMOVE_USER":
      return {
        ...state,
        user: {},
      };

    case "SET_FLIGHTS":
      return {
        ...state,
        flights: action.payload,
      };

    case "SET_SINGLE_FLIGHT":
      return {
        ...state,
        singleFlight: action.payload,
      };

    case "ADD_BOOKING":
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
      };

    case "SET_BOOKINGS":
      return {
        ...state,
        bookings: action.payload,
      };

    case "CANCEL_BOOKING":
      return {
        ...state,
        bookings: state.bookings.filter((book) => book._id !== action.payload),
      };

    default:
      return state;
  }
};
