import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Observable, map, shareReplay, take } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Auth, Rol } from '../core/auth';

interface NavItem {
  label: string;
  route: string;
  icon: string;
  roles: Rol[];
}

@Component({
  selector: 'app-shell',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    AsyncPipe,
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  private breakpointObserver = inject(BreakpointObserver);
  protected readonly auth = inject(Auth);

  private readonly todos: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard', roles: ['admin', 'tecnico'] },
    { label: 'Incidencias', route: '/incidencias', icon: 'confirmation_number', roles: ['admin', 'tecnico', 'cliente'] },
    { label: 'Clientes', route: '/clientes', icon: 'group', roles: ['admin'] },
    { label: 'Técnicos', route: '/tecnicos', icon: 'build', roles: ['admin'] },
    { label: 'Dispositivos', route: '/dispositivos', icon: 'devices', roles: ['admin', 'tecnico'] },
  ];

  // Solo los apartados que el rol del usuario puede ver
  get navItems(): NavItem[] {
    const rol = this.auth.usuario()?.rol;
    return this.todos.filter((i) => rol && i.roles.includes(rol));
  }

  isMobile$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 959px)'])
    .pipe(
      map((result) => result.matches),
      shareReplay(1),
    );

  closeSidenavOnMobile(sidenav: MatSidenav): void {
    this.isMobile$.pipe(take(1)).subscribe((isMobile) => {
      if (isMobile) {
        sidenav.close();
      }
    });
  }
}