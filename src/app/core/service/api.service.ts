import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Quiz, ScoreCard} from '../model/models';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  saveQuiz(quiz: Quiz) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<Quiz>('http://localhost:8080/quiz', JSON.stringify(quiz), httpOptions);
  }

  getScores() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.get<ScoreCard[]>('http://localhost:8080/quiz/scores/' + this.authService.currentUser.id, httpOptions);
  }

}
