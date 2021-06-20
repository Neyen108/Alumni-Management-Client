import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../../components/Loading";
import { BatchTable } from "../../components/BatchTable";

//TODO: get batch-wise info

export const Dashboard = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [batches, setBatches] = useState([]);

  //get batches once, only when reload occurs
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const batchesResponse = await axios.get(
          "http://localhost:5000/api/general/getBatches"
        );

        const batchesData = await batchesResponse.data.batchesData;

        console.log(batchesData);

        setBatches(batchesData);
        setIsLoading(false);
      } catch {
        alert("error");
      }
    };

    fetchBatches();
  }, []);

  return (
    <>
      {isLoading ? <Loading /> : <BatchTable batches={batches} user={user} />}
    </>
  );
};
