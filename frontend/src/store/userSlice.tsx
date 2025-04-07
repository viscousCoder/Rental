import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userInfo, userlogin } from "../interfaces/user";
import { APP_URL } from "../common/Constant";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = APP_URL;
interface UserState {
  loading: boolean;
  user: any;
  error: string;
  propertyLoading: boolean;
  properties: any[];
  propertyError: string;
  singlePropLoading: boolean;
  singleProperty: any;
  singlePropError: string;

  bookLoading: boolean;
  bookData: any[];
  bookError: string;
}

const initialState: UserState = {
  loading: false,
  user: {},
  error: "",
  propertyLoading: false,
  properties: [],
  propertyError: "",
  singlePropLoading: false,
  singleProperty: {},
  singlePropError: "",
  bookLoading: false,
  bookData: [],
  bookError: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /**register */
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.user = {};
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = true;
        state.user = {};
        state.error = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = {};
        state.error = action.error.message || "Something went wrong";
      })
      /**Login */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = {};
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = true;
        state.user = {};
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = {};
        state.error = action.error.message || "Something went wrong";
      })
      /**GetDetails */
      .addCase(getDetails.pending, (state) => {
        state.loading = true;
        state.user = {};
        state.error = "";
      })
      .addCase(getDetails.fulfilled, (state, action) => {
        state.loading = true;
        state.user = action.payload;
        state.error = "";
      })
      .addCase(getDetails.rejected, (state, action) => {
        state.loading = false;
        state.user = {};
        state.error = action.error.message || "Something went wrong";
      })
      /**All Property */
      .addCase(getAllProperties.pending, (state) => {
        state.propertyLoading = true;
        state.propertyError = "";
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.propertyLoading = false;
        state.properties = action.payload;
        state.propertyError = "";
      })
      .addCase(getAllProperties.rejected, (state, action) => {
        state.propertyLoading = false;
        state.properties = [];
        state.propertyError =
          (action.payload as string) ||
          action.error.message ||
          "Something went wrong while fetching properties";
      })
      /**Single Property */
      .addCase(getSingleProperty.pending, (state) => {
        state.singlePropLoading = true;
        state.singlePropError = "";
        state.singleProperty = {};
      })
      .addCase(getSingleProperty.fulfilled, (state, action) => {
        state.singlePropLoading = false;
        state.singleProperty = action.payload;
        state.singlePropError = "";
      })
      .addCase(getSingleProperty.rejected, (state, action) => {
        state.singlePropLoading = false;
        state.singleProperty = {};
        state.singlePropError =
          (action.payload as string) ||
          action.error.message ||
          "Something went wrong while fetching the property";
      })
      /**Updating */
      .addCase(bookProperty.pending, (state) => {
        state.bookLoading = true;
        state.bookError = "";
        state.bookData = [];
      })
      .addCase(bookProperty.fulfilled, (state) => {
        state.bookLoading = false;
        // state.bookData = action.payload;
        state.bookError = "";
      })
      .addCase(bookProperty.rejected, (state, action) => {
        state.bookLoading = false;
        state.bookData = [];
        state.bookError =
          (action.payload as string) ||
          action.error.message ||
          "Booking failed";
      })
      /**Booked */
      .addCase(fetchBookedProperties.pending, (state) => {
        state.bookLoading = true;
        state.bookError = "";
        state.bookData = [];
      })
      .addCase(fetchBookedProperties.fulfilled, (state, action) => {
        state.bookLoading = false;
        state.bookData = action.payload;
        state.bookError = "";
      })
      .addCase(fetchBookedProperties.rejected, (state, action) => {
        state.bookLoading = false;
        state.bookData = [];
        state.bookError =
          (action.payload as string) ||
          action.error.message ||
          "Booking failed";
      });
  },
});

export const registerUser = createAsyncThunk(
  "/register",
  async ({
    payload,
    navigate,
  }: {
    payload: userInfo;
    navigate: (path: string) => void;
  }) => {
    try {
      console.log("payload", payload);
      const response = await axios.post(`${apiUrl}/register`, payload);
      if (response.status === 201) {
        toast.success("Employee Registered Successfully");
        navigate("/login");
        console.log(response, "in redux");
      }
    } catch (error) {
      console.log(error, "error reghister");
      toast.error("Error Registering Employee");
    }
  }
);

export const loginUser = createAsyncThunk(
  "/login",
  async ({
    payload,
    navigate,
  }: {
    payload: userlogin;
    navigate: (path: string) => void;
  }) => {
    try {
      console.log("payload", payload);
      const response = await axios.post(`${apiUrl}/login`, payload);
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.userrole);
        localStorage.setItem("id", data.id);
        toast.success("Employee Registered Successfully");
        navigate("/");
        console.log(response, "in redux");
      }
    } catch (error) {
      console.log(error, "error reghister");
      toast.error("Error Registering Employee");
    }
  }
);

/**user detail */
export const getDetails = createAsyncThunk("/getDetails", async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${apiUrl}/getDetails`, {
      headers: {
        "x-token": token,
      },
    });
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error, "Employee details");
    return "Internal Server Error";
  }
});

/**Get all Property */
export const getAllProperties = createAsyncThunk(
  "/properties/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/allproperty`, {
        headers: {
          "x-token": token,
        },
      });
      console.log(response.data.data);
      return response.data.data;
    } catch (error: any) {
      console.error("Error fetching properties:", error);
      return rejectWithValue("Failed to fetch properties");
    }
  }
);

/**Get Single property details */
export const getSingleProperty = createAsyncThunk(
  "/property/get",
  async (propertyId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/property/${propertyId}`, {
        headers: {
          "x-token": token,
        },
      });

      if (response.status === 200) {
        return response.data.data;
      } else {
        return rejectWithValue("Property not found");
      }
    } catch (error) {
      console.error("Error fetching single property:", error);
      return rejectWithValue("Failed to fetch property");
    }
  }
);

export const bookProperty = createAsyncThunk(
  "/book",
  async (_, { rejectWithValue }) => {
    const roomId = localStorage.getItem("roomId");
    const userId = localStorage.getItem("id");
    const data = localStorage.getItem("data");

    let parsedData: any = null;
    if (data) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        parsedData = JSON.parse(data);
      } catch (error) {
        console.error("Error parsing 'data' from localStorage:", error);
        return rejectWithValue("Failed to parse data.");
      }
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${apiUrl}/update/${roomId}`,
        { userId, ...parsedData },
        {
          headers: {
            "x-token": token,
          },
        }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue("Booking failed.");
      }
    } catch (error) {
      console.error("Error booking property:", error);
      return rejectWithValue("Failed to book property");
    }
  }
);

export const fetchBookedProperties = createAsyncThunk(
  "bookedProperties/fetchBookedProperties",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/get-booked-property`, {
        headers: {
          "x-token": token,
        },
      });
      if (response.status === 200) {
        return response.data.data;
      } else {
        return rejectWithValue("Booking failed.");
      }
    } catch (error) {
      console.error("Error booking property:", error);
      return rejectWithValue("Failed to book property");
    }
  }
);

// export const {} = userSlice.actions;
export default userSlice.reducer;
