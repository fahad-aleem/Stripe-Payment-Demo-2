import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { useStore } from "../../store/store";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { PaymentForm } from "../payment/CardPaymentForm";
import { STRIPE_SERVER } from "../../strpe-server";

const generateRandomNumbers = () => {
  return Math.floor(Math.random() * (999999 - 100000)) + 100000;
};

export default function ProductModal({ isOpen, onOpen, onClose, product }) {
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const stripe = useStripe();
  const elements = useElements();

  const [success, setSuccess] = useState(false);

  const changePaymentStatus = useStore((state) => state.changePaymentStatus);

  const [productDetails, setProductDetails] = useState({
    email_address: "",
    full_name: "",
    quantity: "",
  });

  const addOrders = useStore((state) => state.addOrders);

  const [orderNo, setOrderNo] = useState(0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // stripe payment
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements?.getElement(CardElement),
      billing_details: {
        name: productDetails.full_name,
        email: productDetails.email_address,
      },
    });
    if (!error) {
      try {
        const { id } = paymentMethod;

        console.log(id);

        await axios.post(`${STRIPE_SERVER}/payment-intents`, {
          id,
          totalAmount: productDetails.quantity * product.price,
          email: productDetails.email_address,
        });
        const generatedOrderNo = generateRandomNumbers();

        setOrderNo(generatedOrderNo);

        const item = {
          product_name: product.name,
          supplier_name: product.supplierName,
          price: product.price,
          quantity: productDetails.quantity,
          email_address: productDetails.email_address,
          customer_full_name: productDetails.full_name,
          status: "pending", // initially pending when order is placed
          supplier_id: product.supplierConnectId,
          order_no: generatedOrderNo,
          payment_status: "paid", // initially pending when order is placed
        };
        addOrders(item);
        alert(
          "Your order has beed placed successfully, you can track your order in your dashboard"
        );

        setSuccess(true);
      } catch (error) {}
    } else {
      console.log(error);
      alert(error.message);
      return;
    }

    // close modal
    onClose();
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Purchasing Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Enter full name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Full name"
                onChange={(e) => {
                  setProductDetails({
                    ...productDetails,
                    full_name: e.target.value,
                  });
                }}
                value={productDetails.full_name}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Enter Email Address:</FormLabel>
              <Input
                placeholder="Email address"
                onChange={(e) => {
                  setProductDetails({
                    ...productDetails,
                    email_address: e.target.value,
                  });
                }}
                value={productDetails.email_address}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Enter Quantity:</FormLabel>
              <Input
                type="number"
                placeholder="Number of units"
                min="1"
                onChange={(e) => {
                  setProductDetails({
                    ...productDetails,
                    quantity: parseInt(e.target.value),
                  });
                }}
                value={productDetails.quantity}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Enter Credit Card Details:</FormLabel>
              <PaymentForm success={success} handleSubmit={handlePlaceOrder} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handlePlaceOrder}>
              Place an order
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
