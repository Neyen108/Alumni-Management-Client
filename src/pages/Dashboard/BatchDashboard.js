import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Loading } from "../../components/Loading";
import { BatchDataTable } from "../../components/BatchDataTable";

export const BatchDashboard = ({ user }) => {
  const { batchname } = useParams();

  const [isloading, setIsLoading] = useState(true);
  const [batchData, setBatchData] = useState([]);

  useEffect(() => {
    const fetchBatchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/general/getbatchinfo",
          {
            batchName: batchname,
          }
        );

        const responseData = await response.data;

        const _batchData = responseData.batchData.map((alumni, i) => {
          return {
            ...alumni,
            key: (i + 1).toString(),
          };
        });

        setBatchData(_batchData);

        setIsLoading(false);
      } catch {
        alert("Batch Data not found");
      }
    };

    fetchBatchData();
  }, [batchname]);

  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <BatchDataTable user={user} batchData={batchData} />
      )}
    </>
  );
};
