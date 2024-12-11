import { useEffect, useState } from "react";
import { API } from "./API";

export default function useLoad(endpoint) {
  // State -----------------------------------
  const [records, setRecords] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records ...");

  // Methods -----------------------------------
  const loadRecords = async (endpoint) => {
    const response = await API.get(endpoint);
    response.isSuccess
      ? setRecords(response.result)
      : setLoadingMessage(response.message);
  };

  useEffect(() => {
    loadRecords(endpoint);
  }, [endpoint]);

  // Return -------------------------------------
  return [records, loadingMessage, loadRecords];
}
