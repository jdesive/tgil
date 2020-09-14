import { Component, OnInit } from '@angular/core';
import {AuthService} from '../core/service/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  currentUser = this.authService.currentUser;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
