import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  id: any;
  codigo: any;
  nombre: any;
  marca: any;
  color: any;
  precio: any;
  imagen: string = '';
  cantidad:any

  constructor(private servicio: ProductosService) {}

  guardar(datos: NgForm) {
    console.log(datos.value);
    // Enviar datos y URL de la imagen al servicio para el registro en la base de datos
    const datosConImagen = { ...datos.value, imagen: this.imagen };
    this.servicio.postProductos(datosConImagen).subscribe(() => {
      // Redireccionar después de guardar
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

}
