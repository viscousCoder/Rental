import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51M5EHdSImn7q36VtA5dFEn9lAuEiaovPY1mDV3bV9pGPikj3aFoyRnIsIjShBJ9bPW0uZOcxBdQ2RhbS5V7vASgZ004KLlaina"
);
export default stripePromise;
