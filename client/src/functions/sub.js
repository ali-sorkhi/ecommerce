import axios from "axios";

export const getSubs = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subs`);

export const getSub = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

export const removeSub = async (slug, authtoken, email) => {
  return await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
    headers: {
      authtoken, // == authtoken : authtoken
      email,
    },
  });
};

export const updateSub = async (slug, sub, authtoken, email) => {
  return await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`,sub, {
    headers: {
      authtoken, // == authtoken : authtoken
      email,
    },
  });
};

export const createSub = async (sub, authtoken, email) => {
  return await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
    headers: {
      authtoken, // == authtoken : authtoken
      email,
    },
  });
};
