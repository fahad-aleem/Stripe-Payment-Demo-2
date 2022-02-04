import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import axios from "axios";

export const CardComponent = ({ order, handleChange, success }) => {
  //   const [success, setSuccess] = useState(false);

  //   const stripe = useStripe();
  //   const elements = useElements();

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const { error, paymentMethod } = await stripe.createPaymentMethod({
  //       type: "card",
  //       card: elements?.getElement(CardElement),
  //       billing_details: {
  //         name: order.customer_full_name,
  //         email: order.email_address,
  //       },
  //     });
  //     if (!error) {
  //       try {
  //         const { id } = paymentMethod;
  //         console.log(id);
  //         const { product_name, price, supplier_id, quantity, supplier_name } =
  //           order;

  //         setSuccess(true);
  //       } catch (error) {}
  //     } else {
  //       console.log(error);
  //     }
  //   };

  if (success) {
    return <p>Your order is submitted successufully</p>;
  }
  return (
    <div className="payment-container">
      <FormControl
        className="form-row"
        p={2}
        my={2}
        border="1px solid #d5d5d5"
        borderRadius="5px"
      >
        <CardElement />
      </FormControl>
    </div>
  );
};
