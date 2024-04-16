import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AddExpenseComponent } from './component/header/add-expense/add-expense.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { ActivityComponent } from './component/splitwise/activity/activity.component';
import { GroupDashboardComponent } from './component/splitwise/group-dashboard/group-dashboard.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { WelcomeComponent } from './component/welcome/welcome.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./component/header/header.module').then((m) => m.HeaderModule),
  },

  {
    path: 'welcome',
    loadChildren: () =>
      import('./component/welcome/welcome.module').then((m) => m.WelcomeModule),
  },

  {
    path: 'edit/:id',
    component: AddExpenseComponent,
    canActivate: [AuthGuard],
    title: 'Edit Expense | SpendWise',
  },

  {
    path: 'dashboard',
    title: 'Group Expense | SpendWise',
    loadChildren: () =>
      import('./component/home/home.module').then((m) => m.HomeModule),
  },

  {
    path: 'activity',
    title: 'Group Expense Activity | SpendWise',
    component: ActivityComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'group-dashboard',
    title: 'Group Expense Dashboard | SpendWise',
    component: GroupDashboardComponent,
    
  },

  {
    path: 'suggestions',
    component: SuggestionsComponent
  },

  { path: '**', component: WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
