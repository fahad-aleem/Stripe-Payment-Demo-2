import create from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useStore = create(
  devtools(
    persist(
      (set, get) => ({
        cart: [],
        orders: [],
        userOrders: [],
        addToCart: (item) => {
          set((state) => ({
            cart: [item],
          }));
        },
        addOrders: (item) => {
          set((state) => ({
            orders: [...state.orders, item],
            userOrders: [...state.userOrders, item],
          }));
        },
        changePaymentStatus: (item) => {
          set((state) => ({
            orders: state.orders.map((order) => {
              if (order.order_no === item.order_no) {
                return {
                  ...order,
                  payment_status: "paid",
                };
              }
              return order;
            }),
            userOrders: state.userOrders.map((order) => {
              if (order.order_no === item.order_no) {
                return {
                  ...order,
                  payment_status: "paid",
                };
              }
              return order;
            }),
          }));
        },
        changeOrderStatus: (item) => {
          set((state) => ({
            orders: [
              ...state.userOrders.filter(
                (order) => order.order_no !== item.order_no
              ),
              item,
            ],
            userOrders: [
              ...state.userOrders.filter(
                (order) => order.order_no !== item.order_no
              ),
              item,
            ],
          }));
        },
        deleteOrder: (order_no) => {
          set((state) => ({
            orders: state.orders.filter((order) => order.order_no !== order_no),
            userOrders: state.orders.filter(
              (order) => order.order_no !== order_no
            ),
          }));
        },
      }),
      {
        name: "stripe", // unique name
        getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
      }
    )
  )
);
