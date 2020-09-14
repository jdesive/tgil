import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutRoutingModule} from './layout-routing.module';
import {QuizListComponent} from './quiz-list/quiz-list.component';
import {LayoutComponent} from './layout.component';
import {QuizTakeComponent} from './quiz-take/quiz-take.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {QuizCreateComponent} from './quiz-create/quiz-create.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';

@NgModule({
  declarations: [
    LayoutComponent,
    QuizListComponent,
    QuizTakeComponent,
    LoginComponent,
    RegisterComponent,
    QuizCreateComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class LayoutModule { }
