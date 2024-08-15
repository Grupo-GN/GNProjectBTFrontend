import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  public showNewAlertBox: boolean = false;
  public alertas: Array<{ id: number, cargo: string, categorias: string[], regiones: string[] }> = [];
  public showSuccessMessage: boolean = false;
  public newAlert: { id: number, cargo: string, categorias: string[], regiones: string[] } = { id: 0, cargo: '', categorias: [], regiones: [] };
  public editMode: boolean = false;
  public editAlertId: number | null = null;
  public itemsPerPage: number = 5; // Número de alertas por página
  public currentPage: number = 1; // Página actual
  public editingIndex: number | null = null; // Índice de la alerta que se está editando
  public alertaSeleccionada: any;
  public showEditAlertBox: boolean = false;  // Nueva variable para manejar la visibilidad del cuadro de edición


  ngOnInit() {
    this.loadAlertas();
    
  }
  

// Cálculo de la cantidad total de páginas
get totalPages(): number {
    return Math.ceil(this.alertas.length / this.itemsPerPage);
}
 // Array con el número total de páginas
 get totalPagesArray(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i + 1);
}

// Obtener las alertas de la página actual
get paginatedAlertas(): Array<{ id: number, cargo: string, categorias: string[], regiones: string[] }> {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.alertas.slice(start, start + this.itemsPerPage);
}


  
  //metodos adicionales para la gestion de alertas
  onCheckboxChange(event: any, type: string) {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (type === 'categoria') {
      this.toggleSelection(this.newAlert.categorias, value, isChecked);
    } else if (type === 'region') {
      this.toggleSelection(this.newAlert.regiones, value, isChecked);
    }
  }

  private toggleSelection(array: string[], value: string, isChecked: boolean) {
    if (isChecked) {
      if (!array.includes(value)) {
        array.push(value);
      }
    } else {
      const index = array.indexOf(value);
      if (index > -1) {
        array.splice(index, 1);
      }
    }
  }
  guardarAlerta() {
    if (this.editMode && this.editAlertId !== null) {
      const index = this.alertas.findIndex(alert => alert.id === this.editAlertId);
      if (index > -1) {
          this.alertas[index] = { ...this.newAlert, id: this.editAlertId };
      }
      this.editMode = false;
      this.editAlertId = null;
      this.editingIndex = null;
      this.showEditAlertBox = false;  // Oculta el cuadro de edición después de guardar
    } else {
      const newId = this.alertas.length > 0 ? Math.max(...this.alertas.map(a => a.id)) + 1 : 1;
      this.alertas.unshift({ ...this.newAlert, id: newId });
    }
    
    this.saveAlertas();
    
    this.newAlert = { id: 0, cargo: '', categorias: [], regiones: [] };
    this.showSuccessMessage = true;
  
}

toggleNewAlertBox() {
    this.showNewAlertBox = !this.showNewAlertBox;
    if (!this.showNewAlertBox) {
        // Reset newAlert cuando se oculta el formulario
        this.newAlert = { id: 0, cargo: '', categorias: [], regiones: [] };
        this.editMode = false;
        this.editAlertId = null;
        this.editingIndex = null; // Resetea el índice de edición

    }
}

  
editAlerta(alerta: { id: number, cargo: string, categorias: string[], regiones: string[] }, index: number) {
  this.newAlert = { 
    id: alerta.id,
    cargo: alerta.cargo,
    categorias: [...alerta.categorias], 
    regiones: [...alerta.regiones] 
  };
  this.editMode = true;
  this.editAlertId = alerta.id;
  this.editingIndex = index; 
  this.showEditAlertBox = true;  // Muestra el cuadro de edición
}
cancelEdit() {
  this.editMode = false;
  this.editAlertId = null;
  this.editingIndex = null; // Resetea el índice de edición
  this.showEditAlertBox = false;  // Oculta el cuadro de edición
}


  deleteAlerta(alertId: number) {
    this.alertas = this.alertas.filter(alert => alert.id !== alertId);
    this.saveAlertas();
  }

  closeSuccessMessage() {
    this.showSuccessMessage = false;
  }

  private saveAlertas() {
    try {
      localStorage.setItem('alertas', JSON.stringify(this.alertas));
    } catch (error) {
      console.error('Error saving alertas to localStorage', error);
    }
  }

  private loadAlertas() {
    try {
      const storedAlertas = localStorage.getItem('alertas');
      if (storedAlertas) {
        this.alertas = JSON.parse(storedAlertas);
      }
    } catch (error) {
      console.error('Error loading alertas from localStorage', error);
    }
  }
  //cambiar pagina
  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
    }
}
seleccionarAlerta(alerta: any) {
  if (this.alertaSeleccionada === alerta) {
    this.alertaSeleccionada = null; // Desmarca si ya está seleccionado
  } else {
    this.alertaSeleccionada = alerta;
  }
}


}
