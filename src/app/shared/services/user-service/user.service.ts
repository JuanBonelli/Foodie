import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { InventoryProductBody, InventoryProductResponse, User } from '../../../types/types';
import { environment } from '../../../../environments/environment.development';
import { last, Observable, switchMap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user?: User;
  userLoading: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.getUser().subscribe({
      next: (user: User) => {
        this.user = user;
        this.userLoading.emit(true);
      },
      error: (err: any) => {
        this.userLoading.emit(false);
      },
    });
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/api/user`);
  }

  createUserFromAuth0(): Observable<User> {
    return this.authService.user$.pipe(
      switchMap((user) => {
        const userToCreate = {
          firstName: user?.given_name,
          lastName: user?.family_name,
        };
        return this.http.post<User>(
          `${environment.baseUrl}/api/user`,
          userToCreate
        );
      })
    );
  }

  postInventory(products: InventoryProductBody[]): Observable<InventoryProductResponse> {
    return this.http.post<InventoryProductResponse>(`${environment.baseUrl}/api/user/inventory-product`, products);
  }
}
