import API_URL from "./apiURL";

export const API = {};

API.get = (endpoint) => callFetch(endpoint, "GET", null);
API.post = (endpoint, data) => callFetch(endpoint, "POST", data);
API.put = (endpoint, data) => callFetch(endpoint, "PUT", data);
API.delete = (endpoint) => callFetch(endpoint, "DELETE", null);

const callFetch = async (endpoint, method, dataObj) => {
  console.log("callFetch", method);
  // Build request object
  let requestObj = { method: method }; // GET, POST, PUT or DELETE
  if (dataObj)
    requestObj = {
      ...requestObj,
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(dataObj),
    };

  // Call the fetch and process the return
  try {
    const endpointAddress = API_URL + endpoint;
    console.log("[Call fetch] endpoint: ", endpointAddress);
    console.log("[Call fetch] requestobject: ", JSON.stringify(requestObj));
    const response = await fetch(endpointAddress, requestObj);
    const result = response.status !== 204 ? await response.json() : null;
    return response.status >= 200 && response.status < 300
      ? { isSuccess: true, result: result }
      : {
          isSuccess: false,
          message: `Error recovering records: status code ${response.status}`,
        };
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

export default API;
