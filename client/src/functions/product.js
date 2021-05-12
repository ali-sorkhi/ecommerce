import axios from "axios";

export const createProduct = async (product, authtoken, email) => {
    return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
      headers: {
        authtoken, // == authtoken : authtoken
        email,
      },
    });
  };

export const getProductsByCount = async (count) => {
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
}
