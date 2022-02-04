import Navbar from "../../components/common/navbar";
import ProductTable from "../../components/supplier/supplierTable";
import { Container, Heading, Box } from "@chakra-ui/react";

const Supplier = () => {
  return (
    <div className="supplier">
      <Navbar
        routeLinks={[
          {
            label: "Home",
            href: "/",
          },{
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
        <Heading>Supplier Orders</Heading>
        <Box border="1px solid #efefef" my={4}>
          <ProductTable />
        </Box>
      </Container>
    </div>
  );
};

export default Supplier;
