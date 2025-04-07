import React, { useEffect } from "react";
import {
  Box,
  Typography,
  CardContent,
  Grid,
  Chip,
  Container,
} from "@mui/material";

import Slider from "./Slider";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getSingleProperty } from "../../store/userSlice";
import Loading from "../Loading/Loading";
import { resetPaymentState } from "../../store/paymentSlice";

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

const ViewRoom: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { singlePropLoading, singleProperty: pgData } = useSelector(
    (state: RootState) => state.user
  ) as { singlePropLoading: boolean; singleProperty: Property };

  useEffect(() => {
    if (!propertyId) return;
    dispatch(getSingleProperty(propertyId));
    return () => {
      dispatch(resetPaymentState());
    };
  }, [dispatch, propertyId]);

  const visibleAmenities = pgData?.amenities?.filter((a) => a.value === true);

  const splitHouseRules = (houseRules: string) =>
    houseRules?.split("\n").map((rule, index) => (
      <li key={index} style={{ marginBottom: "8px" }}>
        <Typography variant="body2">{rule}</Typography>
      </li>
    ));

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
              <Grid size={{ xs: 12 }}>
                <Slider />
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
                        label={"Booked"}
                        size="small"
                        sx={{
                          backgroundColor: "green",
                          color: "white",
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
                    <Typography variant="h6" color="text.primary" gutterBottom>
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
                    <Typography variant="h6" color="text.primary" gutterBottom>
                      Description
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      {pgData.description}
                    </Typography>
                    <Typography variant="h6" color="text.primary" gutterBottom>
                      House Rules
                    </Typography>
                    <ul style={{ paddingLeft: 20, color: "#757575" }}>
                      {splitHouseRules(pgData.houseRules)}
                    </ul>
                  </CardContent>
                </Grid>
              </Grid>
            </Grid>
            {/* </Grid> */}
          </Box>
        </Container>
      )}
    </>
  );
};

export default ViewRoom;
