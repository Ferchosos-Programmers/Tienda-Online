import { Component } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent {

  productos: any[]=[];
  id:any;
  filtroMarca: string = '';
  marcasUnicas: string[] = [];
  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe((productos: any[]) => {
      this.productos = productos; // Asignar productos después de obtenerlos
      this.calcularMarcasUnicas();
    });
  }


  cargarProductos() {
    this.productosService.getProductos().subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        console.log('Error al cargar los productos', error);
      }
    );
  }


  calcularMarcasUnicas(): void {
    const marcasSet = new Set<string>();
    this.productos.forEach(producto => {
      marcasSet.add(producto.marca);
    });
    this.marcasUnicas = Array.from(marcasSet);
  }



  eliminar(id: any) {
    this.productosService.deleteProductos(id).subscribe(
      () => {
        // Eliminar el producto de la lista local
        this.productos = this.productos.filter(productos => productos.id !== id);
        // Mostrar un mensaje de éxito
        Swal.fire('¡Producto eliminado!', 'El producto ha sido eliminado correctamente.', 'success');
      },
      (error) => {
        console.log('Error al eliminar el producto', error);
        // Mostrar un mensaje de error si la eliminación falla
        Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
      }
    );
  }

  confirmarEliminar(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminar(id);
      }
    });
  }

}
