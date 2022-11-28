import http from "./http-common";

class WarehouseDataService {
  getAll(params) {
    return http.get("/warehouses", { params });
  }

  get(id) {
    return http.get(`/warehouses/${id}`);
  }

  create(data) {
    return http.post("/warehouses", data);
  }

  update(id, data) {
    return http.put(`/warehouses/${id}`, data);
  }

  delete(id) {
    return http.delete(`/warehouses/${id}`);
  }

  deleteAll() {
    return http.delete("/warehouses");
  }
}

export default new WarehouseDataService();
