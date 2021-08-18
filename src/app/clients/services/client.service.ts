import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ApiPaginatedResponse, Client } from 'src/app/models/response.interface';
import { environment } from 'src/environments/environment';

interface PatinationParameters {
  page: number,
  pageSize: number
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAll(pagination: PatinationParameters | null = null): Observable<ApiPaginatedResponse<Client>> {

    const params = new HttpParams();
    if (pagination) {
      params.set('page', pagination!.page)
      params.set('pageSize', pagination!.pageSize);
    }

    const url = `${environment.url}/api/v1/client`;
    return this.http.get<ApiPaginatedResponse<Client>>(url, { params: params });
  }

  getById(clientId: number): Observable<any> {
    const url = `${environment.url}/api/v1/client/${clientId}`;
    return this.http.get<any>(url).pipe(
      map(response => response.data)
    );
  }

  create(client: any): Observable<any> {
    const url = `${environment.url}/api/v1/client`;
    return this.http.post(url, client);
  }

  update(clientId: number, client: any): Observable<any> {
    const url = `${environment.url}/api/v1/client/${clientId}`;
    return this.http.put(url, client);
  }

}
