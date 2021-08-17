import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ApiPaginatedResponse, Client } from 'src/app/models/response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getClients(pagination:any = null):Observable<any> {
    const url = `${environment.url}/api/v1/client`;
    return this.http.get<ApiPaginatedResponse<Client>>(url);
  }

  getClientById(clientId: number): Observable<any> {
    const url = `${environment.url}/api/v1/client/${clientId}`;
    return this.http.get<any>(url).pipe(
      map(response=>response.data)
    );
  }

  createClient(client: any) {
    const url = `${environment.url}/api/v1/client`;
    return this.http.post(url, client);
  }

}
