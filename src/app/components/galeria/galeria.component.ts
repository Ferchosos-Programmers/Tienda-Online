import { Component } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent {

  productos: any[] = []; // Inicializar productos como un array vacío
  filtroMarca: string = '';
  marcasUnicas: string[] = [];

  constructor(private productosService: ProductosService,
              private carritoService: CarritoService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.productosService.getProductos().subscribe((productos: any[]) => {
      this.productos = productos; // Asignar productos después de obtenerlos
      this.calcularMarcasUnicas();
    });
  }

  calcularMarcasUnicas(): void {
    const marcasSet = new Set<string>();
    this.productos.forEach(producto => {
      marcasSet.add(producto.marca);
    });
    this.marcasUnicas = Array.from(marcasSet);
  }

  agregarCarrito(producto: any) {
    this.carritoService.agregarAlCarrito(producto);
    console.log('Producto agregado al carrito:', producto);
    Swal.fire('¡Agregado!', 'El producto ha sido agregado al carrito.', 'success').then(() => {
    });
  }
}

