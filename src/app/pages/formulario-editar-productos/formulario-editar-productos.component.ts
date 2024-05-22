import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-formulario-editar-productos',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './formulario-editar-productos.component.html',
  styleUrl: './formulario-editar-productos.component.css'
})
export class FormularioEditarProductosComponent {
  id: any;
  codigo: any;
  nombre: any;
  marca: any;
  color: any;
  precio: any;
  imagen: string = '';

  constructor(private route: ActivatedRoute, private servicio: ProductosService) { }

  ngOnInit(): void {
    // Obtener el ID del libro de los parámetros de la ruta
    this.id = this.route.snapshot.paramMap.get('idProductos');

    // Obtener los detalles del libro a editar y prellenar el formulario
    this.servicio.getProductoUnico(this.id).subscribe(productos => {
      // console.log(productos); // Verificar si se reciben los datos correctamente
      this.codigo = productos.codigo;
      this.nombre = productos.nombre;
      this.marca = productos.marca;
      this.color= productos.color;
      this.precio = productos.precio;
      this.imagen = productos.imagen
    });
  }

  guardar(formulario: NgForm) {
    const datos = {
      id: this.id,
      codigo: this.codigo,
      nombre: this.nombre,
      marca: this.marca,
      color: this.color,
      precio: this.precio,
      imagen: this.imagen // Puedes enviar la URL de la imagen al servicio
    };

    // Enviar los datos actualizados al servicio para actualizar el libro en la base de datos
    this.servicio.putProductos(datos).subscribe(() => {
      // Redirigir después de guardar
      window.location.href = 'Gestionar';
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      // Convertir la imagen en una URL
      this.imagen = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  cancelar() {
    window.location.href = 'Gestionar';
  }
}
