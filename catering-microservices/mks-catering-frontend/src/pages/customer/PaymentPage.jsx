import { useLocation, useNavigate }
from "react-router-dom";

import PaymentCard
from "../../components/payment/PaymentCard";

import paymentService
from "../../services/paymentService";

function PaymentPage() {

  const location = useLocation();

  const navigate = useNavigate();

  const quotation =
    location.state?.quotation;

  // HANDLE PAYMENT

  const handlePayment =
    async () => {

      try {

        const paymentPayload = {

          bookingId:
            quotation.bookingId,

          amount:
            quotation.totalAmount
        };

        const response =
          await paymentService
            .makePayment(
              paymentPayload
            );

        navigate(
          "/customer/receipt",
          {

            state: {

              receipt:
                response.data
            }
          }
        );

      } catch (error) {

        console.error(error);
      }
    };

  if (!quotation) {

    return (

      <div className="text-center py-20 text-2xl font-bold">

        No Payment Information Found
      </div>
    );
  }

  return (

    <PaymentCard
      quotation={quotation}
      onPayment={handlePayment}
    />
  );
}

export default PaymentPage;