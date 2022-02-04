import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  DeleteIcon,
  TriangleDownIcon,
  ChevronDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { useStore } from "../../store/store";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.STRIPE_KEY);

const ProductTable = () => {
  const userOrders = useStore((state) => state.userOrders);
  const deleteOrder = useStore((state) => state.deleteOrder);

  const [isOpen, setIsOpen] = useState(false);
  const [activePayment, setActivePayment] = useState({});

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return (
    <Elements stripe={stripePromise}>
      <div>
        <Table>
          <Thead>
            <Tr>
              <Th>Order No</Th>
              <Th>Product</Th>
              <Th>Supplier</Th>
              <Th>Price</Th>
              <Th>Units</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {userOrders.length > 0 &&
              userOrders.map((order) => (
                <Tr>
                  <Td>{order.order_no}</Td>
                  <Td>{order.product_name}</Td>
                  <Td>{order.supplier_name}</Td>
                  <Td>${order.price}</Td>
                  <Td>{order.quantity}</Td>
                  <Td>
                    {order.status === "Accepted" ? "Active" : order.status}
                  </Td>
                  <Td>
                    <HStack spacing={4}>
                      <Button
                        onClick={() => {
                          deleteOrder(order.order_no);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                      <Menu>
                        {({ isOpen }) => (
                          <>
                            <MenuButton isActive={isOpen} as={Button}>
                              {isOpen ? (
                                <TriangleUpIcon />
                              ) : (
                                <TriangleDownIcon />
                              )}
                            </MenuButton>
                            <MenuList>
                              {/* <MenuItem
                                py={3}
                                cursor={
                                  (order.status === "pending" ||
                                    order.status === "Reject" ||
                                    order.status === "Delivered" ||
                                    order.payment_status === "paid") &&
                                  "not-allowed"
                                }
                                color={
                                  (order.status === "pending" ||
                                    order.status === "Reject" ||
                                    order.status === "Delivered" ||
                                    order.payment_status === "paid") &&
                                  "gray.300"
                                }
                                onClick={() => {
                                  if (
                                    order.status === "pending" ||
                                    order.status === "Reject" ||
                                    order.status === "Delivered" ||
                                    order.payment_status === "paid"
                                  )
                                    return;

                                  onOpen();
                                  setActivePayment(order);
                                }}
                              >
                                Pay now
                              </MenuItem> */}
                              <MenuItem py={3}>View Details</MenuItem>
                            </MenuList>
                          </>
                        )}
                      </Menu>
                    </HStack>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </div>
    </Elements>
  );
};

export default ProductTable;
