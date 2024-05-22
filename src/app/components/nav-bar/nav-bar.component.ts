import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  servicio = inject(UsuariosService)
  constructor(private router:Router){}
  token: any

  ///Cerrar Sesion
  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("admin")
    localStorage.removeItem("users")
    window.location.href=('Login')
  }
  
  ///Ocultar ventanas
  ocultar = localStorage.getItem('token')
}
