import {Component, OnInit} from '@angular/core';
import {Quiz, QuizQuestion} from '../../core/model/models';
import {ApiService} from '../../core/service/api.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.css']
})
export class QuizCreateComponent implements OnInit {

  questionValue: string;
  questionAnswer: string;
  questionCorrectAnswer: string;
  questionAnswers: string[] = [];

  question: QuizQuestion;

  quizName: string;
  quizDueDate: Date = new Date();
  quizQuestions: QuizQuestion[] = [];
  quiz: Quiz;

  formError = false;
  formErrorMessage = '';

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.quiz = {
      name: this.quizName || '',
      dueDate: this.quizDueDate || new Date(),
      questions: this.quizQuestions || []
    };
  }

  getCurrentDate() {
    return new Date().toJSON().slice(0, 10);
  }

  isQuestionValid() {

    if (this.questionValue === null || this.questionValue === '' ||
      this.questionCorrectAnswer === null || this.questionCorrectAnswer === '') {
      console.log('Not filled out');
      return false;
    }

    this.question = {
      question: this.questionValue,
      correctAnswer: this.questionCorrectAnswer,
      answers: []
    };
    this.questionAnswers.forEach(answerStr => {
      this.question.answers.push({
        answer: answerStr,
      });
    });
    console.log(this.question);
    return true;
  }

  addAnswer() {
    this.questionAnswers.push(this.questionAnswer);
    this.questionAnswer = '';
  }

  removeAnswer(answer: string) {
    const index = this.questionAnswers.indexOf(answer);

    if (index > -1) {
      this.questionAnswers.splice(index, 1);
    }
  }

  addQuestion() {
    if (this.isQuestionValid()) {
      this.quizQuestions.push(this.question);
      this.question = null;
      this.questionAnswers = [];
      this.questionCorrectAnswer = null;
      this.questionValue = null;
      this.questionAnswer = null;
      this.closeQuestionModal();
    }
  }

  closeQuestionModal() {
    $('#close-question').click();
  }

  submitQuiz() {
    console.log(this.quizDueDate);

    this.formError = false;

    if (this.quizName === undefined || this.quizName.length === 0) {
      this.formError = true;
      this.formErrorMessage = 'Quiz Name is required';
      return;
    }

    if (this.quizDueDate.getTime() <= new Date().getTime()) {
      this.formError = true;
      this.formErrorMessage = 'Due Date must be a future date';
      return;
    }

    if (this.quizQuestions.length < 1) {
      this.formError = true;
      this.formErrorMessage = 'Quiz must contain at-least 1 quiz question';
      return;
    }

    this.quiz = {
      name: this.quizName,
      dueDate: this.quizDueDate,
      questions: this.quizQuestions
    };
    this.apiService.saveQuiz(this.quiz).subscribe(data => {
      this.router.navigate(['/quiz/list']);
    }, err => {

    });
  }

}
