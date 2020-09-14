import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../core/service/auth.service';

export interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;

  @ViewChild('canvas') canvas: ElementRef;
  ctx;
  up = true;
  d = Math.floor(Math.random() * Math.floor(100));

  stop = false;
  frameCount = 0;
  $results = $("#results");
  fps;
  fpsInterval;
  startTime;
  now;
  then;
  elapsed;

  quart = Math.PI / 2;
  PI2 = Math.PI * 2;
  percent = 0;

  guages = [];

  constructor(private http: HttpClient, private formBuilder: FormBuilder,
              private router: Router, private authService: AuthService,
              private route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext("2d");

    // Set context styles
    this.ctx.lineWidth = 15;
    this.ctx.strokeStyle = '#85c3b8';
    this.ctx.shadowColor = "black";
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowBlur = 0;
    this.ctx.font = "18px verdana";

    this.guages.push({
      x: 50,
      y: 50,
      radius: 40,
      start: 0,
      end: 100,
      color: "blue"
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/quiz/list';
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  startAnimating(fps) {
    this.fpsInterval = 1000 / fps;
    this.then = Date.now();
    this.startTime = this.then;
    this.animate();
  }

  drawAll(percent) {

    // clear the canvas

    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    // draw all the guages

    for (var i = 0; i < this.guages.length; i++) {
      this.render(this.guages[i], percent);
    }

  }

  render(guage, percent) {
    var pct = percent / 100;
    var extent = (guage.end - guage.start) * pct;
    var current = (guage.end - guage.start) / 100 * this.PI2 * pct - this.quart;
    this.ctx.beginPath();
    this.ctx.arc(guage.x, guage.y, guage.radius, -this.quart, current);
    this.ctx.strokeStyle = guage.color;
    this.ctx.stroke();
  }

  animate() {

    // if the animation is not 100% then request another frame

    console.log(this.percent);

    if (this.percent <= 100) {
      console.log('Request');
      requestAnimationFrame(this.animate.bind(this));
    }


    this.now = Date.now();
    this.elapsed = this.now - this.then;

    // if enough time has elapsed, draw the next frame

    if (this.elapsed > this.fpsInterval) {

      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      this.then = this.now - (this.elapsed % this.fpsInterval);

      // Put your drawing code here

      this.drawAll(this.percent);
      // increase percent for the next frame
      if ((this.percent === 0 && !this.up) || (this.percent === 100) || this.percent === this.d) {
        this.up = !this.up;
        this.d = Math.floor(Math.random() * Math.floor(100));
      }

      if (this.up === true) {
        this.percent = this.percent + 1;
      } else {
        this.percent = this.percent - 1;
      }

    }

    // redraw all guages with the current percent
  }

  get f() {
    return this.loginForm.controls;
  }

  async onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value).add(() => {
      this.loading = false;
      this.router.navigate([this.returnUrl]);
    });
  }
}
