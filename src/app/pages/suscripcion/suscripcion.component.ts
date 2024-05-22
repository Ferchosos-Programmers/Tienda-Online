import { Component, inject } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suscripcion',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './suscripcion.component.html',
  styleUrl: './suscripcion.component.css'
})
export class SuscripcionComponent {

  servicio = inject(UsuariosService)
  email: any
  password: any
  edad:any
  genero:any
  roles:any
  token: any
  

  registro(datos: any) {
    this.servicio.postUser2(datos.value).subscribe()
    window.location.reload()
  }
}
