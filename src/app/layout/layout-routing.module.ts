import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizListComponent} from './quiz-list/quiz-list.component';
import {LayoutComponent} from './layout.component';
import {QuizTakeComponent} from './quiz-take/quiz-take.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from '../core/guard/auth.guard';
import {QuizCreateComponent} from './quiz-create/quiz-create.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {
        path: 'quiz',
        canActivate: [AuthGuard],
        children: [
          {path: 'list', component: QuizListComponent},
          {path: 'take', component: QuizTakeComponent},
          {path: 'create', component: QuizCreateComponent},
          {path: '', redirectTo: '/quiz/list'}
        ]
      },
      {path: '**', pathMatch: 'full', redirectTo: '/login'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
