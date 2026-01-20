import axios from 'axios';
import authService from './AuthService';

const API_URL = 'http://localhost:8080/api/products/';

class ProductService {
  async getAllProducts() {
    return axios.get(API_URL, { 
      headers: authService.getAuthHeader() 
    });
  }

  async getProductById(id) {
    return axios.get(API_URL + id, { 
      headers: authService.getAuthHeader() 
    });
  }

  async createProduct(product) {
    return axios.post(API_URL, product, { 
      headers: authService.getAuthHeader() 
    });
  }

  async updateProduct(id, product) {
    return axios.put(API_URL + id, product, { 
      headers: authService.getAuthHeader() 
    });
  }

  async deleteProduct(id) {
    return axios.delete(API_URL + id, { 
      headers: authService.getAuthHeader() 
    });
  }

  async searchProducts(name) {
    return axios.get(API_URL + 'search?name=' + name, { 
      headers: authService.getAuthHeader() 
    });
  }
}

export default new ProductService();