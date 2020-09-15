import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

  constructor(private authService: AuthService) { }

  ngOnInit() {



  }

  openStore() {

    this.leftSideMenuState = this.leftSideMenuState === 'out' ? 'in' : 'out';

  }

}
