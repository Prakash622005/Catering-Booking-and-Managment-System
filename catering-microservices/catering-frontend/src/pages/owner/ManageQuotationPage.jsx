import { useEffect, useState } from "react";

import OwnerLayout from "../../layouts/OwnerLayout";

import QuotationTable from "../../components/quotation/QuotationTable";

import {

  getAllQuotations

} from "../../services/quotationService";

function ManageQuotationPage() {

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

  const handleView = (quotation) => {

    console.log(quotation);

    alert("Quotation Viewed");
  };

  return (

    <OwnerLayout>

      <h1 className="text-4xl font-bold text-orange-600 mb-8">

        Manage Quotations

      </h1>

      <QuotationTable
        quotations={quotations}
        onView={handleView}
      />

    </OwnerLayout>
  );
}

export default ManageQuotationPage;