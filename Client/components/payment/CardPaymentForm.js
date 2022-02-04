import { CardComponent } from "./CardComponent";

export const PaymentForm = ({ order, handleSubmit, success }) => {
  return (
    <div className="payment-container">
      <CardComponent
        order={order}
        handleSubmit={handleSubmit}
        success={success}
      />
    </div>
  );
};
