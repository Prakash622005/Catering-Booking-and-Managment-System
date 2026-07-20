import { useEffect, useState } from "react";

import CustomerLayout from "../../layouts/CustomerLayout";

import QuotationCard from "../../components/quotation/QuotationCard";

import {

  getAllQuotations,
  approveQuotation,
  rejectQuotation

} from "../../services/quotationService";

function CustomerQuotationPage() {

  const [quotations, setQuotations] = useState([]);

  useEffect(() => {

    fetchQuotations();

  }, []);

  const fetchQuotations = async () => {

    try {

      const data = await getAllQuotations();

      setQuotations(data);

    } catch (error) {

      console.error(error);
    }
  };

  const handleApprove = async (id) => {

    try {

      await approveQuotation(id);

      alert("Quotation Approved");

      fetchQuotations();

    } catch (error) {

      console.error(error);
    }
  };

  const handleReject = async (id) => {

    try {

      await rejectQuotation(id);

      alert("Quotation Rejected");

      fetchQuotations();

    } catch (error) {

      console.error(error);
    }
  };

  return (

    <CustomerLayout>

      <h1 className="text-4xl font-bold text-orange-600 mb-8">

        My Quotations

      </h1>

      <div className="space-y-6">

        {quotations.map((quotation) => (

          <QuotationCard
            key={quotation.quotationId}
            quotation={quotation}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}

      </div>

    </CustomerLayout>
  );
}

export default CustomerQuotationPage;