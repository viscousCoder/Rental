import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { userInfo } from "../interfaces/user";
import { APP_URL } from "../common/Constant";

interface AdminState {
  loading: boolean;
  error: string | null;
  success: boolean;
  users: userInfo[];
}

const initialState: AdminState = {
  loading: false,
  error: null,
  success: false,
  users: [],
};

// Fetch users by role
export const fetchUsersByRole = createAsyncThunk<
  { users: userInfo[] },
  { userrole: string },
  { rejectValue: string }
>("admin/fetchUsersByRole", async (payload, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${APP_URL}/getUsersByRole`, {
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
        "x-userrole": payload.userrole,
      },
    });
    toast.success("Users fetched successfully!");
    return response.data;
  } catch (error: any) {
    toast.error("Failed to fetch users.");
    return rejectWithValue(error.response?.data?.error || "Server Error");
  }
});

// Update user blocked status
export const updateUserBlockedStatus = createAsyncThunk<
  { user: userInfo },
  { userId: string; blocked: boolean },
  { rejectValue: string }
>(
  "admin/updateUserBlockedStatus",
  async ({ userId, blocked }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${APP_URL}/user/${userId}/block`,
        { blocked },
        {
          headers: {
            "Content-Type": "application/json",
            "x-token": token,
          },
        }
      );
      toast.success("User status updated successfully!");
      return response.data;
    } catch (error: any) {
      toast.error("Failed to update user status.");
      return rejectWithValue(error.response?.data?.error || "Server Error");
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk<
  { message: string; userId: string },
  { userId: string },
  { rejectValue: string }
>("admin/deleteUser", async ({ userId }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${APP_URL}/user/${userId}`, {
      headers: {
        "x-token": token,
      },
    });
    toast.success("User deleted successfully!");
    return { message: "Deleted", userId };
  } catch (error: any) {
    toast.error("Failed to delete user.");
    return rejectWithValue(error.response?.data?.error || "Server Error");
  }
});

// Create the slice
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetAdminState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsersByRole.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        fetchUsersByRole.fulfilled,
        (state, action: PayloadAction<{ users: userInfo[] }>) => {
          state.loading = false;
          state.users = action.payload.users;
          state.success = true;
        }
      )
      .addCase(
        fetchUsersByRole.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Unknown error occurred";
          state.success = false;
        }
      )
      //update
      .addCase(updateUserBlockedStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUserBlockedStatus.fulfilled, (state, action) => {
        const updatedUser = action.payload.user;
        const index = state.users.findIndex((u) => u.id === updatedUser.id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
        state.loading = false;
        state.success = true;
      })
      .addCase(updateUserBlockedStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update user status.";
        state.success = false;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload.userId);
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete user.";
        state.success = false;
      });

    // Update Blocked Status
    // .addCase(
    //   updateUserBlockedStatus.fulfilled,
    //   (state, action: PayloadAction<{ user: userInfo }>) => {
    //     const updatedUser = action.payload.user;
    //     const index = state.users.findIndex((u) => u.id === updatedUser.id);
    //     if (index !== -1) {
    //       state.users[index] = updatedUser;
    //     }
    //     state.success = true;
    //   }
    // )
    // .addCase(
    //   updateUserBlockedStatus.rejected,
    //   (state, action: PayloadAction<string | undefined>) => {
    //     state.error = action.payload || "Failed to update user status.";
    //     state.success = false;
    //   }
    // )

    // // Delete User
    // .addCase(
    //   deleteUser.fulfilled,
    //   (state, action: PayloadAction<{ message: string; userId: string }>) => {
    //     state.users = state.users.filter(
    //       (u) => u.id !== action.payload.userId
    //     );
    //     state.success = true;
    //   }
    // )
    // .addCase(
    //   deleteUser.rejected,
    //   (state, action: PayloadAction<string | undefined>) => {
    //     state.error = action.payload || "Failed to delete user.";
    //     state.success = false;
    //   }
    // );
  },
});

export const { resetAdminState } = adminSlice.actions;
export default adminSlice.reducer;

// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { userInfo } from "../interfaces/user";
// import { APP_URL } from "../common/Constant";

// interface AdminState {
//   loading: boolean;
//   error: string | null;
//   success: boolean;
//   users: userInfo[];
// }

// const initialState: AdminState = {
//   loading: false,
//   error: null,
//   success: false,
//   users: [],
// };

// export const fetchUsersByRole = createAsyncThunk<
//   { users: userInfo[] },
//   { userrole: string },
//   { rejectValue: string }
// >("admin/fetchUsersByRole", async (payload, { rejectWithValue }) => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await axios.get(`${APP_URL}/getUsersByRole`, {
//       headers: {
//         "Content-Type": "application/json",
//         "x-token": token,
//         "x-userrole": payload.userrole,
//       },
//     });
//     toast.success("Users fetched successfully!");
//     return response.data;
//   } catch (error: any) {
//     toast.error("Failed to fetch users.");
//     return rejectWithValue(error.response?.data?.error || "Server Error");
//   }
// });

// // Create the slice
// const adminSlice = createSlice({
//   name: "admin",
//   initialState,
//   reducers: {
//     resetAdminState: (state) => {
//       state.loading = false;
//       state.error = null;
//       state.success = false;
//       state.users = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsersByRole.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(
//         fetchUsersByRole.fulfilled,
//         (state, action: PayloadAction<{ users: userInfo[] }>) => {
//           state.loading = false;
//           state.error = null;
//           state.success = true;
//           state.users = action.payload.users;
//         }
//       )
//       .addCase(
//         fetchUsersByRole.rejected,
//         (state, action: PayloadAction<string | undefined>) => {
//           state.loading = false;
//           state.error = action.payload || "Unknown error occurred";
//           state.success = false;
//         }
//       );
//   },
// });

// export const { resetAdminState } = adminSlice.actions;
// export default adminSlice.reducer;
