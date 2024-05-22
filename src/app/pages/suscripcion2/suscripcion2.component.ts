import { Component, inject } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-suscripcion2',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './suscripcion2.component.html',
  styleUrl: './suscripcion2.component.css'
})
export class Suscripcion2Component {

  servicio = inject(UsuariosService)
  
  email: any
  password: any
  token: any

  login(formulario: any) {
    this.servicio.postUser(formulario.value).subscribe(p => {
      this.token = p.accessToken
      if (this.token != '') {
        localStorage.setItem("token", 'true')
        window.location.href=('Productos')
      }
    })
  }

}
