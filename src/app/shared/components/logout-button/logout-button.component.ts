import { heroArrowLeftStartOnRectangle } from '@ng-icons/heroicons/outline';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [NgIconComponent, NzModalModule],
  providers: [
    provideIcons({
      heroArrowLeftStartOnRectangle,
    }),
  ],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss',
})
export class LogoutButtonComponent implements OnInit {
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {}

  showConfirmLogout(): void {
    this.modal.confirm({
      nzTitle: '¿Estás seguro de que deseas cerrar sesión?',
      nzContent: 'Esta acción te desconectará de tu cuenta.',
      nzOkText: 'Cerrar Sesión',
      nzCancelText: 'Cancelar',
      nzOnOk: () => this.logout(), // Llama a la función logout
    });
  }

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
  }
}
