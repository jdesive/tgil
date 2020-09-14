import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../core/service/auth.service';
import {Quiz} from "../../core/model/models";

@Component({
  selector: 'app-quiz-take',
  templateUrl: './quiz-take.component.html',
  styleUrls: ['./quiz-take.component.css']
})
export class QuizTakeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private authService: AuthService) { }

  routeSub: any;
  quizId: number;
  quiz: any;
  currentQuestion = 0;
  totalQuestions: number;
  selection: any;
  answers = [];
  quizFinished = false;
  quizResults: any;
  resultsLoading = false;
  quizLoading = true;

  ngOnInit() {
    this.routeSub = this.route.queryParams.subscribe(params => {
      this.quizId = +params['id'] || null;
      this.loadQuiz();
    });
  }

  loadQuiz(): void {
    this.quizLoading = true;
    this.http.get('http://localhost:8080/quiz/' + this.quizId).subscribe((data: Quiz) => {
      this.quiz = data;
      this.totalQuestions = data.questions.length;
      this.quizLoading = false;
    });
  }

  submitQuiz(): void {
    this.resultsLoading = true;
    this.http.post('http://localhost:8080/quiz/submit',
      {userId: this.authService.currentUser.id, quizId: this.quizId, answers: this.answers})
      .subscribe(data => {
          this.quizResults = data;
          this.resultsLoading = false;
      });
  }

  nextQuestion() {
    this.answers.push(this.selection);
    this.selection = null;

    if ((this.totalQuestions - 1) === this.currentQuestion) {
      this.quizFinished = true;
      this.submitQuiz();
      return;
    }

    this.currentQuestion++;
  }

}
