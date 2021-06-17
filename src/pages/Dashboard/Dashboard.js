import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../../components/Loading";

//TODO: get ant-table, get batch-wise info, get passwords, add password modal

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [batches, setBatches] = useState([]);

  //get batches once, only when reload
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

  return <>{isLoading ? <Loading /> : <h1>Dashboard</h1>}</>;
};
