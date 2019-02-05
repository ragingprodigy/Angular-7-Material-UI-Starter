import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, filter, mergeMap } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from './core/global/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public pageTitle = '';
  public displayName = 'User';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private auth: AuthService
  ) { }

  get isAdmin(): boolean {
    return this.auth.decodeToken().is_admin;
  }

  get isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }))
      .pipe(filter((route) => route.outlet === 'primary'))
      .pipe(mergeMap((route) => route.data))
      .subscribe((event) => {
        this.titleService.setTitle((event['title'] || '') + ' | Angular-7-Material-UI-Starter');
        this.pageTitle = event['title'];
      });

    this.displayName = this.auth.decodeToken().name;
  }

  oneOf(...permissions) {
    return this.auth.oneOf(permissions);
  }

  allOf(...permissions) {
    return this.auth.allOf(permissions);
  }

  logout() {
    if (confirm('Are you sure?')) {
      this.auth.logout().subscribe(_ => {
        this.auth.clearToken();
        this.router.navigate(['login']);
      });
    }
  }
}
