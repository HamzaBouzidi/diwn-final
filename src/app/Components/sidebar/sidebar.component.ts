import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { UserInfoService } from '../../services/user/user-info.service';
import { TokenService } from '../../services/token/token.service';
import { VacationService } from '../../services/vacation/vacation.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  ref_emp: string = '';
  userName: string = '';
  userTitle: string = '';
  inProgressVacationCount: number = 0;

  constructor(private userInfoService: UserInfoService, private tokenService: TokenService, private vacationService: VacationService) { }

  ngOnInit() {
    this.getUserRefFromToken();
    this.getInProgressVacationCount();
  }

  getUserRefFromToken(): void {
    const decodedToken = this.tokenService.decodeToken();
    console.log(decodedToken);

    if (decodedToken) {
      this.ref_emp = decodedToken.ref_emp || '';
      this.getUserInfo();
    } else {
      console.error('Error decoding token or token is missing');
    }
  }

  getUserInfo(): void {
    if (this.ref_emp) {
      this.userInfoService.getUserInfo(this.ref_emp).subscribe(
        (response) => {
          this.userName = response.nm || '';
          this.userTitle = response.d || '';
        },
        (error) => {
          console.error('Error fetching user info:', error);
        }
      );
    }
  }

  getInProgressVacationCount(): void {
    this.vacationService.getInProgressVacationCount().subscribe(
      (response) => {
        this.inProgressVacationCount = response.inProgressCount || 0;
      },
      (error) => {
        console.error('Error fetching in-progress vacation count:', error);
      }
    );
  }
}
