import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { VacationService } from '../../services/vacation/vacation.service';

@Component({
  selector: 'app-vacation-list',
  templateUrl: './vacations-list.component.html',
  standalone: true,
  imports: [CommonModule, TableModule, HttpClientModule, InputTextModule, ButtonModule, FormsModule],
  styleUrls: ['./vacations-list.component.css']
})
export class VacationListComponent implements OnInit {
  employees: any[] = [];
  searchTerm: string = '';

  constructor(private vacationService: VacationService) { }

  ngOnInit(): void {
    this.vacationService.getVacations().subscribe(
      (data) => {
        this.employees = data.map(vacation => ({
          id: vacation.id,
          name: vacation.name,
          vacationStartDate: vacation.vacationStartDay,
          vacationEndDate: vacation.vacationEndDate,
          vacationDays: vacation.vacationDays,
          vacationType: vacation.vacationDescription || 'إجازة',
          state: this.determineVacationState(vacation),
          profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg'
        }));
      },
      (error) => {
        console.error('Error fetching vacation data', error);
      }
    );
  }

  determineVacationState(vacation: any): string {
    if (vacation.L4 === 'Accepted') {
      return 'مقبولة';
    } else if (vacation.L1 === 'Rejected' || vacation.L2 === 'Rejected' || vacation.L3 === 'Rejected' || vacation.L4 === 'Rejected') {
      return 'مرفوضة';
    } else {
      return 'قيد الانتظار';
    }
  }

  get filteredEmployees() {
    return this.employees.filter(employee =>
      employee.name.includes(this.searchTerm) ||
      employee.vacationType.includes(this.searchTerm)
    );
  }
  acceptVacation(employee: any): void {
    if (employee.id) {
      this.vacationService.updateVacationState(employee.id).subscribe(
        (response) => {
          employee.state = 'مقبولة';
          console.log('Vacation state updated successfully');
        },
        (error) => {
          console.error('Error updating vacation state', error);
        }
      );
    } else {
      console.error('Vacation ID is missing');
    }
  }
}
