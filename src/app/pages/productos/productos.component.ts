import { Component } from '@angular/core';
import { GaleriaComponent } from '../../components/galeria/galeria.component';
import { CarritoComponent } from '../../components/carrito/carrito.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [GaleriaComponent,CarritoComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  isCarritoHidden = true;

  toggleCarrito() {
    this.isCarritoHidden = !this.isCarritoHidden;
  }
  
}
