import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserInfoService } from '../../services/user/user-info.service';
import { TokenService } from '../../services/token/token.service';
import { ExitAuthorisationService } from '../../services/exitAuthorisation/exit-authorisation.service';
import { DoneModalComponent } from "../../shared/modal/done-modal/done-modal.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-autorisation-request',
  standalone: true,
  imports: [CommonModule, FormsModule, DoneModalComponent],
  templateUrl: './autorisation-request.component.html',
  styleUrl: './autorisation-request.component.css'
})
export class AutorisationRequestComponent {
  employeeName: string = '';
  period: string = '';
  reason: string = '';
  exitDate: string = '';
  exitTime: string = '';
  returnTime: string = '';
  ref_emp: string | undefined;
  isModalVisible: boolean = false;

  constructor(

    private userService: UserInfoService,
    private tokenService: TokenService,
    private exitAuthorizationService: ExitAuthorisationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserRefFromToken();
  }

  // Fetch user information using userRefEmp
  getUserInfo(): void {
    if (this.ref_emp) {
      this.userService.getUserInfo(this.ref_emp).subscribe(
        (response) => {
          this.employeeName = response.nm || ''; // Use "nm" from API for اسم الموظف
        },
        (error) => {
          console.error('Error fetching user info:', error);
        }
      );
    }
  }

  getUserRefFromToken(): void {
    const decodedToken = this.tokenService.decodeToken();
    console.log(decodedToken)

    if (decodedToken) {
      this.ref_emp = decodedToken.ref_emp || '';  // Get user_ref_emp from the decoded token
      this.getUserInfo();  // Once you have the userRefEmp, fetch the user info
    } else {
      console.error('Error decoding token or token is missing');
    }
  }

  closeModal() {
    this.isModalVisible = false;
  }
  // Vacation types
  selectedVacationType: string = '';

  // Method to handle form submission
  onSubmit(exitAutorisationForm: NgForm) {
    if (exitAutorisationForm.valid) {
      const formData = {
        name: this.employeeName,
        day: this.exitDate,
        exitStartTime: this.exitTime,
        exitEndTime: this.returnTime,
        exitDescription: this.reason
      }

      // Call the service to submit the data
      this.exitAuthorizationService.submitExitAuthorization(formData).subscribe(
        (response) => {
          console.log('Form submitted successfully', response);
          this.isModalVisible = true;

          setTimeout(() => {
            this.closeModal(); // Close the modal
            this.router.navigate(['/dashboard/autorisation/autorisation-list']);
          }, 3000);
        },
        (error) => {
          console.error('Error submitting the form:', error);
        }
      );
    }
  }
}
