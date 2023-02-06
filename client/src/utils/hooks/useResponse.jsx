import React, { createContext, useState, useContext, useMemo } from 'react';
const ResponseContext = createContext();

export const ResponseProvider = ({ children }) => {
  const [responseMessages, setResponseMessages] = useState([]);

  // call this function when you want to authenticate the user
  const setResponse = (message, severity) => setResponseMessages([...responseMessages, { message, severity }]);

  const onClose = (index) => {
    let responses = [...responseMessages];
    responses.splice(index, 1);
    setResponseMessages(responses);
  };

  const value = useMemo(
    () => ({
      responseMessages,
      setResponse,
      onClose,
    }),
    [responseMessages],
  );

  return <ResponseContext.Provider value={value}>{children}</ResponseContext.Provider>;
};

export const useResponse = () => useContext(ResponseContext);
