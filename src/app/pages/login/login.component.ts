import { AuthService } from './../../services/auth/auth.service';
import { Component } from '@angular/core';
import { MyButtonComponent } from '../../shared/my-button/my-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TokenService } from '../../services/token/token.service';
import { InputControlService } from '../../services/input-control.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DoneModalComponent } from "../../shared/modal/done-modal/done-modal.component";
import { BlockModalComponent } from "../../shared/modal/block-modal/block-modal/block-modal.component";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MyButtonComponent, CommonModule, FormsModule, FooterComponent, HttpClientModule, MatSnackBarModule, DoneModalComponent, BlockModalComponent],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  email: string = '';
  password: string = '';
  invalidEmail: boolean = false;
  emptyEmail: boolean = false;
  emptyPassword: boolean = false;
  loginFailed: boolean = false;
  isModalVisible: boolean = false;
  isErrorModalVisible: boolean = false; 



  constructor(private AuthService: AuthService, private router: Router, private tokenService: TokenService, private inputControlService: InputControlService, private snackBar: MatSnackBar,) { }

  onSubmit(registrationForm: NgForm) {
    if (registrationForm.valid) {
      const { email, password } = registrationForm.value;
      //console.log(email)
      //console.log(password)

      // Reset all validation flags before validation
      this.invalidEmail = false;
      this.emptyEmail = false;
      this.emptyPassword = false;
      this.loginFailed = false;



      // Validate if email is empty
      if (!email) {
        this.emptyEmail = true;
        return;
      }

      // Validate email format using the InputControlService
      if (!this.inputControlService.validateEmail(email)) {
        this.invalidEmail = true;
        return;
      }

      // Validate if password is empty
      if (!password) {
        this.emptyPassword = true;
        return;
      }


      this.AuthService.login(email, password).subscribe(
        (response) => {
          //  receive a token in the response
          localStorage.setItem('auth_token', response.token);
          console.log('Login successful');
          this.isModalVisible = true;
          this.snackBar.open('تم تسجيل الدخول بنجاح بنجاح!.', 'إغلاق', {
            duration: 5000,  // Show for 5 seconds
          });
          setTimeout(() => {
            this.closeModal(); // Close modal before redirecting
            // Decode token and access user information
            const decodedToken = this.tokenService.decodeToken();
            console.log('Decoded token:', decodedToken);
            this.router.navigate(['/dashboard/home']); // Redirect to dashboard
          }, 3000);

        },
        (error) => {
          console.error('Login failed', error);
          this.isErrorModalVisible = true;
          this.snackBar.open('حدث خطأ أثناء التسجيل. حاول مرة أخرى.', 'إغلاق', {
            duration: 5000,
          });
        }
      );

      registrationForm.reset();
    }
  }
  closeModal() {
    this.isModalVisible = false;
    this.isErrorModalVisible = false;
  }
}
