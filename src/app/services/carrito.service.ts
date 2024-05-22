import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  productos: any[] = [];

  agregarAlCarrito(productos: any) {
    this.productos.push(productos);
  }

  obtenerCarrito() {
    return this.productos;
  }

  deleteCarrito() {
    this.productos = []
  }
}
