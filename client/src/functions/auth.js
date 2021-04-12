import axios from "axios";

export const createOrUpdateUser = async (authtoken, email) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken, // == authtoken : authtoken
        email
      },
    }
  );
};

export const currentUser = async (authtoken, email) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authtoken, // == authtoken : authtoken
        email
      },
    }
  );
};