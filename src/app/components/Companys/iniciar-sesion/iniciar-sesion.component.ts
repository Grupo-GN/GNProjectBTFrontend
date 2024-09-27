import { Component } from '@angular/core';
import { IniciarDataService } from 'src/app/Api/iniciar-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';  // Importación de Router



@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {
  id: number | null = null;
  name: string = '';
  type: string = '';
  ruc: number | null = null;
  keepMeLoggedIn: boolean = false;
  message: string | null = null;

  constructor(private router: Router, private iniciarDataService: IniciarDataService) {}

  onSubmit() {
    // Si id o ruc no son válidos (null), no se envía el formulario.
    if (this.id === null || this.ruc === null) {
      this.message = 'Por favor, complete los campos obligatorios correctamente.';
      return;
    }

    const formData = {
      id: this.id,    // Asegúrate de que sea un número
      name: this.name,
      type: this.type,
      ruc: this.ruc   // Asegúrate de que sea un número
    };

    // Debug: Muestra los datos en la consola para verificar
    console.log('Enviando datos:', formData);

    // Llamada al servicio para enviar los datos
    this.iniciarDataService.enviarDatos(formData).subscribe({
      next: (response) => {
        // Redirige a la URL interna usando Angular Router
        console.log('Respuesta del servidor:', response);
        this.router.navigate(['/oferta-empresa']);  // Redirige a la página de oferta empresa
      },
      error: (error: HttpErrorResponse) => {
        // Si hay un error, maneja el error aquí.
        console.error('Error al iniciar sesión:', error);
        this.message = 'Error al iniciar sesión: ' + error.message;
      }
    });
  }
  
  
}
