import { AutorisationListComponent } from './Components/autorisation-list/autorisation-list.component';
import { Routes } from '@angular/router';
import { NationalIdentityCardComponent } from './Components/national-identity-card/national-identity-card.component';
import { VacationsComponent } from './Components/vacations/vacations.component';
import { ShortVacationRequestComponent } from './Components/short-vacation-request/short-vacation-request.component';
import { VacationListComponent } from './Components/vacations-list/vacations-list.component';
import { AutorisationRequestComponent } from './Components/autorisation-request/autorisation-request.component';
import { AutorisationComponent } from './Components/autorisation/autorisation.component';
import { MorningLateRequestComponent } from './Components/morning-autorisation-request/morning-autorisation-request.component';
import { DefinitionsAutorisationsComponent } from './Components/definitions-autorisations/definitions-autorisations.component';
import { ReleaseFormComponent } from './Components/release-form/release-form.component';
import { TestReportWorkingPeriodComponent } from './Components/test-report-working-period/test-report-working-period.component';
import { MemberNominationFormComponent } from './Components/member-nomination-form/member-nomination-form.component';
import { AcknowledgmentPledgeComponent } from './Components/acknowledgment-pledge/acknowledgment-pledge.component';
import { ReportsComponent } from './Components/reports/reports.component';
import { HealthAssuranceComponent } from './Components/health-assurance/health-assurance.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { AuthLayoutComponentComponent } from './layouts/auth-layout-component/auth-layout-component.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [

    {
        path: 'dashboard',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            
            { path: 'vacations', component: VacationsComponent },
            { path: 'vacations/vacation-request', component: ShortVacationRequestComponent },
            { path: 'vacations/vacation-list', component: VacationsComponent },
            { path: 'vacations/vacation-management', component: VacationsComponent },
            { path: 'vacations/vacations-list', component: VacationListComponent },
            { path: 'autorisation/autorisation', component: AutorisationComponent },
            { path: 'autorisation/autorisation-request', component: AutorisationRequestComponent },
            { path: 'autorisation/morning-autorisation-request', component: MorningLateRequestComponent },
            { path: 'autorisation/autorisation-list', component: AutorisationListComponent },
            { path: 'definitions-autorisations', component: DefinitionsAutorisationsComponent },
            { path: 'definitions-autorisations/national-identity', component: NationalIdentityCardComponent },
            { path: 'definitions-autorisations/release-form', component: ReleaseFormComponent },
            { path: 'definitions-autorisations/test-report-for-working-period', component: TestReportWorkingPeriodComponent },
            { path: 'definitions-autorisations/member-nomination-form', component: MemberNominationFormComponent },
            { path: 'definitions-autorisations/acknowledgment-pledge', component: AcknowledgmentPledgeComponent },
            { path: 'definitions-autorisations/reports', component: ReportsComponent },
            { path: 'definitions-autorisations/health-assurance', component: HealthAssuranceComponent },
            { path: 'home', component: HomeComponent },

        ]
    },
    {path: '' ,
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path: '',
        component: AuthLayoutComponentComponent,
        children: [

            { path: 'sign-up', component: SignUpComponent },
            { path: 'login', component: LoginComponent  },

        ]
    },





    { path: '**', component: LoginComponent },

];
