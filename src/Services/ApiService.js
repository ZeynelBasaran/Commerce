
import { useQuery } from '@tanstack/react-query';
import { fetchProducts,fetchCategories,fetchCategoryData,fetchProductById,searchInputValue } from '../api/product';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,     // 5 dakika boyunca veri "taze" Cache işlemleri
    cacheTime: 1000 * 60 * 10,    // 10 dakika bellekte sakla
  });
};

export const useProductById = (id) => {
  return useQuery({
    queryKey: ['product',id],
    queryFn: () => fetchProductById(id),
    enabled: !!id, // id varsa sorguyu çalıştır
    staleTime: 1000 * 60 * 5,     
  });
};

export const useCategory = () => {
  return useQuery({
    queryKey: ['/products/categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,  
    cacheTime: 1000 * 60 * 10,    
  });
};

export const useCategoryData = (category) => {
  return useQuery({
    queryKey: ['category',category],
    queryFn: () => fetchCategoryData(category),
    enabled: category.length > 0, 
    staleTime: 1000 * 60 * 5, // 5 dakika boyunca veriyi taze tut
  });
};

export const useSearch = (value) => {
  return useQuery({
    queryKey: ['search',value],
    queryFn: () => searchInputValue(value),
    enabled: value?.trim().length > 1, // Sadece 2 karakterden fazla arama yapıldığında sorguyu çalıştır
    staleTime: 1000 * 60 * 5,     
  });
};










