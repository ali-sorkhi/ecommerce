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
  return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
}

export const removeProduct = async (slug, authtoken, email) => {
  return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken, // == authtoken : authtoken
      email,
    },
  });
};