const env = () => {
  return {
    API_URL: import.meta.env ? import.meta.env.VITE_APP_API_URL : '',
  };
};

export default env();
