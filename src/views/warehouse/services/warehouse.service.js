import http from "./http-common";
import authHeader from '../../../services/auth-header';

class WarehouseDataService {
  getAll(params) {
    return http.get("/warehouses", { params }, { headers: authHeader() });
  }

  get(id) {
    return http.get(`/warehouses/${id}`, { headers: authHeader() });
  }

  create(data) {
    return http.post("/warehouses", data, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/warehouses/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/warehouses/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete("/warehouses", { headers: authHeader() });
  }
}

export default new WarehouseDataService();
