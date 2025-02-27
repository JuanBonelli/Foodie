import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { InventoryPreloadBatch, InventoryProductBody, InventoryProductResponse } from '../../../types/types';
import { Observable, tap } from 'rxjs';
import { DishService } from '../dish-service/dish.service';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(
    private http: HttpClient,
    private dishService: DishService
  ) {}

  getInventory() {
    return this.http.get<InventoryProductResponse[]>(
      `${environment.baseUrl}/api/user/inventory-product`
    );
  }

  getExpiringInventory() {
    return this.http.get<InventoryProductResponse[]>(
      `${environment.baseUrl}/api/user/inventory?expiring=true`
    );
  }

  postInventory(
    inventory: InventoryProductBody[]
  ): Observable<InventoryProductResponse[]> {
    return this.http
      .post<InventoryProductResponse[]>(
        `${environment.baseUrl}/api/user/inventory-product`,
        inventory
      );
  }

  postAudio(audio: File) {
    let requestParams = new FormData();
    requestParams.append('recordingFile', audio);

    return this.http.post<any>(
      `${environment.baseUrl}/api/inventory-preload/from-audio`,
      requestParams
    );
  }

  postImage(image: File) {
    let requestParams = new FormData();
    requestParams.append('imageFile', image);

    return this.http.post<any>(
      `${environment.baseUrl}/api/inventory-preload/from-image`,
      requestParams
    );
  }

  getAudioAnalysisStatus(idAudio: number) {
    return this.http.get<InventoryPreloadBatch>(
      `${environment.baseUrl}/api/inventory-preload-batch/${idAudio}`
    );
  }
}
