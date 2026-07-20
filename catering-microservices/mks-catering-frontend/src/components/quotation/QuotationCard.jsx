import generateQuotationPdf
from "../../utils/generateQuotationPdf";

function QuotationCard({

  quotation,
  booking

}) {

  const handleDownload = () => {

    generateQuotationPdf(
      quotation,
      booking
    );
  };

  return (

    <div className="bg-orange-50 rounded-3xl p-8 border border-orange-200">

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-3xl font-bold">

            Quotation PDF

          </h2>

          <p className="text-gray-600 mt-2">

            Owner quotation available

          </p>

        </div>

        <button
          onClick={handleDownload}
          className="bg-black text-white px-6 py-3 rounded-2xl"
        >

          Download PDF

        </button>
      </div>

      <div className="mt-6">

        <p className="text-xl font-semibold">

          Total Amount :
          ₹{quotation.totalAmount}

        </p>

      </div>
    </div>
  );
}

export default QuotationCard;