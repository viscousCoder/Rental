// import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Rootfile from "./component/RootFile/Rootfile";
import Register from "./component/Register/Register";
import Login from "./component/Login/Login";
import AdminTable from "./component/Table/AdminTable";
import Cancel from "./component/Payments/Cancel";
import Success from "./component/Payments/Success";
import RoomDetails from "./component/RoomDetail/RoomDetail";
import PropertyListing from "./component/PropertyListing/PropertyListing";
import RoomList from "./component/RoomList/RoomList";
import { checkAuthLoader } from "./utils/checkAuth";
import BookedRooms from "./component/Booked/Booked";
import ViewRoom from "./component/Booked/ViewRoom";
import ListedProperties from "./component/ListedProperty/ListedProperty";

function App() {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Rootfile />,
      loader: checkAuthLoader,
      children: [
        {
          path: "/",
          element: <RoomList />,
        },
        {
          path: "/table",
          element: <AdminTable />,
        },
        {
          path: "/property-listing",
          element: <PropertyListing />,
        },

        {
          path: "/room-detail/:propertyId",
          element: <RoomDetails />,
        },
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/cancel",
          element: <Cancel />,
        },
        {
          path: "/booked",
          element: <BookedRooms />,
        },
        {
          path: "/booked/:propertyId",
          element: <ViewRoom />,
        },
        {
          path: "/listedProperty",
          element: <ListedProperties />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
