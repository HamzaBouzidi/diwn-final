import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ExitAuthorisationService } from '../../services/exitAuthorisation/exit-authorisation.service';
import { MorningAuthorisationService } from '../../services/morningAuthorisation/morning-authorisation.service';

@Component({
  selector: 'app-autorisation-list',
  standalone: true,
  imports: [
    CommonModule,  // Add CommonModule to import the date pipe
    TableModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    FormsModule
  ],
  templateUrl: './autorisation-list.component.html',
  styleUrls: ['./autorisation-list.component.css']
})
export class AutorisationListComponent {
  authorizations: any[] = [];
  searchTerm: string = '';

  constructor(
    private exitService: ExitAuthorisationService,
    private morningService: MorningAuthorisationService
  ) { }

  ngOnInit(): void {
    // Fetch data from both services and combine them into one list
    this.exitService.getExits().subscribe((exitData) => {
      const exits = exitData.map(exit => ({
        employeeName: exit.name,

        authorizationDate: exit.day,
        lateDuration: `${this.calculateDuration(exit.exitStartTime, exit.exitEndTime)} دقيقة`,
        authorizationType: 'إذن خروج',
        state: this.determineState(exit)
      }));

      this.morningService.getMorningDelays().subscribe((delayData) => {
        const delays = delayData.map(delay => ({
          employeeName: delay.name,
          authorizationDate: delay.day,
          lateDuration: `${delay.time}`,
          authorizationType: 'إذن تأخر صباحي',
          state: this.determineState(delay)
        }));

        // Combine both exits and delays into one list
        this.authorizations = [...exits, ...delays];
      });
    });
  }

  // Function to determine the state (accepted/rejected/in-progress)
  determineState(authorization: any): string {
    if (authorization.L4 === 'Accepted') {
      return 'مقبولة';
    } else if (authorization.L1 === 'Rejected' || authorization.L2 === 'Rejected' || authorization.L3 === 'Rejected' || authorization.L4 === 'Rejected') {
      return 'مرفوضة';
    } else {
      return 'قيد التنفيذ';
    }
  }

  // Function to calculate the duration between start and end time for exits
  calculateDuration(startTime: string, endTime: string): number {
    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);
    const diff = (end.getTime() - start.getTime()) / (1000 * 60);
    return Math.abs(Math.floor(diff));
  }

  // Filter function to search by date
  get filteredAuthorizations() {
    if (!this.searchTerm) {
      return this.authorizations;
    }

    const searchDate = new Date(this.searchTerm);

    return this.authorizations.filter(auth => {
      const authDate = new Date(auth.authorizationDate);
      return (
        authDate.getFullYear() === searchDate.getFullYear() &&
        authDate.getMonth() === searchDate.getMonth() &&
        authDate.getDate() === searchDate.getDate()
      );
    });
  }
}
