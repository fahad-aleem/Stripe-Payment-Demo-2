import Navbar from "../components/common/navbar";
import ProductTable from "../components/common/table";
import { Container, Heading, Box } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51K42yJDd9umCXJBo8xCqGvKorUgQYSxGd6fQnlMUWby0GeyKMotCJXwZ9QPiBQxsMFRB2oweBdq5sbFaO3A71v1300GzTl14bc"
);

const Dashboard = () => {
  return (
    // <Elements stripe={stripePromise}>
    <div className="dashboard">
      <Navbar
        routeLinks={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "User Dashboard",
            href: "/dashboard",
          },
           {
            label: "Supplier Dashboard",
            href: "/supplier",
          },
        ]}
      />
      <Container maxWidth="container.xl" my={12}>
        <Heading>My Orders</Heading>
        <Box border="1px solid #efefef" my={4}>
          <ProductTable />
        </Box>
      </Container>
    </div>
    // </Elements>
  );
};

export default Dashboard;
