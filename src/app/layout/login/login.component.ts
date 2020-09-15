import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../core/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {


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
  radian = 0.0174533;
  start = 0;
  endStart = 0;

  quart = Math.PI / 2;
  PI2 = Math.PI * 2;
  percent = 0;
  deg = 0;

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    let rect = this.canvas.nativeElement.getBoundingClientRect();
    let data = this.ctx.getImageData( event.clientX - rect.left, event.clientY - rect.top, 1, 1).data;
    let rgb = [ data[0], data[1], data[2] ];
    if(data[0] != 0 ||  data[1] != 0 ||  data[2] != 0){
      console.log(rgb);
    }

  }

  guages = [];
  tid: number;

  constructor(private http: HttpClient, private formBuilder: FormBuilder,
              private router: Router, private authService: AuthService,
              private route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext("2d");

    // Set context styles
    this.ctx.lineWidth = 15;
    this.ctx.strokeStyle = 'cyan';
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
      color: "cyan"
    });
    this.tid = setInterval(() => this.tick(), /*63*/20);
  }


   tick() {
    this.animate();
  }


  abortTimer() { // to be called when you want to stop the timer
    clearInterval(this.tid);
  }

  drawAll() {

    // clear the canvas

    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    // draw all the guages

    for (var i = 0; i < this.guages.length; i++) {
      this.render(this.guages[i]);
    }

  }

  render(guage) {
    this.ctx.beginPath();
    this.start = (this.start+this.radian);
    this.endStart = (((this.percent/100) * this.PI2)+this.start) % this.PI2;
    this.ctx.arc(guage.x, guage.y, guage.radius, this.start, this.endStart);
    this.ctx.strokeStyle = guage.color;
    this.ctx.stroke();
  }

  animate() {
      this.drawAll();
      // increase percent for the next frame
      if ((this.percent === 1 && !this.up) || (this.percent === 99) || this.percent === this.d) {
        this.up = !this.up;
        this.d = Math.floor(Math.random() * Math.floor(99));
      }

      if (this.up === true) {
        this.percent = this.percent + 1;
      } else {
        this.percent = this.percent - 1;
      }

    }
}
