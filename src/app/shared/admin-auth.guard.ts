import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService ) { }

  canActivate(): Observable<boolean> {
    return this.auth.user$
      .pipe(map((user) => user.isAdmin));
  }
}
