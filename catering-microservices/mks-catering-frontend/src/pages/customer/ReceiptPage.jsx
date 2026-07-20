import { useLocation }
from "react-router-dom";

import ReceiptDownload
from "../../components/payment/ReceiptDownload";

function ReceiptPage() {

  const location = useLocation();

  const receipt =
    location.state?.receipt;

  if (!receipt) {

    return (

      <div className="text-center py-20 text-2xl font-bold">

        No Receipt Found
      </div>
    );
  }

  return (

    <ReceiptDownload

      bookingId={
        receipt.bookingId
      }

      receiptUrl={
        receipt.receiptUrl
      }
    />
  );
}

export default ReceiptPage;