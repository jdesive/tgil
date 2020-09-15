import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AuthService} from '../core/service/auth.service';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class LayoutComponent implements OnInit {

  currentUser = this.authService.currentUser;

  leftSideMenuState = 'in';

  coins = 0;
  level = 1;

  maxTimeLevel = 0;
  timePrice = (10 * Math.floor(Math.pow(1.1, this.maxTimeLevel)));


  constructor(private authService: AuthService) { }

  ngOnInit() {



  }

  buyTimeUpgrade() {
    const price = (10 * Math.floor(Math.pow(1.1, this.maxTimeLevel)));
    if (this.coins >= price) {
      this.timePrice = (10 * Math.floor(Math.pow(1.1, this.maxTimeLevel)));
      this.maxTimeLevel += 1;
      this.coins = this.coins - price;
    }
  }

  addCoins(val) {

    if (!val || val === 0) {
      this.coins = 0;
    }

    this.coins += val;
  }

  openStore() {

    this.leftSideMenuState = this.leftSideMenuState === 'out' ? 'in' : 'out';

  }

}
