import axios from "axios";

const BASE_URL = `https://dummyjson.com`;

export const fetchProducts = async () => {
  const res = await axios.get(`${BASE_URL}/products`);
  return res.data.products;
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`${BASE_URL}/products/${id}`);
  return res.data;
};


export const fetchCategories = async () => {
  const res = await axios.get(`${BASE_URL}/products/categories`);
  return res.data;
};

export const fetchCategoryData = async (category) => {
  const results = await Promise.all(
    category.map(async (category) => {
      const res = await fetch(`${BASE_URL}/products/category/${category}`);
      if (!res.ok) throw new Error(`Error fetching category: ${category}`);
      const data = await res.json();
      return data.products || []; 
    })
  );
  // Tüm kategorilerin ürünlerini tek array'de birleştir
  return results.flat();
};

export const searchInputValue = async (value) => {
  const res = await axios.get(`${BASE_URL}/products/search?q=${value}`);
  return res.data.products;
};
