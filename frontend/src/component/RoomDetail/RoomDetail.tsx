import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  TextField,
  MenuItem,
  IconButton,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Slider from "./Slider";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getSingleProperty } from "../../store/userSlice";
import Loading from "../Loading/Loading";
import {
  createCheckoutSession,
  redirectToCheckout,
  resetPaymentState,
} from "../../store/paymentSlice";

const SidePanel = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
}));

interface MoveInDetails {
  moveInDate: string;
  duration: string;
}

interface CustomerDetails {
  name: string;
  email: string;
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface Errors {
  name?: string;
  email?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  moveInDate?: string;
}

interface Amenity {
  key: string;
  value: boolean;
}

interface Property {
  id: number;
  propertyName: string;
  location: string;
  noofrooms: string;
  propertyType: string;
  roomType: string;
  securityDeposit: number;
  monthlyRent: number;
  amenities: Amenity[];
  rating: number;
  reviews: number;
  description: string;
  houseRules: string;
  gender: string;
}

const RoomDetails: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { singlePropLoading, singleProperty: pgData } = useSelector(
    (state: RootState) => state.user
  ) as { singlePropLoading: boolean; singleProperty: Property };
  const {
    sessionId,
    loading: paymentLoading,
    error: paymentError,
  } = useSelector((state: RootState) => state.payment);

