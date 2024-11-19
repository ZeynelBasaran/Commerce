import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_APP_BASE_URL}`


export const getData = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDataiById = async (id) => {
  try {
    const response = await axios.get(BASE_URL+id);
    return response.data;
    
  } catch (error) {
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}categories`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategoriesPagesData = async (category) => {
  try {
    const response = await axios.get(
      `${BASE_URL}category/${category}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

