import { Component } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

  productosCarrito: any[] = [];

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.productosCarrito = this.carritoService.obtenerCarrito();
    
  }

  calcularTotal(): string {
    let total = 0;
    for (let producto of this.productosCarrito) {
      total += parseFloat(producto.precio); // Convertir el precio a número
    }
    return total.toFixed(2); // Devolver el total con dos decimales
  }

  eliminarProducto(index: number): void {
    // Mostrar alerta de confirmación antes de eliminar el producto
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este producto del carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, eliminar el producto
        this.productosCarrito.splice(index, 1);
        // También puedes actualizar tu carrito en el servicio aquí
        Swal.fire('¡Eliminado!', 'El producto ha sido eliminado del carrito.', 'success');
      }
    });
  }

  finalizarCompra(): void {
    const printContent = this.generatePrintContent();
  
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error('No se pudo abrir la ventana de impresión.');
    }
  
    // Limpiar el carrito
    this.carritoService.deleteCarrito();
    window.location.reload()
  }
  
  generatePrintContent(): string {
    let content = `
      <div class="container">
        <h1>Resumen de Compra</h1>
        <div class="productos">
    `;
    this.productosCarrito.forEach(producto => {
      content += `
        <div class="producto">
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <div class="info">
            <p>${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
          </div>
        </div>
      `;
    });
    content += `
        </div>
        <p class="total">Total: $${this.calcularTotal()}</p>
      </div>
    `;
  
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Resumen de Compra</title>
        <style>
          body { font-family: Arial, sans-serif; }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
          }
          h1 { color: #333; text-align: center; }
          .productos {
            margin-top: 20px;
          }
          .producto {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
          }
          .producto img {
            width: 50px;
            height: 50px;
            margin-right: 10px;
            border-radius: 5px;
          }
          .info p {
            margin: 0;
          }
          .total {
            font-size: 18px;
            font-weight: bold;
            text-align: right;
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
      </html>
    `;
  }

  cancelarCompra() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará todos los productos del carrito. ¿Deseas continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cancelar compra',
        cancelButtonText: 'No, mantener productos'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, eliminamos el carrito y recargamos la página
            this.carritoService.deleteCarrito();
            location.reload();
        }
    });
}
}
