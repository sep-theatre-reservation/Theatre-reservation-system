import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Paypal({ orderDetails, onPaymentConfirm }) {
  const initialOptions = {
    clientId:
      "Ab0srraMjiEqhu5-dfGj7oDKFouBx8TK2F5xM-3vrcAfl0zktcfDUHvlde9dPg6H-Rjvvh3kABbve8s5",
    currency: "USD",
    intent: "capture",
  };

  const createOrder = async () => {
    console.log(orderDetails);
    if (orderDetails == null) {
      return;
    }
    try {
      const response = await fetch(
        import.meta.env.VITE_REACT_APP_BASE_URL + "/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderData: {
              id: orderDetails.id,
              ticketPrice: orderDetails.ticketPrice,
              ticketsCount: orderDetails.ticketsCount,
            },
          }),
        }
      );


      const orderData = await response.json();
      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      alert(`Could not initiate PayPal Checkout...<br><br>${error}`);
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_REACT_APP_BASE_URL +
          `/orders/${data.orderID}/capture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      const orderData = await response.json();

      // Three cases to handle:
      //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
      //   (2) Other non-recoverable errors -> Show a failure message
      //   (3) Successful transaction -> Show confirmation or thank you message

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
        return actions.restart();
      } else if (errorDetail) {
        // (2) Other non-recoverable errors -> Show a failure message
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else if (!orderData.purchase_units) {
        throw new Error(JSON.stringify(orderData));
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');
        const transaction =
          orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
          orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
        alert(
          `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`
        );
        console
          .log
          // "Capture result",
          // orderData,
          // JSON.stringify(orderData,null,2),
          ();
      }
      onPaymentConfirm(orderData);
    } catch (error) {
      console.error(error);
      alert(
        `Sorry, your transaction could not be processed...<br><br>${error}`
      );
    }
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{ layout: "horizontal" }}
        className="w-50 ms-auto pt-3"
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
  );
}
