import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useStore } from "../../store/store";
import axios from "axios";
import { STRIPE_SERVER, APPLICATION_FEE } from "../../strpe-server";

const ProductTable = () => {
  const orders = useStore((state) => state.orders);
  const changeOrderStatus = useStore((state) => state.changeOrderStatus);

  const handleTransferPayment = async (order) => {
    await axios.post(`${STRIPE_SERVER}/transfer`, {
      account: order.supplier_id,
      amount: order.price * order.quantity * (1 - APPLICATION_FEE), // takes 25% as application fee.
      description: `Transfer for order ${order.order_no}`,
    });

    alert(
      "Order completed, you'll recieved the payment in your connect account."
    );
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Order No</Th>
          <Th>Product</Th>
          <Th>Customer</Th>
          <Th>T.Amount</Th>
          <Th>Units</Th>
          <Th>Status</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.length > 0 &&
          orders.map((order) => {
            return (
              <Tr>
                <Td>{order.order_no}</Td>
                <Td>{order.product_name}</Td>
                <Td>{order.customer_full_name}</Td>
                <Td>${order.quantity * order.price}</Td>
                <Td>{order.quantity}</Td>
                <Td>{order.status}</Td>
                <Td>
                  <Menu>
                    {({ isOpen }) => (
                      <>
                        <MenuButton
                          disabled={
                            order.status === "Reject" ||
                            order.status === "Delivered"
                          }
                          isActive={isOpen}
                          as={Button}
                        >
                          Change Status
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            py={3}
                            onClick={() => {
                              changeOrderStatus({
                                ...order,
                                status: "Delivered",
                              });

                              handleTransferPayment(order);
                            }}
                          >
                            Delivered
                          </MenuItem>
                          <MenuItem
                            py={3}
                            onClick={() => {
                              changeOrderStatus({
                                ...order,
                                status: "Accepted",
                              });
                            }}
                          >
                            Accepted
                          </MenuItem>
                          <MenuItem
                            py={3}
                            cursor={
                              (order.status === "Accepted" ||
                                order.status === "Delivered") &&
                              "not-allowed"
                            }
                            color={
                              (order.status === "Accepted" ||
                                order.status === "Delivered") &&
                              "gray.300"
                            }
                            onClick={() => {
                              changeOrderStatus({
                                ...order,
                                status: "Reject",
                              });
                            }}
                          >
                            Reject
                          </MenuItem>
                        </MenuList>
                      </>
                    )}
                  </Menu>
                </Td>
              </Tr>
            );
          })}
      </Tbody>
    </Table>
  );
};

export default ProductTable;
