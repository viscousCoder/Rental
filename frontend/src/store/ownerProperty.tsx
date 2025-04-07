import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { PropertyPayload } from "../interfaces/property";
import { APP_URL } from "../common/Constant";

interface PropertyState {
  loading: boolean;
  error: string | null;
  success: boolean;

  currentOwnerLoading: boolean;
  currentOwnerError: string | null;
  currentOwnerProperties: any[];
}

const initialState: PropertyState = {
  loading: false,
  error: null,
  success: false,

  currentOwnerLoading: false,
  currentOwnerError: null,
  currentOwnerProperties: [],
};

export const createProperty = createAsyncThunk(
  "property/create",
  async (
    {
      payload,
      navigate,
    }: { payload: PropertyPayload; navigate: (path: string) => void },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (key === "images" && Array.isArray(value)) {
          value.forEach((file) => formData.append("images", file));
        } else if (key === "amenities") {
          formData.append("amenities", JSON.stringify(value));
        } else {
          formData.append(key, value as string);
        }
      });

      const response = await axios.post(
        `${APP_URL}/property-listing`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-token": token,
          },
        }
      );

      toast.success("Property listed successfully!");
      navigate("/"); // or wherever
      return response.data;
    } catch (error: any) {
      toast.error("Failed to create property.");
      return rejectWithValue(error.response?.data?.message || "Server Error");
    }
  }
);

export const getCurrentOwnerProperties = createAsyncThunk(
  "property/getCurrentOwnerProperties",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${APP_URL}/getCurrentOwnerProperty`,
        null,
        {
          headers: {
            "x-token": token,
          },
        }
      );
      console.log(response.data.data, "Created Property");
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Server Error");
    }
  }
);

export const ownerPropertySlice = createSlice({
  name: "owner",
  initialState,
  reducers: {
    resetPropertyState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProperty.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      /**Current owner Property */
      .addCase(getCurrentOwnerProperties.pending, (state) => {
        state.currentOwnerLoading = true;
        state.currentOwnerError = null;
      })
      .addCase(getCurrentOwnerProperties.fulfilled, (state, action) => {
        state.currentOwnerLoading = false;
        state.currentOwnerProperties = action.payload;
      })
      .addCase(getCurrentOwnerProperties.rejected, (state, action) => {
        state.currentOwnerLoading = false;
        state.currentOwnerError = action.payload as string;
      });
  },
});

export const { resetPropertyState } = ownerPropertySlice.actions;
export default ownerPropertySlice.reducer;
