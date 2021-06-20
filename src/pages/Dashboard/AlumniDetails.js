import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "antd";
import { Loading } from "../../components/Loading";

export const AlumniDetails = () => {
  const { batchname, id } = useParams();
  const [isloading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchAlumniData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/general/getAlumniInfo",
          {
            batch: batchname,
            id: id,
          }
        );

        const alumniData = await response.data.alumniData;

        setData(alumniData);
        setIsLoading(false);
        console.log(alumniData);
      } catch {
        alert("Data not found");
      }
    };

    fetchAlumniData();
  }, []);

  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <Card title="Details" style={{ width: 300 }}>
          <p>ID : {data.id}</p>
          <p>Name : {data.name}</p>
          <p>Email : {data.email}</p>
          <p>Batch : {data.batch}</p>
          <p>CGPA : {data.CGPA}</p>
          <p>Gender : {data.gender}</p>
          <p>Programme : {data.programme}</p>
        </Card>
      )}
    </>
  );
};
