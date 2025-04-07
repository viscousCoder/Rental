// // src/store/paymentSlice.ts
// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { loadStripe } from "@stripe/stripe-js";

// // Initialize Stripe
// const stripePromise = loadStripe(
//   "pk_test_51M5EHdSImn7q36VtA5dFEn9lAuEiaovPY1mDV3bV9pGPikj3aFoyRnIsIjShBJ9bPW0uZOcxBdQ2RhbS5V7vASgZ004KLlaina"
// ); // Replace with your Stripe Publishable Key

// // Define the shape of the payment request payload
// interface PaymentRequest {
//   propertyId: number;
//   amount: number;
//   description: string;
// }

// // Define the state shape
// interface PaymentState {
//   sessionId: string | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: PaymentState = {
//   sessionId: null,
//   loading: false,
//   error: null,
// };

// // Async thunk to create a checkout session
// export const createCheckoutSession = createAsyncThunk<
//   string, // Return type (session ID)
//   PaymentRequest, // Argument type
//   { rejectValue: string } // Reject value type
// >(
//   "payment/createCheckoutSession",
//   async (paymentData: PaymentRequest, { rejectWithValue }) => {
//     try {
//       const response = await fetch(
//         "http://localhost:1234/create-checkout-session",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(paymentData),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to create checkout session");
//       }

//       const data: { id: string } = await response.json();
//       return data.id;
//     } catch (error) {
//       return rejectWithValue((error as Error).message || "An error occurred");
//     }
//   }
// );

// // Create the payment slice
// const paymentSlice = createSlice({
//   name: "payment",
//   initialState,
//   reducers: {
//     resetPaymentState: (state) => {
//       state.sessionId = null;
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createCheckoutSession.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         createCheckoutSession.fulfilled,
//         (state, action: PayloadAction<string>) => {
//           state.loading = false;
//           state.sessionId = action.payload;
//         }
//       )
//       .addCase(createCheckoutSession.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to create checkout session";
//       });
//   },
// });

// export const { resetPaymentState } = paymentSlice.actions;
// export default paymentSlice.reducer;

// // Async function to redirect to Stripe Checkout
// export const redirectToCheckout = async (sessionId: string) => {
//   const stripe = await stripePromise;
//   if (stripe) {
//     const { error } = await stripe.redirectToCheckout({ sessionId });
//     if (error) {
//       console.error("Stripe redirect error:", error.message);
//     }
//   }
// };

// src/store/paymentSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51M5EHdSImn7q36VtA5dFEn9lAuEiaovPY1mDV3bV9pGPikj3aFoyRnIsIjShBJ9bPW0uZOcxBdQ2RhbS5V7vASgZ004KLlaina"
);

interface CustomerDetails {
  name: string;
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface PaymentRequest {
  propertyId: number;
  amount: number;
  description: string;
  customerDetails: CustomerDetails;
}

interface PaymentState {
  sessionId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  sessionId: null,
  loading: false,
  error: null,
};

export const createCheckoutSession = createAsyncThunk<
  string,
  PaymentRequest,
  { rejectValue: string }
>(
  "payment/createCheckoutSession",
  async (paymentData: PaymentRequest, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:1234/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to create checkout session"
        );
      }

      const data: { id: string } = await response.json();
      console.log("Checkout session created:", data.id);
      return data.id;
    } catch (error) {
      return rejectWithValue((error as Error).message || "An error occurred");
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPaymentState: (state) => {
      state.sessionId = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCheckoutSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createCheckoutSession.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.sessionId = action.payload;
        }
      )
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create checkout session";
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;

export const redirectToCheckout = async (sessionId: string) => {
  console.log("Attempting to redirect with session ID:", sessionId);
  const stripe = await stripePromise;
  if (stripe) {
    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      console.error("Stripe redirect error:", error.message);
    }
  } else {
    console.error("Stripe failed to load");
  }
};
