/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe(
  'pk_test_51GszegBLB2NpxxhVwsHbv1XsW04eBILb1FzbSL2kDMMfMFZm7qvzrz5Meu5YFKZxtt3DKOEkFdWjWtbolj9MVaAk00h0OksVGk'
);

export const bookTour = async (tourId) => {
  try {
    // 1. get Session from server
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    console.log(error);
    showAlert('error', error);
  }
  console.log(session);
};
