import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient){}

  private API_USUARIOS = "http://localhost:3000/users";

  // Registar usuarios
  postUser2(usuarios:any):Observable<any>{
    return this.http.post(this.API_USUARIOS,usuarios)
  }
  ////Leer - GET
  getUsuarios(): Observable<any> {
    return this.http.get(this.API_USUARIOS);
  }

  getUsuarioUnico(id: any): Observable<any> {
    return this.http.get(`${this.API_USUARIOS}/${id}`);
  }

  ////Eliminar - DELETE
  deleteUsuario(id: any): Observable<any> {
    return this.http.delete(`${this.API_USUARIOS}/${id}`);
  }


  obtenerPermisos(): Observable<any[]> {
    return this.http.get<any[]>(this.API_USUARIOS);
  }

  // PARA LOGIN GUARDS
  private API_USERS = "http://localhost:3000/login";

  postUser(usuarios:any):Observable<any>{
    return this.http.post(this.API_USERS,usuarios)
  }
}
