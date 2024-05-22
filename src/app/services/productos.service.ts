import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) {}

  private API_PRODUCTOS = 'http://localhost:9090/productos';
  // private API_PRODUCTOS = 'http://localhost:3001/productos';

  ////Leer - GET
  getProductos(): Observable<any> {
    return this.http.get(this.API_PRODUCTOS);
  }

  getProductoUnico(id: any): Observable<any> {
    return this.http.get(`${this.API_PRODUCTOS}/${id}`);
  }

  ///GUARDAR - POST
   postProductos(productos: JSON): Observable<any> {
    return this.http.post(this.API_PRODUCTOS, productos);
  }
  ///EDITAR - PUT
  putProductos(productos:any): Observable<any> {
    return this.http.put(`${this.API_PRODUCTOS}/${productos.id}`,productos);
  }
  ////Eliminar - DELETE
  deleteProductos(id: any): Observable<any> {
    return this.http.delete(`${this.API_PRODUCTOS}/${id}`);
  }
}
