// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';



// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
// export class WelcomeModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeToggleComponent } from '../../theme-toggle/theme-toggle.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    title: 'Welcome | SpendWise'
  },
];

@NgModule({
  declarations: [WelcomeComponent, SignupComponent, LoginComponent,ThemeToggleComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class WelcomeModule { }
