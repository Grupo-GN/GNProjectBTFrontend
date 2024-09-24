import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-users',
  templateUrl: './login-users.component.html',
  styleUrl: './login-users.component.css'
})
export class LoginUsersComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // Lógica para manejar el login
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  getEmailErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'El email es obligatorio';
    }
  
    return this.email?.hasError('email') ? 'Formato de email incorrecto' : '';
  }
  
  getPasswordErrorMessage() {
    if (this.password?.hasError('required')) {
      return 'La contraseña es obligatoria';
    }
  
    return this.password?.hasError('minlength') ? 'La contraseña debe tener al menos 6 caracteres' : '';
  }
}


