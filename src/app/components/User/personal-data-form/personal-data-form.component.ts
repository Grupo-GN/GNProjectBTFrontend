import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { PersonalDataService } from 'src/app/Api/personal-data.service'; // Importar el servicio


@Component({
  selector: 'app-personal-data-form',
  templateUrl: './personal-data-form.component.html',
  styleUrls: ['./personal-data-form.component.css']
})
export class PersonalDataFormComponent implements OnInit {
  isOpen = true; // Inicialmente el formulario está cerrado
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
  };
  habilidades: { id: number, nombre: string }[] = [
    { id: 1, nombre: 'Habilidades comunicativas' },
    { id: 2, nombre: 'Empatia' },
    { id: 3, nombre: 'Capacidades Organizativas' },
    // Añade más habilidades según sea necesario
  ];

  idiomas: { id: number, nombre: string }[] = [
    { id: 1, nombre: 'Aleman' },
    { id: 2, nombre: 'Español' },
    { id: 3, nombre: 'Portugues' },
    // Añade más idiomas según sea necesario
  ];

  estudios: { id: number, nombre: string }[] = [
    { id: 1, nombre: 'Arquitecto' },
    { id: 2, nombre: 'Ingeniero Industrial' },
    { id: 3, nombre: 'Doctor' },
    // Añade más estudios según sea necesario
  ];

  archivos: { id: number, nombre: string }[] = [
    { id: 1, nombre: 'Currículum' },
    { id: 2, nombre: 'Carta de Motivación' },
    { id: 3, nombre: 'Certificado' },
    // Añade más archivos según sea necesario
  ];
  
  constructor(
    private personalDataService: PersonalDataService,
    private elementRef: ElementRef
  ) { }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.closeForm(); // Cierra el formulario si el clic está fuera
    }
  }

  openForm(event: MouseEvent) {
    event.stopPropagation(); // Evita que el clic se propague al contenedor
    this.isOpen = true; // Abrir el formulario
  }

  closeForm() {
    this.isOpen = false; // Cerrar el formulario
  }

  ngOnInit(): void {
    this.loadPersonalData(); // Cargar datos cuando el componente se inicialice
  }

  


  // Método para cargar datos desde la API
  loadPersonalData(): void {
    this.personalDataService.getPersonalData().subscribe(data => {
      this.personalData = data;
    });
  }

  // Método para guardar los datos del formulario
  savePersonalData(): void {
    const habilidadesInput = this.personalData.id_habilidad as unknown as string[];
    const idiomasInput = this.personalData.id_idioma as unknown as string[];
    
      // Aquí puedes agregar la lógica para guardar los datos, ya sea localmente o enviándolos a un servidor
      console.log('Datos guardados:', this.personalData);
      this.isOpen = false; // Ocultar el formulario después de guardar
    
  

    // Convertir a los IDs correspondientes
    this.personalData.id_habilidad = this.mapNombresAHabilidadesIds(habilidadesInput);
    this.personalData.id_idioma = this.mapNombresAIdiomasIds(idiomasInput);
    this.personalData.id_estudio = this.mapNombreAEstudioId(this.personalData.id_estudio.toString());
    this.personalData.id_archivo = this.mapNombreAArchivoId(this.personalData.id_archivo.toString());

    // Usar el ID del candidato para la actualización
     // Asegúrate de que `id` esté establecido correctamente

    this.personalDataService.savePersonalData( this.personalData).subscribe(response => {
      console.log('Datos guardados exitosamente:', response);
      alert('Datos guardados exitosamente');
      this.closeForm(); // Cerrar el formulario después de guardar
    }, error => {
      console.error('Ha ocurrido un error al guardar los datos:', error);
    });
  }

  mapNombresAHabilidadesIds(nombres: string[]): number[] {
    return nombres.map(nombre => {
      const habilidad = this.habilidades.find(h => h.nombre.toLowerCase() === nombre.toLowerCase());
      return habilidad ? habilidad.id : 0; // Devuelve el ID o 0 si no se encuentra
    });
  }
  
  // Convertir nombres de idiomas a IDs
  mapNombresAIdiomasIds(nombres: string[]): number[] {
    return nombres.map(nombre => {
      const idioma = this.idiomas.find(i => i.nombre.toLowerCase() === nombre.toLowerCase());
      return idioma ? idioma.id : 0; // Devuelve el ID o 0 si no se encuentra
    });
  }
  
  // Convertir nombre de estudio a ID
  mapNombreAEstudioId(nombre: string): number {
    const estudio = this.estudios.find(e => e.nombre.toLowerCase() === nombre.toLowerCase());
    return estudio ? estudio.id : 0; // Devuelve el ID o 0 si no se encuentra
  }
  
  // Convertir nombre de archivo a ID
  mapNombreAArchivoId(nombre: string): number {
    const archivo = this.archivos.find(a => a.nombre.toLowerCase() === nombre.toLowerCase());
    return archivo ? archivo.id : 0; // Devuelve el ID o 0 si no se encuentra
  }
}
