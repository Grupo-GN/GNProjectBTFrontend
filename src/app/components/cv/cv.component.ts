import { Component, OnInit } from '@angular/core';
import { PersonalDataService } from 'src/app/personal-data.service';


@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CVComponent implements OnInit{

  personalData = {
    id: 0,
    nombre: '',
    apellidos: '',
    correo: '',
    experiencia: '',
    id_estudio: 0,
    id_archivo: 0,
    id_habilidad: [] as number[],
    id_idioma: [] as number[]
  }; // Asegúrate de inicializar correctamente

  constructor(private personalDataService: PersonalDataService) { }

  ngOnInit(): void {
    this.personalDataService.getPersonalData().subscribe(data => {
      this.personalData = data;
      console.log('Datos recibidos en CVComponent:', this.personalData); // Verifica si los datos están siendo recibidos
    });
  }


  mostrarFormulario: boolean = false;
  isOpen = true;
 

  savePersonalData() {
    // Lógica para guardar los datos
    console.log('Datos guardados:', this.personalData);
    this.isOpen = false; // Ocultar el formulario después de guardar
  }
  
  openForm(event: MouseEvent) {
    event.stopPropagation(); // Evita que el clic se propague al contenedor
    this.mostrarFormulario = !this.mostrarFormulario;
  }
}
