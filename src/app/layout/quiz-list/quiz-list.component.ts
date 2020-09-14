import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Quiz, QuizList, ScoreCard} from '../../core/model/models';
import {ApiService} from '../../core/service/api.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {

  quizzes: QuizList[] = [];
  scores: ScoreCard[] = [];
  selected = 'active';
  completedQuizzes: QuizList[] = [];
  activeQuizzes: QuizList[] = [];
  loading = false;

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizzes = [];
    this.loading = true;
    this.http.get('http://localhost:8080/quiz').subscribe((data: Quiz[]) => {
        this.quizzes = data;
        this.loadScores();
    });
  }

  loadScores() {
    this.scores = [];
    this.apiService.getScores().subscribe((data: ScoreCard[]) => {
      this.scores = data;
      this.setQuizzes();
    });
  }

  setQuizzes() {
    this.activeQuizzes = [];
    this.completedQuizzes = [];
    this.scores.forEach(score => {
      this.quizzes.forEach(quiz => {
        if (quiz.id === score.quiz.id) {
          const index = this.quizzes.indexOf(quiz);
          this.quizzes[index].score = score.score;
          this.quizzes[index].scoreDate = score.dateTaken;
        }
      });
    });

    this.quizzes.forEach(quiz => {
      if (quiz.dueDate !== null) {
        if (Date.parse(quiz.dueDate.toString()) <= new Date().getTime()) {
          console.log(quiz);
          this.completedQuizzes.push(quiz);
          return;
        }
      }

      this.activeQuizzes.push(quiz);
    });
    this.loading = false;
  }

}
