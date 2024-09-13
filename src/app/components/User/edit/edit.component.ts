import { HttpClient } from'@angular/common/http';
import { Component, HostListener, OnInit } from'@angular/core';
import { FormBuilder, FormGroup, Validators } from'@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from'rxjs';
import { UserService } from'src/app/Api/user.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{
  privacyForm: FormGroup;
  
  emailForm!: FormGroup;
  passwordForm!: FormGroup;
  showEmailSuccessMessage = false;
  showEmailErrorMessage = false;
  showPasswordSuccessMessage = false;
  showPasswordErrorMessage = false;


  suggestionsVisible: string | null = null;
  lastSearches: string[] = [''];
  popularJobs: string[] = [
    'Atención al cliente',
    'Asesor/a de ventas',
    'Agente de seguridad',
    'Operarios/as de limpieza',
    'Promotor/a de ventas',
    'Call center'
  ];
  CountrySearches: string[] = [''];
  popularPlaces: string[] = [
    'Arequipa',
    'Lima',
    'Cusco',
    'Trujillo',
    'Chiclayo',
    'Iquitos'
  ];
  filteredPlaces: string[] = [...this.popularPlaces];
  filteredJobs: string[] = [...this.popularJobs];
  searchTerm: string = '';
  placeTerm: string = '';
  private searchTerms = new Subject<string>();
  private placeTerms = new Subject<string>();
  selectedView: string = 'localizacion';
  confirmDelete: boolean = false;
   // Consider defining a specific type if applicable
  editForm: any;



  constructor(private http: HttpClient , private fb: FormBuilder, private userService: UserService
  ) {

    this.privacyForm = this.fb.group({
      privacyLevel: ['1']  // valor por defecto
    });
    this.emailForm = this.fb.group({
      newEmail: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPasswordConfirm: ['', [Validators.required]]
    });
    this.editForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  


  ngOnInit() {

   

    this.emailForm = this.fb.group({
      newEmail: ['', [Validators.required, Validators.email]],
      newEmailConfirm: ['', [Validators.required, Validators.email]]
    }, { validator: this.checkEmails });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPasswordConfirm: ['', Validators.required]
    }, { validator: this.checkPasswords });

    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>this.search(term))
    ).subscribe(results =>this.filteredJobs = results);

    this.placeTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>this.search(term))
    ).subscribe(results =>this.filteredPlaces = results);
  }
  

  showSuggestions(type: string): void {
    this.suggestionsVisible = type;
  }


  
  

  hideSuggestions(): void {
    setTimeout(() => {
      this.suggestionsVisible = null;
    }, 1000000); // Ajusta el tiempo de espera si es necesario
  }

  onInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.searchTerms.next(input);
  }

  onInputPlace(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.placeTerms.next(input);
  }

  search(term: string): Observable<string[]> {
    return this.http.get<string[]>(`https://api.example.com/search?query=${term}`);
  }

  getSearchUrl(search: string): string {
    return `/trabajo-de-${search.replace(/\s+/g, '-').toLowerCase()}`;
  }

  searchPlace() {
    this.search(this.placeTerm).subscribe(results => {
      this.filteredPlaces = results;
    });
  }

  deleteSearch(search: string): void {
    this.lastSearches = this.lastSearches.filter(s => s !== search);
  }

  selectPlace(place: string): void {
    this.placeTerm = place;
    console.log('Place selected:', place);
  }

  selectJob(job: string): void {
    this.searchTerm = job;
    console.log('Job selected:', job);
  }

  onSubmit(): void {
    console.log('Form submitted with search term:', this.searchTerm);
    console.log('Form submitted with place term:', this.placeTerm);
    this.performSearch();
  }

  closeSearchBox() {
    console.log('Cerrando cuadro de búsqueda');
    this.suggestionsVisible = null;
  }

  clearSearchTerm() {
    this.searchTerm = '';
  }

  clearPlaceTerm() {
    this.placeTerm = '';
  }

   checkEmails(group: FormGroup): { [key: string]: boolean } | null {
    const email = group.get('newEmail')?.value;
    const confirmEmail = group.get('newEmailConfirm')?.value;
    return email === confirmEmail ? null : { emailMismatch: true };
  }

  checkPasswords(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('newPasswordConfirm')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onChangeEmail() {
    if (this.emailForm.valid) {
      const userId = 1; // Ajusta según tu lógica
      this.userService.changeEmail(userId, this.emailForm.value.newEmail).subscribe(
        (response: any) => {
          console.log('Email cambiado exitosamente', response);
          this.showEmailSuccessMessage = true;
          this.showEmailErrorMessage = false;
        },
        (error: any) => {
          console.error('Error al cambiar el email', error);
          this.showEmailErrorMessage = true;
          this.showEmailSuccessMessage = false;
        }
      );
    }
  
  }

  onChangePassword() {
    if (this.passwordForm.valid) {
      const userId = 1; // Ajusta según tu lógica
      this.userService.changePassword(userId, this.passwordForm.value.newPassword).subscribe(
        (response: any) => {
          console.log('Contraseña cambiada exitosamente', response);
          this.showPasswordSuccessMessage = true;
          this.showPasswordErrorMessage = false;
        },
        (error: any) => {
          console.error('Error al cambiar la contraseña', error);
          this.showPasswordErrorMessage = true;
          this.showPasswordSuccessMessage = false;
        }
      );
    }
  
  
  }

  closeSuccessMessage() {
    this.showEmailSuccessMessage = false;
    this.showPasswordSuccessMessage = false;
  }


  

  performSearch() {
    console.log('Realizando búsqueda con los términos:');
    console.log('Término de búsqueda:', this.searchTerm);
    console.log('Término de lugar:', this.placeTerm);

    this.search(this.searchTerm).subscribe((results: any) => {
      this.filteredJobs = results;
    });

    this.searchPlace();
  }

  
  trackMenuClick(item: string) {
    console.log(`Menú seleccionado: ${item}`);
    
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isInsideJobSearch = target.closest('#prof-cat-search-input') || target.closest('.autocomplete.job');
    const isInsidePlaceSearch = target.closest('#place-search-input') || target.closest('.autocomplete.place');
    if (!isInsideJobSearch) {
      this.suggestionsVisible = this.suggestionsVisible === 'job' ? null : this.suggestionsVisible;
    }
    if (!isInsidePlaceSearch) {
      this.suggestionsVisible = this.suggestionsVisible === 'place' ? null : this.suggestionsVisible;
    }
  }

  onInputClick(event: MouseEvent) {
    event.stopPropagation();
  }

  onMenuClick(event: MouseEvent) {
    event.stopPropagation();
  }

  toggleView(view: string): void {
    this.selectedView = this.selectedView === view ? '' : view;
  }
  onDeleteAccount(): void {
    if (this.confirmDelete) {
      console.log('Account deletion confirmed');
      // Lógica para eliminar la cuenta
    } else {
      console.log('Please confirm account deletion');
    }
  }

  toggleConfirmDelete(): void {
    this.confirmDelete = !this.confirmDelete;
  }


  onPrivacySubmit(): void {
    const privacyLevel = this.privacyForm.get('privacyLevel')?.value;
    console.log(`Selected privacy level: ${privacyLevel}`);
    // Aquí puedes agregar la lógica para cambiar el nivel de privacidad
  }


}
