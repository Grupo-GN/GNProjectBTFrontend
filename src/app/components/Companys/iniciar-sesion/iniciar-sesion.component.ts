import { Component } from '@angular/core';
import { IniciarDataService } from 'src/app/Api/iniciar-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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

  datosEmpresa: any[] = [];

  constructor(private router: Router, private iniciarDataService: IniciarDataService) {}

  ngOnInit(): void {
    this.getDatos();
  }

  // Obtener datos de la API
  getDatos(): void {
    this.iniciarDataService.getDatos().subscribe({
      next: (response) => {
        this.datosEmpresa = response;
      },
      error: (error: HttpErrorResponse) => {
        this.message = 'Error al obtener datos: ' + error.message;
      }
    });
  }

  // Enviar datos con validación mejorada
  onSubmit(loginForm: any): void {
    if (loginForm.invalid) {
      this.message = 'Por favor, complete todos los campos correctamente.';
      return;
    }

    const formData = {
      id: this.id,
      name: this.name,
      type: this.type,
      ruc: this.ruc
    };

    this.iniciarDataService.enviarDatos(formData).subscribe({
      next: (response) => {
        this.getDatos();
        this.router.navigate(['/oferta-empresa']);  // Redirigir si la operación es exitosa
      },
      error: (error: HttpErrorResponse) => {
        this.message = 'Error al enviar datos: ' + error.message;
      }
    });
  }
}
