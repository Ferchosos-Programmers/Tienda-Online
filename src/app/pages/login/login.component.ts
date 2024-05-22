import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  servicio = inject(UsuariosService)

  email: any
  password: any
  token: any

  login(formulario:any){
    this.servicio.postUser(formulario.value).subscribe(p =>{
      this.token = p.accessToken
      console.log(p);
      
      if (this.token != '') {
        localStorage.setItem("token",'true')
        if (p.user.roles == 'admin') {
          localStorage.setItem("admin",'true')
          window.location.href=('Gestionar')
        }else if (p.user.roles == 'users') {
          localStorage.setItem("users",'true')
          window.location.href=('Productos')
        }
      }
      
    })
  }
}
