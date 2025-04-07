// import React from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   Chip,
//   Stack,
// } from "@mui/material";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

// // Define the interface for the booking data
// interface Booking {
//   propertyId: string;
//   propertyName: string;
//   location: string;
//   monthlyRent: string;
//   securityDeposit?: string;
//   roomType: string;
//   gender?: string;
//   description?: string;
//   houseRules?: string;
//   noofrooms?: string;
//   moveInDate: string;
//   duration: string;
//   amount?: string;
//   status?: "Active" | "Upcoming" | "Completed";
// }

// // Sample data (you can replace this with your actual data array)
// const bookings: Booking[] = [
//   {
//     propertyId: "bb114b4f-a134-4ff6-a2f5-40a9cf6e816f",
//     propertyName: "Uttarakhand PG",
//     location: "Delhi Gateway Residences",
//     monthlyRent: "12000",
//     roomType: "Double Sharing",
//     moveInDate: "2025-04-08",
//     duration: "1 month",
//     status: "Upcoming",
//   },
//   {
//     propertyId: "bb214b4f-a134-4ff6-a2f5-40a9cf6e816f",
//     propertyName: "Modern PG in Koramangala",
//     location: "Koramangala 5th Block, Bangalore",
//     monthlyRent: "15000",
//     roomType: "Single Sharing",
//     moveInDate: "2024-03-01",
//     duration: "6 months",
//     status: "Active",
//   },
//   {
//     propertyId: "bb314b4f-a134-4ff6-a2f5-40a9cf6e816f",
//     propertyName: "Luxury PG in HSR Layout",
//     location: "HSR Layout, Bangalore",
//     monthlyRent: "18000",
//     roomType: "Double Sharing",
//     moveInDate: "2024-04-15",
//     duration: "12 months",
//     status: "Upcoming",
//   },
//   {
//     propertyId: "bb414b4f-a134-4ff6-a2f5-40a9cf6e816f",
//     propertyName: "Student Housing in Whitefield",
//     location: "Whitefield, Bangalore",
//     monthlyRent: "12000",
//     roomType: "Triple Sharing",
//     moveInDate: "2024-01-01",
//     duration: "3 months",
//     status: "Completed",
//   },
// ];

// const BookedRooms: React.FC = () => {
//   const handleViewDetails = (propertyId: string) => {
//     console.log(`Viewing details for property ${propertyId}`);
//     // Add your logic here
//   };

//   const handleCancelBooking = (propertyId: string) => {
//     console.log(`Cancelling booking for property ${propertyId}`);
//     // Add your logic here
//   };

//   return (
//     <Box sx={{ p: 3, backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 4,
//         }}
//       >
//         <Typography variant="h5" gutterBottom>
//           My Booked Rooms
//         </Typography>
//         <Button variant="contained" color="primary">
//           List Your Property
//         </Button>
//       </Box>

//       {bookings.map((booking) => (
//         <Card
//           key={booking.propertyId}
//           sx={{ mb: 3, borderRadius: 2, boxShadow: 1 }}
//         >
//           <CardContent>
//             <Stack
//               direction="row"
//               justifyContent="space-between"
//               alignItems="center"
//               mb={2}
//             >
//               <Typography variant="h6" color="primary">
//                 {booking.propertyName}
//               </Typography>
//               <Typography variant="h6" color="text.primary">
//                 ₹{booking.monthlyRent}/month
//               </Typography>
//             </Stack>

//             <Stack direction="row" alignItems="center" spacing={1} mb={2}>
//               <LocationOnIcon color="action" />
//               <Typography variant="body2" color="text.secondary">
//                 {booking.location}
//               </Typography>
//             </Stack>

//             <Stack
//               direction="row"
//               spacing={2}
//               mb={2}
//               sx={{
//                 display: "flex",
//               }}
//             >
//               <Box sx={{ border: 1, borderRadius: 2, p: 1, width: "20rem" }}>
//                 <Typography variant="body2" color="text.secondary">
//                   Room Type
//                 </Typography>
//                 <Typography variant="body1">{booking.roomType}</Typography>
//               </Box>
//               <Box sx={{ border: 1, borderRadius: 2, width: "20rem", p: 1 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   Check-in Date
//                 </Typography>
//                 <Typography variant="body1">{booking.moveInDate}</Typography>
//               </Box>
//               <Box sx={{ border: 1, borderRadius: 2, width: "20rem", p: 1 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   Duration
//                 </Typography>
//                 <Typography variant="body1">{booking.duration}</Typography>
//               </Box>
//             </Stack>

//             <Stack direction="row" spacing={2} mt={2}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => handleViewDetails(booking.propertyId)}
//               >
//                 View Details
//               </Button>
//             </Stack>
//           </CardContent>
//         </Card>
//       ))}
//     </Box>
//   );
// };

// export default BookedRooms;

import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchBookedProperties } from "../../store/userSlice";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";

const BookedRooms: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { bookLoading, bookData: bookings } = useSelector(
    (state: RootState) => state.user
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleViewDetails = (propertyId: string) => {
    console.log(`Viewing details for property ${propertyId}`);
    navigate(`/booked/${propertyId}`);
  };

  useEffect(() => {
    dispatch(fetchBookedProperties());
  }, []);

  return (
    <>
      {bookLoading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            p: { xs: 2, md: 4 },
            backgroundColor: "#f5f7fa",
            minHeight: "100vh",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              mb: 4,
              gap: 2,
            }}
          >
            <Typography variant="h5" fontWeight={600}>
              My Booked Rooms
            </Typography>
            <Button variant="contained" color="primary">
              List Your Property
            </Button>
          </Box>

          {/* Booking Cards */}
          {bookings.map((booking) => (
            <Card
              key={booking.propertyId}
              sx={{ mb: 3, borderRadius: 2, boxShadow: 1 }}
            >
              <CardContent>
                {/* Title & Rent */}
                <Stack
                  direction={isMobile ? "column" : "row"}
                  justifyContent="space-between"
                  alignItems={isMobile ? "flex-start" : "center"}
                  mb={2}
                  spacing={1}
                >
                  <Typography variant="h6" color="primary">
                    {booking.propertyName}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="h6" color="text.primary">
                      ₹{booking.monthlyRent}/month
                    </Typography>
                  </Box>
                </Stack>

                {/* Location */}
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <LocationOnIcon color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    {booking.location}
                  </Typography>
                </Stack>

                {/* Room Details */}
                <Grid container spacing={2} mb={2}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Box
                      border={1}
                      borderRadius={2}
                      p={2}
                      borderColor={"#757575"}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Room Type
                      </Typography>
                      <Typography variant="body1">
                        {booking.roomType}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Box
                      border={1}
                      borderRadius={2}
                      p={2}
                      borderColor={"#757575"}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Check-in Date
                      </Typography>
                      <Typography variant="body1">
                        {booking.moveInDate}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Box
                      border={1}
                      borderRadius={2}
                      p={2}
                      borderColor={"#757575"}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Duration
                      </Typography>
                      <Typography variant="body1">
                        {booking.duration}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* Actions */}
                <Stack direction="row" spacing={2} mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewDetails(booking.propertyId)}
                  >
                    View Details
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
};

export default BookedRooms;
