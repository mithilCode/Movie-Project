import Booking from "../views/CRM/Booking";
import Dashboard from "../views/CRM/Dashboard";
import MovieList from "../views/CRM/MovieList";

export const appRoute = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/movie-list",
    element: <MovieList />,
  },
  {
    path: "/booking",
    element: <Booking />,
  },
]