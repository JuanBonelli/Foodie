import { Injectable } from '@angular/core';
import { Dish, RecipeTime, RecipeType } from '../../../types/types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject, catchError, expand, filter, interval, Observable, of, switchMap, takeUntil, takeWhile, tap } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(private http: HttpClient, private message: NzMessageService) {}

  private dishesSubject: BehaviorSubject<Dish[]> = new BehaviorSubject<Dish[]>(
    []
  );
  public dishes$: Observable<Dish[]> = this.dishesSubject.asObservable();

  private areDishesLoading: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public areDishesLoading$: Observable<boolean> =
    this.areDishesLoading.asObservable();

  private cookingDish: BehaviorSubject<Dish | null> =
    new BehaviorSubject<Dish | null>(null);
  public cookingDish$: Observable<Dish | null> =
    this.cookingDish.asObservable();

  getAllDishes(): Observable<Dish[]> {
    if (this.dishesSubject.value.length === 0) {
      this.loadCurrentDishes();
    }

    console.log('getting dishes from subject');
    return this.dishes$;
  }

  getAreDishesLoading(): Observable<boolean> {
    return this.areDishesLoading$;
  }

  getCookingDish(): Observable<Dish | null> {
    return this.cookingDish$;
  }

  getDishById(dishId: string): Dish | null {
    return (
      this.dishesSubject.value.filter(
        (dish) => dish.id.toString() === dishId
      )[0] ?? null
    );
  }

  getDishesForCooking(recipeType: RecipeType, recipeTime: RecipeTime) {
    //filter the dishes based on the recipeType and recipeTime. Merge them randmly and return the first 3 dishes
    return this.dishesSubject.value
      .filter(
        (dish) =>
          dish.recipe.recipeType === recipeType &&
          dish.recipe.recipeTime === recipeTime
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }

  refreshDish(dishId: number): void {
    this.areDishesLoading.next(true);

    this.http
      .post<Dish>(`${environment.baseUrl}/api/backlog/replace/${dishId}`, null)
      .subscribe((newDish) => {
        const dishes = this.dishesSubject.value.map((dish) =>
          dish.id === dishId ? newDish : dish
        );
        this.dishesSubject.next(dishes);
        this.areDishesLoading.next(false);
      });
  }

  fillBacklog() {
    this.http
      .post(`${environment.baseUrl}/api/backlog/fill`, {})
      .subscribe(() => {
        this.loadCurrentDishes();
      });
  }

  loadCurrentDishes(): void {
    this.areDishesLoading.next(true);

    interval(3000)
      .pipe(
        takeWhile(() => this.areDishesLoading.value),
        switchMap(() => this.http.get<any>(`${environment.baseUrl}/api/dish`)),
        switchMap((response) => {
          if (Array.isArray(response)) {
            this.dishesSubject.next(response);
            this.areDishesLoading.next(false);
            this.loadCookingDish();
          } else if (response.state === 'IN_PROGRESS') {
            console.log('loading');
            this.areDishesLoading.next(true);
          } else if (response.state === 'FAILED') {

            this.message.error('No hay suficientes productos para generar recetas.', {
              nzDuration: 6000,
            });
            console.error('error ocurred', response);
            this.areDishesLoading.next(true);
          } else {
            console.error('Unexpected response', response);
            this.areDishesLoading.next(true);
          }
          return of();
        }),
        catchError((error) => {
          console.error('Error loading dishes', error);
        this.message.error('No hay suficientes productos para generar recetas.',{
            nzDuration: 6000,
          }
        );

          this.areDishesLoading.next(true);
          return of(); // Continue the recursion
        })
      )
      .subscribe();
  }

  setDishAsCooking(dishId: number): void {
    this.http
      .post(`${environment.baseUrl}/api/dish/start-cooking/${dishId}`, null)
      .subscribe(() => {
        const dishes = this.dishesSubject.value.map((dish) => {
          if (dish.id === dishId) {
            dish.dishState = 'COOKING';
          }
          return dish;
        });
        this.dishesSubject.next(dishes);
        this.loadCookingDish();
      });
  }

  setDishAsCooked(dishId: number): void {
    this.http
      .post(`${environment.baseUrl}/api/dish/finish-cooking/${dishId}`, null)
      .subscribe(() => {
        const dishes = this.dishesSubject.value.filter(
          (dish) => dish.id !== dishId
        );
        this.dishesSubject.next(dishes);
        this.loadCookingDish();
      });
  }

  loadCookingDish(): void {
    this.cookingDish.next(
      this.dishesSubject.value.find((dish) => dish.dishState === 'COOKING') ??
        null
    );
  }

  getHistory(): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${environment.baseUrl}/api/dish/history`);
  }
}
