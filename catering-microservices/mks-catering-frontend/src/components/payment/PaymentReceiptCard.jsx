import generatePaymentReceiptPdf
from "../../utils/generatePaymentReceiptPdf";

function PaymentReceiptCard({

  payment

}) {

  const handleDownload = () => {

    generatePaymentReceiptPdf(payment);
  };

  return (

    <div className="bg-green-50 rounded-3xl p-8 border border-green-200">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-3xl font-bold">

            Payment Receipt

          </h2>

          <p className="text-gray-600 mt-2">

            Owner verified receipt

          </p>

        </div>

        <button
          onClick={handleDownload}
          className="bg-black text-white px-6 py-3 rounded-2xl"
        >

          Download Receipt

        </button>
      </div>

      <div className="mt-6">

        <p className="text-xl font-semibold">

          Paid Amount :
          ₹{payment.amount}

        </p>

      </div>
    </div>
  );
}

export default PaymentReceiptCard;