  const [moveInDetails, setMoveInDetails] = useState<MoveInDetails>({
    moveInDate: "",
    duration: "1 month", // Default to 1 month
  });

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    email: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "IN",
  });

  const [errors, setErrors] = useState<Errors>({});

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!customerDetails.name) newErrors.name = "Name is required";
    if (!customerDetails.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(customerDetails.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!customerDetails.addressLine1)
      newErrors.addressLine1 = "Address is required";
    if (!customerDetails.city) newErrors.city = "City is required";
    if (!customerDetails.state) newErrors.state = "State is required";
    if (!customerDetails.postalCode)
      newErrors.postalCode = "Postal Code is required";
    if (!customerDetails.country) newErrors.country = "Country is required";
    if (!moveInDetails.moveInDate)
      newErrors.moveInDate = "Move-in date is required";
    else if (moveInDetails.moveInDate < today)
      newErrors.moveInDate = "Date must be today or in the future";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMoveInDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMoveInDetails({ ...moveInDetails, moveInDate: event.target.value });
    setErrors({ ...errors, moveInDate: undefined });
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMoveInDetails({ ...moveInDetails, duration: event.target.value });
  };

  const handleCustomerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerDetails({
      ...customerDetails,
      [event.target.name]: event.target.value,
    });
    setErrors({ ...errors, [event.target.name]: undefined });
  };

  useEffect(() => {
    if (!propertyId) return;
    dispatch(getSingleProperty(propertyId));
    return () => {
      dispatch(resetPaymentState());
    };
  }, [dispatch, propertyId]);

  useEffect(() => {
    if (sessionId) {
      redirectToCheckout(sessionId).catch((error) => {
        console.error("Redirect to Checkout failed:", error);
      });
    }
  }, [sessionId]);

  const visibleAmenities = pgData?.amenities?.filter((a) => a.value === true);

  const noOfRooms = parseInt(pgData?.noofrooms || "0", 10);
  let availability = "Available";
  let availabilityColor = "#e0f7fa";
  let availabilityTextColor = "#00acc1";

  if (noOfRooms === 0) {
    availability = "Booked";
    availabilityColor = "#ffebee";
    availabilityTextColor = "#f44336";
  } else if (noOfRooms <= 2) {
    availability = "Few Rooms Left";
    availabilityColor = "#fff3e0";
    availabilityTextColor = "#ff9800";
  }

  const splitHouseRules = (houseRules: string) =>
    houseRules?.split("\n").map((rule, index) => (
      <li key={index} style={{ marginBottom: "8px" }}>
        <Typography variant="body2">{rule}</Typography>
      </li>
    ));

  const getDurationInMonths = (duration: string) => {
    switch (duration) {
      case "1 month":
        return 1;
      case "3 months":
        return 3;
      case "6 months":
        return 6;
      case "12 months":
        return 12;
      default:
        return 1;
    }
  };

  const handleBookIt = () => {
    if (!pgData) return;

    if (!validateForm()) {
      return;
    }

    const months = getDurationInMonths(moveInDetails.duration);
    // const totalAmount = pgData.monthlyRent * months + pgData.securityDeposit; // Convert to cents
    const totalAmount =
      (Number(pgData.monthlyRent) * months + Number(pgData.securityDeposit)) *
      100;

    console.log("totalAMount", totalAmount);

    const data = {
      moveInDate: moveInDetails.moveInDate,
      duration: moveInDetails.duration,
      totalAmount: totalAmount,
    };

    // console.log(data, "data");
    localStorage.setItem("data", JSON.stringify(data));
    dispatch(
      createCheckoutSession({
        propertyId: pgData.id,
        amount: totalAmount,
        description: `Booking for ${pgData.propertyName} for ${moveInDetails.duration}`,
        customerDetails,
      })
    );
  };

  return (
    <>
      {singlePropLoading ? (
        <Loading />
      ) : (
        <Container sx={{ maxWidth: "1600px !important" }}>
          <Box
            sx={{
              padding: { xs: 2, md: 4 },
              backgroundColor: "#fff",
              minHeight: "100vh",
            }}
          >
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Grid container>
                  <Grid size={{ xs: 12 }}>
                    <Slider />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <CardContent sx={{ flexGrow: 1, padding: "24px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Typography variant="h5" fontWeight="bold">
                          {pgData.propertyName}
                        </Typography>
                        <Chip
                          label={availability}
                          size="small"
                          sx={{
                            backgroundColor: availabilityColor,
                            color: availabilityTextColor,
                            fontSize: "12px",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {pgData.location}
                      </Typography>
                      {/* Rest of the left panel remains unchanged */}
                      <Grid container sx={{ mb: 1 }} spacing={1}>
                        <Grid size={{ xs: 6 }}>
                          <Box
                            sx={{
                              border: 1,
                              padding: 1,
                              borderRadius: 2,
                              borderColor: "#9f9b9b",
                            }}
                          >
                            <Typography variant="body2" color="text.primary">
                              Room Type
                            </Typography>
                            <Typography variant="body1">
                              {pgData.propertyType}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                          <Box
                            sx={{
                              border: 1,
                              padding: 1,
                              borderRadius: 2,
                              borderColor: "#9f9b9b",
                            }}
                          >
                            <Typography variant="body2" color="text.primary">
                              Occupancy
                            </Typography>
                            <Typography variant="body1">
                              {pgData.roomType}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid container spacing={1} mb={1}>
                        <Grid size={{ xs: 6 }}>
                          <Box
                            sx={{
                              border: 1,
                              padding: 1,
                              borderRadius: 2,
                              borderColor: "#9f9b9b",
                            }}
                          >
                            <Typography variant="body2" color="text.primary">
                              Security Deposit
                            </Typography>
                            <Typography variant="body1">
                              ₹{pgData.securityDeposit}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                          <Box
                            sx={{
                              border: 1,
                              padding: 1,
                              borderRadius: 2,
                              borderColor: "#9f9b9b",
                            }}
                          >
                            <Typography variant="body2" color="text.primary">
                              Gender
                            </Typography>
                            <Typography variant="body1">
                              {pgData.gender}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid container spacing={1} mb={2}>
                        <Grid size={{ xs: 12 }}>
                          <Box
                            sx={{
                              border: 1,
                              padding: 1,
                              borderRadius: 2,
                              borderColor: "#9f9b9b",
                            }}
                          >
                            <Typography variant="body2" color="text.primary">
                              Monthly Rent
                            </Typography>
                            <Typography variant="body1">
                              ₹{pgData.monthlyRent}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      <Typography
                        variant="h6"
                        color="text.primary"
                        gutterBottom
                      >
                        Amenities
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        {visibleAmenities?.map((amenity, index) => (
                          <Chip
                            key={index}
                            label={amenity.key}
                            size="small"
                            sx={{ backgroundColor: "#f5f5f5" }}
                          />
                        ))}
                      </Box>
                      <Typography
                        variant="h6"
                        color="text.primary"
                        gutterBottom
                      >
                        Description
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                      >
                        {pgData.description}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="text.primary"
                        gutterBottom
                      >
                        House Rules
                      </Typography>
                      <ul style={{ paddingLeft: 20, color: "#757575" }}>
                        {splitHouseRules(pgData.houseRules)}
                      </ul>
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <SidePanel>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="h6"
                        color="primary"
                        fontWeight="bold"
                      >
                        ₹{pgData.monthlyRent}/month
                      </Typography>
                      <Box
                        sx={{ ml: 1, display: "flex", alignItems: "center" }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          ★ {pgData.rating} ({pgData.reviews} reviews)
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton>
                      <FavoriteBorderIcon sx={{ color: "#757575" }} />
                    </IconButton>
                  </Box>
                  <TextField
                    label="Move-In Date"
                    type="date"
                    value={moveInDetails.moveInDate}
                    onChange={handleMoveInDateChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ min: today }}
                    error={!!errors.moveInDate}
                    helperText={errors.moveInDate}
                  />
                  <TextField
                    label="Duration of Stay"
                    select
                    value={moveInDetails.duration}
                    onChange={handleDurationChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    InputLabelProps={{ shrink: true }}
                  >
                    <MenuItem value="1 month">1 month</MenuItem>
                    <MenuItem value="3 months">3 months</MenuItem>
                    <MenuItem value="6 months">6 months</MenuItem>
                    <MenuItem value="12 months">12 months</MenuItem>
                  </TextField>
                  <TextField
                    label="Full Name"
                    name="name"
                    value={customerDetails.name}
                    onChange={handleCustomerChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={customerDetails.email}
                    onChange={handleCustomerChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <TextField
                    label="Address Line 1"
                    name="addressLine1"
                    value={customerDetails.addressLine1}
                    onChange={handleCustomerChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!errors.addressLine1}
                    helperText={errors.addressLine1}
                  />
                  <TextField
                    label="City"
                    name="city"
                    value={customerDetails.city}
                    onChange={handleCustomerChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!errors.city}
                    helperText={errors.city}
                  />
                  <TextField
                    label="State"
                    name="state"
                    value={customerDetails.state}
                    onChange={handleCustomerChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!errors.state}
                    helperText={errors.state}
                  />
                  <TextField
                    label="Postal Code"
                    name="postalCode"
                    value={customerDetails.postalCode}
                    onChange={handleCustomerChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!errors.postalCode}
                    helperText={errors.postalCode}
                  />
                  <TextField
                    label="Country"
                    name="country"
                    value={customerDetails.country}
                    onChange={handleCustomerChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!errors.country}
                    helperText={errors.country}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleBookIt}
                    disabled={noOfRooms === 0 || paymentLoading}
                    sx={{
                      backgroundColor: "#000",
                      color: "#fff",
                      borderRadius: "8px",
                      textTransform: "none",
                      mb: 2,
                      "&:hover": { backgroundColor: "#333" },
                    }}
                  >
                    {paymentLoading ? "Processing..." : "Book It"}
                  </Button>
                  {paymentError && (
                    <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                      {paymentError}
                    </Typography>
                  )}
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      borderColor: "#000",
                      color: "#000",
                      borderRadius: "8px",
                      textTransform: "none",
                      "&:hover": { borderColor: "#333", color: "#333" },
                    }}
                  >
                    Contact Owner
                  </Button>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ mt: 1 }}
                  >
                    Usually responds within 24 hours
                  </Typography>
                </SidePanel>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </>
  );
};

export default RoomDetails;
