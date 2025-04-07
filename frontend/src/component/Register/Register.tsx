import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Lock as LockIcon,
  //   Language as LanguageIcon,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { registerUser } from "../../store/userSlice";
import Loading from "../Loading/Loading";

const TestimonialBox = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [language, setLanguage] = useState("English");
  const userrole = ["Tenant", "Property Owner", "Admin"];
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    confirmpassword: "",
    agreeterms: false,
    userrole: userrole[tabValue],
  });

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    confirmpassword: "",
    agreeterms: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      userrole: userrole[tabValue],
    }));
  }, [tabValue]);

  /**
   * @function for validation checking
   * @returns boolean value
   */
  const validateForm = () => {
    const newErrors: any = {};
    const nameParts = formData.fullname.trim().split(/\s+/);

    if (nameParts.length < 2) newErrors.fullname = "Enter at least two words";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter a valid 10-digit number";
    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.confirmpassword !== formData.password)
      newErrors.confirmpassword = "Passwords do not match";
    if (!formData.agreeterms) newErrors.agreeterms = "You must agree to terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, agreeterms: e.target.checked });
  };

  const handleFocus = (field: string) => {
    setErrors({ ...errors, [field]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);
      dispatch(registerUser({ payload: formData, navigate }));
      setFormData({
        fullname: "",
        email: "",
        mobile: "",
        password: "",
        confirmpassword: "",
        agreeterms: false,
        userrole: userrole[tabValue],
      });
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Grid
          container
          sx={{
            minHeight: "100vh",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Left Side */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              backgroundImage: `url('https://plus.unsplash.com/premium_photo-1683891068536-2467572c9a2b?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "flex-end",
              color: "white",
              padding: 3,
              height: { xs: "50vh", md: "100vh" },
            }}
          >
            <TestimonialBox>
              <Avatar
                alt="Sarah Johnson"
                src="https://randomuser.me/api/portraits/women/44.jpg"
              />
              <Box>
                <Typography variant="body1">
                  "Find the perfect accommodation with WebBroker. We offer a
                  wide range of rooms, PGs, and hostels to suit your needs and
                  budget."
                </Typography>
                <Typography variant="caption" sx={{ mt: 1 }}>
                  Sarah Johnson <br /> Happy Tenant
                </Typography>
              </Box>
            </TestimonialBox>
          </Grid>

          {/* Right Side */}
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: { xs: 3, md: 5 },
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                mb: 2,
              }}
            >
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                variant="outlined"
                size="small"
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="French">French</MenuItem>
              </Select>
            </Box>

            <Typography variant="h4" fontWeight="bold">
              Create Account
            </Typography>
            <Typography variant="subtitle1" mb={2}>
              Join WebBroker today
            </Typography>

            <Tabs
              value={tabValue}
              onChange={(_, newValue) => setTabValue(newValue)}
              centered
            >
              <Tab label="Tenant" />
              <Tab label="Property Owner" />
              <Tab label="Admin" />
            </Tabs>

            <Box
              component="form"
              width="100%"
              maxWidth={400}
              mt={2}
              onSubmit={handleSubmit}
            >
              {[
                "fullname",
                "email",
                "mobile",
                "password",
                "confirmpassword",
              ].map((field, index) => (
                <TextField
                  key={index}
                  fullWidth
                  margin="normal"
                  label={
                    field === "confirmpassword"
                      ? "Confirm Password"
                      : field.charAt(0).toUpperCase() +
                        field.slice(1).replace(/([A-Z])/g, " $1")
                  }
                  name={field}
                  type={
                    field === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : field === "confirmpassword"
                      ? showConfirmPassword
                        ? "text"
                        : "password"
                      : "text"
                  }
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  onFocus={() => handleFocus(field)}
                  error={Boolean(errors[field as keyof typeof errors])}
                  helperText={errors[field as keyof typeof errors]}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {field === "fullname" && <PersonIcon />}
                        {field === "email" && <EmailIcon />}
                        {field === "mobile" && <PhoneIcon />}
                        {(field === "password" ||
                          field === "confirmpassword") && (
                          <IconButton
                            onClick={
                              field === "password"
                                ? togglePasswordVisibility
                                : toggleConfirmPasswordVisibility
                            }
                            edge="start"
                          >
                            {field === "password" ? (
                              showPassword ? (
                                <LockOpenIcon />
                              ) : (
                                <LockIcon />
                              )
                            ) : showConfirmPassword ? (
                              <LockOpenIcon />
                            ) : (
                              <LockIcon />
                            )}
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              ))}
              <TextField
                fullWidth
                margin="normal"
                label="User"
                value={userrole[tabValue]}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                  readOnly: true,
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.agreeterms}
                    onChange={handleCheckboxChange}
                  />
                }
                label="I agree to the Terms and Conditions"
              />
              {errors.agreeterms && (
                <Typography color="error">{errors.agreeterms}</Typography>
              )}

              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                type="submit"
              >
                Register
              </Button>
              <Typography mt={2}>
                Already have an account?{" "}
                <Button
                  onClick={() => navigate("/login")}
                  sx={{ textTransform: "none" }}
                >
                  Sign in
                </Button>
              </Typography>
            </Box>

            <Box display="flex" justifyContent="center" mt={3}>
              <Typography variant="body2" sx={{ mx: 1 }}>
                Privacy Policy
              </Typography>
              <Typography variant="body2" sx={{ mx: 1 }}>
                Terms of Service
              </Typography>
              <Typography variant="body2" sx={{ mx: 1 }}>
                Contact Support
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Register;
