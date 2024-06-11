const PROD_URL = 'https://helicopterservices.co.uk';

export const getUrlPrefix = () => {
  if (typeof window !== "undefined") {
    const isLocalhost = window.location.hostname === "localhost";
    return isLocalhost ? "http://localhost:3000" : "https://your-production-domain.com";
  }
  if (process.env.NODE_ENV === "development"){
    return  PROD_URL;
  }
}