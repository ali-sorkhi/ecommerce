import axios from "axios";

export const getCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/Categories`);

export const getCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/Category/${slug}`);

export const removeCategory = async (slug, authtoken, email) => {
  return await axios.delete(`${process.env.REACT_APP_API}/Category/${slug}`, {
    headers: {
      authtoken, // == authtoken : authtoken
      email,
    },
  });
};

export const updateCategory = async (slug, category, authtoken, email) => {
  return await axios.put(`${process.env.REACT_APP_API}/Category/${slug}`,category, {
    headers: {
      authtoken, // == authtoken : authtoken
      email,
    },
  });
};

export const createCategory = async (category, authtoken, email) => {
  return await axios.post(`${process.env.REACT_APP_API}/Category`, category, {
    headers: {
      authtoken, // == authtoken : authtoken
      email,
    },
  });
};
