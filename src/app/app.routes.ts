import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { SuscripcionComponent } from './pages/suscripcion/suscripcion.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { Error404Component } from './pages/error404/error404.component';
import { LoginComponent } from './pages/login/login.component';
import { login2Guard, loginGuard, susucripcionGuard } from './guards/login.guard';
import { Suscripcion2Component } from './pages/suscripcion2/suscripcion2.component';
import { GestionarProductosComponent } from './pages/gestionar-productos/gestionar-productos.component';
import { FormularioEditarProductosComponent } from './pages/formulario-editar-productos/formulario-editar-productos.component';
import { FormularioComponent } from './components/formulario/formulario.component';

export const routes: Routes = [
    {path: 'Home', component: HomeComponent},
    {path: 'Productos', component: ProductosComponent,canActivate:[login2Guard]},
    {path: 'Gestionar', component: GestionarProductosComponent,canActivate:[loginGuard]},
    {path: 'Formulario', component: FormularioComponent,canActivate:[loginGuard]},
    {path: 'editar/:idProductos', component: FormularioEditarProductosComponent,canActivate:[loginGuard]},
    {path: 'Nosotros', component: NosotrosComponent},
    {path: 'Suscripcion', component: SuscripcionComponent,canMatch:[susucripcionGuard]},
    {path: 'Suscripcion', component: Suscripcion2Component},
    {path: 'Contactanos', component: ContactanosComponent},
    {path: 'Login', component: LoginComponent},

    {path: "", redirectTo:'Home', pathMatch:'full'},
    {path:"**", component:Error404Component}
];
