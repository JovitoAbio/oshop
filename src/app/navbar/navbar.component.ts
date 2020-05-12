import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  avatarUrl: string = '../../assets/avatar.png';

  constructor(public auth: AuthService) { }

  ngOnInit() { }

  logout() {
    this.auth.signOut();
  }

}
