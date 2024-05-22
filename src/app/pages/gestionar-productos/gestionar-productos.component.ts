import { Component } from '@angular/core';
import { TablaComponent } from '../../components/tabla/tabla.component';

@Component({
  selector: 'app-gestionar-productos',
  standalone: true,
  imports: [TablaComponent],
  templateUrl: './gestionar-productos.component.html',
  styleUrl: './gestionar-productos.component.css'
})
export class GestionarProductosComponent {

}
