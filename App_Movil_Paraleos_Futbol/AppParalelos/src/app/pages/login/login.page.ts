import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string='';
  password: string='';

  constructor(private router: Router) {}

  login() {
    if (this.email === 'admin@admin.com' && this.password === '1234') {
      this.router.navigate(['/home']);  // Navega a la página de inicio tras un login exitoso
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
