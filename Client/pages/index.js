import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/common/navbar";
import { Products } from "../products";
import ProductCard from "../components/productCard";
import { HStack, Container } from "@chakra-ui/react";
import ProductModal from "../components/common/productModal";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51K42yJDd9umCXJBo8xCqGvKorUgQYSxGd6fQnlMUWby0GeyKMotCJXwZ9QPiBQxsMFRB2oweBdq5sbFaO3A71v1300GzTl14bc"
);

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <Elements stripe={stripePromise}>
      <div>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Stripe Demo" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar
          routeLinks={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "User Dashboard",
              href: "/dashboard",
            },    {
            label: "Supplier Dashboard",
            href: "/supplier",
          },
          ]}
        />
        <Container maxWidth="container.xl">
          <HStack
            justifyContent="space-between"
            flexWrap="wrap"
            alignItems="center"
          >
            {Products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </HStack>
        </Container>
      </div>
    </Elements>
  );
}
