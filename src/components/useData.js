import React, { useState, useEffect } from "react";
import http from "./services/http-axios";

export default function useData(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [returnData, setReturnData] = useState([]);
  const [error, setServerError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      getData(url);
    };

    fetchData();
  }, [url]);

  const getData = async (url) => {
    setIsLoading(true);
    const response = await http
      .get(url)
      .then((response) => {
        setReturnData(response.data);
      })
      .catch((error) => {
        setServerError(error);
      })
      .finally(() => setIsLoading(false));
  };

  const createData = async (url, post) => {
    if (!url) return;
    setIsLoading(true);
    const response = await http
      .post(url, post)
      .then((response) => {
        let updatedData = [...returnData];
        let newPost = { ...response.data };
        newPost.id = Math.max(...returnData.map((d) => d.id)) + 1;

        updatedData.push(newPost);
        setReturnData(updatedData);
      })
      .catch((error) => {
        setServerError(error);
      })
      .finally(() => setIsLoading(false));
  };

  const updateData = (url, post) => {
    if (!url) return;
    setIsLoading(true);
    const response = http
      .put(url, post)
      .then((response) => {
        // Simulating an update
        let originalPostIndex = returnData.findIndex(
          (obj) => obj.id == post.id
        );
        returnData[
          originalPostIndex
        ].title = `${returnData[originalPostIndex].title} - Updated`;
        returnData[
          originalPostIndex
        ].body = `${returnData[originalPostIndex].body} - Updated`;

        setReturnData(returnData);
      })
      .catch((error) => {
        setServerError(error);
      })
      .finally(() => setIsLoading(false));
  };

  const deleteData = async (url, postId) => {
    if (!url) return;
    setIsLoading(true);

    const response = await http
      .delete(url)
      .then((response) => {
        // Simulate the call which would remove data from the database
        var filteredArray = returnData.filter((e) => e.id !== postId);
        setReturnData(filteredArray);
      })
      .catch((error) => {
        setServerError(error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleMockedPost = (post) => {
    // Simulating an update
    let originalPostIndex = returnData.findIndex((obj) => obj.id == post.id);
    returnData[
      originalPostIndex
    ].title = `${returnData[originalPostIndex].title} - Updated`;
    returnData[
      originalPostIndex
    ].body = `${returnData[originalPostIndex].body} - Updated`;

    setReturnData(returnData);
  };

  return {
    isLoading,
    returnData,
    error,
    getData,
    createData,
    updateData,
    deleteData,
    handleMockedPost,
  };
}
