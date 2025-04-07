import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Grid,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { Close, Add } from "@mui/icons-material";
import { SelectChangeEvent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { createProperty } from "../../store/ownerProperty";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

// Define types for form data
interface FormData {
  propertyName: string;
  propertyType: string;
  location: string;
  monthlyRent: string;
  securityDeposit: string;
  roomType: string;
  noofrooms: string;
  gender: string;
  description: string;
  houseRules: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  amenities: { [key: string]: boolean };
  images: File[];
}

// Define types for form errors
interface FormErrors {
  propertyName?: string;
  propertyType?: string;
  location?: string;
  monthlyRent?: string;
  securityDeposit?: string;
  roomType?: string;
  noofrooms?: string;
  gender?: string;
  description?: string;
  houseRules?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
}

// Styled components
const PropertyContainer = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: "600px",
  margin: "auto",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const ListPropertyForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.owner);
  const navigate = useNavigate();
  // Initial amenities
  const initialAmenities = {
    WiFi: false,
    AC: false,
    Food: false,
    Laundry: false,
    "24/7 Security": false,
    Gym: false,
    Parking: false,
    TV: false,
    Geyser: false,
  };

  // State for form data
  const [formData, setFormData] = useState<FormData>({
    propertyName: "",
    propertyType: "PG",
    location: "",
    monthlyRent: "",
    securityDeposit: "",
    roomType: "Single Sharing",
    noofrooms: "",
    gender: "Male",
    description: "",
    houseRules: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    amenities: initialAmenities,
    images: [],
  });

  // State for form errors
  const [errors, setErrors] = useState<FormErrors>({});

  // State for custom amenity input
  const [customAmenity, setCustomAmenity] = useState<string>("");

  // Validation function
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    const textRegex = /.+/; // At least one character
    const numberRegex = /^\d+$/; // Only digits
    const phoneRegex = /^\d{10}$/; // 10-digit phone number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format

    if (!textRegex.test(formData.propertyName)) {
      newErrors.propertyName = "Property Name is required";
    }
    if (!textRegex.test(formData.propertyType)) {
      newErrors.propertyType = "Property Type is required";
    }
    if (!textRegex.test(formData.location)) {
      newErrors.location = "Location is required";
    }
    if (!numberRegex.test(formData.monthlyRent)) {
      newErrors.monthlyRent = "Monthly Rent must be a valid number";
    }
    if (!numberRegex.test(formData.securityDeposit)) {
      newErrors.securityDeposit = "Security Deposit must be a valid number";
    }
    if (!textRegex.test(formData.roomType)) {
      newErrors.roomType = "Room Type is required";
    }
    if (!numberRegex.test(formData.noofrooms)) {
      newErrors.noofrooms = "Security Deposit must be a valid number";
    }
    if (!textRegex.test(formData.gender)) {
      newErrors.gender = "Gender is required";
    }
    if (!textRegex.test(formData.description)) {
      newErrors.description = "Property Description is required";
    }
    if (!textRegex.test(formData.houseRules)) {
      newErrors.houseRules = "House Rules are required";
    }
    if (!textRegex.test(formData.contactName)) {
      newErrors.contactName = "Contact Name is required";
    }
    if (!phoneRegex.test(formData.contactPhone)) {
      newErrors.contactPhone = "A valid 10-digit phone number is required";
    }
    if (!emailRegex.test(formData.contactEmail)) {
      newErrors.contactEmail = "A valid email is required";
    }

    return newErrors;
  };

  // Handle text field changes
  const handleTextChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Handle select change
  //   const handleSelectChange =
  //     (name: string) => (e: React.ChangeEvent<{ value: unknown }>) => {
  //       setFormData((prev) => ({ ...prev, [name]: e.target.value as string }));
  //       setErrors((prev) => ({ ...prev, [name]: undefined }));
  //     };

  const handleSelectChange =
    (name: string) => (e: SelectChangeEvent<string>) => {
      setFormData((prev) => ({ ...prev, [name]: e.target.value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

  // Handle checkbox changes
  const handleCheckboxChange =
    (amenity: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        amenities: { ...prev.amenities, [amenity]: e.target.checked },
      }));
    };

  // Handle custom amenity input
  const handleCustomAmenityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomAmenity(e.target.value);
  };

  // Add custom amenity
  const addCustomAmenity = () => {
    if (
      customAmenity.trim() &&
      !Object.keys(formData.amenities).includes(customAmenity)
    ) {
      setFormData((prev) => ({
        ...prev,
        amenities: { ...prev.amenities, [customAmenity]: false },
      }));
      setCustomAmenity("");
    }
  };

  // Handle image upload
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).slice(
        0,
        15 - formData.images.length
      );
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...filesArray],
      }));
    }
  };

  // Handle image removal
  const handleImageRemove = (index: number) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, images: updatedImages }));
  };

  // Handle form submission
  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(createProperty({ payload: formData, navigate }));

    console.log("Form Data:", formData);
    // Reset form after submission
    setFormData({
      propertyName: "",
      propertyType: "PG",
      location: "",
      monthlyRent: "",
      securityDeposit: "",
      roomType: "Single Sharing",
      noofrooms: "",
      gender: "Male",
      description: "",
      houseRules: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      amenities: initialAmenities,
      images: [],
    });
    setErrors({});
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            minHeight: "100vh",
            bgcolor: "#f5f5f5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <PropertyContainer elevation={3}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              List Your Property
            </Typography>

            <Grid container spacing={2}>
              {/* Property Name */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Property Name"
                  name="propertyName"
                  value={formData.propertyName}
                  onChange={handleTextChange}
                  variant="outlined"
                  size="small"
                  placeholder="Enter property name"
                  error={!!errors.propertyName}
                  helperText={errors.propertyName}
                />
              </Grid>

              {/* Property Type */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel>Property Type</InputLabel>
                  <Select
                    label="Property Type"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleSelectChange("propertyType")}
                    error={!!errors.propertyType}
                  >
                    <MenuItem value="PG">PG</MenuItem>
                    <MenuItem value="Apartment">Apartment</MenuItem>
                    <MenuItem value="House">House</MenuItem>
                  </Select>
                  {errors.propertyType && (
                    <Typography variant="caption" color="error">
                      {errors.propertyType}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              {/* Location */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleTextChange}
                  variant="outlined"
                  size="small"
                  placeholder="Enter property location"
                  error={!!errors.location}
                  helperText={errors.location}
                />
              </Grid>

              {/* Monthly Rent */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Monthly Rent"
                  name="monthlyRent"
                  value={formData.monthlyRent}
                  onChange={handleTextChange}
                  variant="outlined"
                  size="small"
                  placeholder="Enter monthly rent"
                  type="number"
                  error={!!errors.monthlyRent}
                  helperText={errors.monthlyRent}
                />
              </Grid>

              {/* Security Deposit */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Security Deposit"
                  name="securityDeposit"
                  value={formData.securityDeposit}
                  onChange={handleTextChange}
                  variant="outlined"
                  size="small"
                  placeholder="Enter security deposit"
                  type="number"
                  error={!!errors.securityDeposit}
                  helperText={errors.securityDeposit}
                />
              </Grid>

              {/* Room Type */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel>Room Type</InputLabel>
                  <Select
                    label="Room Type"
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleSelectChange("roomType")}
                    error={!!errors.roomType}
                  >
                    <MenuItem value="Single Sharing">Single Sharing</MenuItem>
                    <MenuItem value="Double Sharing">Double Sharing</MenuItem>
                    <MenuItem value="Triple Sharing">Triple Sharing</MenuItem>
                  </Select>
                  {errors.roomType && (
                    <Typography variant="caption" color="error">
                      {errors.roomType}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              {/* Number of rooms */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="No. Of Rooms"
                  name="noofrooms"
                  value={formData.noofrooms}
                  onChange={handleTextChange}
                  variant="outlined"
                  size="small"
                  placeholder="Enter monthly rent"
                  type="number"
                  error={!!errors.monthlyRent}
                  helperText={errors.monthlyRent}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleSelectChange("gender")}
                    error={!!errors.gender}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Male & Female">Male & Female</MenuItem>
                  </Select>
                  {errors.gender && (
                    <Typography variant="caption" color="error">
                      {errors.gender}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              {/* Property Description */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Property Description"
                  name="description"
                  value={formData.description}
                  onChange={handleTextChange}
                  variant="outlined"
                  size="small"
                  multiline
                  rows={3}
                  placeholder="Describe your property..."
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Grid>

              {/* Amenities */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  Amenities
                </Typography>
                <FormGroup row>
                  <Grid container spacing={1}>
                    {Object.keys(formData.amenities).map((amenity) => (
                      <Grid size={{ xs: 6, sm: 4 }} key={amenity}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formData.amenities[amenity]}
                              onChange={handleCheckboxChange(amenity)}
                            />
                          }
                          label={amenity}
                        />
                      </Grid>
                    ))}
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Add Custom Amenity"
                        value={customAmenity}
                        onChange={handleCustomAmenityChange}
                        variant="outlined"
                        size="small"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={addCustomAmenity}
                                color="primary"
                              >
                                <AddIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </FormGroup>
              </Grid>

              {/* Property Images */}

              <Grid size={{ xs: 12 }}>
                <Typography fontWeight="bold" mt={2}>
                  Property Images
                </Typography>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  gap={1}
                  mt={1}
                  sx={{
                    width: "100%",
                    border: "1px dashed #cccccc",
                    padding: "5px",
                  }}
                >
                  {formData.images.map((file, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                        width: 100,
                        height: 100,
                        overflow: "hidden",
                        borderRadius: 1,
                        boxShadow: 1,
                      }}
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt="uploaded"
                        width="100%"
                        height="100%"
                        style={{ objectFit: "cover" }}
                      />
                      <Close
                        sx={{
                          position: "absolute",
                          top: 2,
                          right: 2,
                          bgcolor: "rgba(0,0,0,0.6)",
                          color: "white",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                        onClick={() => handleImageRemove(index)}
                      />
                    </Box>
                  ))}
                  {formData.images.length < 15 && (
                    <Button
                      component="label"
                      sx={{
                        width: 100,
                        height: 100,
                        border: "1px dashed grey",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Add />
                      <Typography variant="caption">Add More Images</Typography>
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                      />
                    </Button>
                  )}
                </Box>
              </Grid>

              {/* House Rules */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  House Rules
                </Typography>
                <TextField
                  fullWidth
                  label="House Rules"
                  name="houseRules"
                  value={formData.houseRules}
                  onChange={handleTextChange}
                  variant="outlined"
                  size="small"
                  multiline
                  rows={3}
                  placeholder="Enter house rules..."
                  error={!!errors.houseRules}
                  helperText={errors.houseRules}
                />
              </Grid>

              {/* Contact Information */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  Contact Information
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Name"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleTextChange}
                  variant="outlined"
                  size="small"
                  placeholder="Your name"
                  error={!!errors.contactName}
                  helperText={errors.contactName}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleTextChange}
                  variant="outlined"
                  size="small"
                  placeholder="Your phone number"
                  error={!!errors.contactPhone}
                  helperText={errors.contactPhone}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleTextChange}
                  variant="outlined"
                  size="small"
                  placeholder="Your email"
                  error={!!errors.contactEmail}
                  helperText={errors.contactEmail}
                />
              </Grid>

              {/* Submit Button */}
              <Grid size={{ xs: 12 }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ bgcolor: "black", color: "white", py: 1.5, mt: 2 }}
                  onClick={handleSubmit}
                >
                  Submit Property
                </Button>
              </Grid>
            </Grid>
          </PropertyContainer>
        </Box>
      )}
    </>
  );
};

export default ListPropertyForm;
