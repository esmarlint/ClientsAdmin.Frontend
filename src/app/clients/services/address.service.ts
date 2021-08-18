import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(clientId: number): Observable<any> {
    const url = `${environment.url}/api/v1/ClientAddress/${clientId}`;
    return this.http.get<any>(url);
  }

  create(address: { id: number, idClient: number, address: string }): Observable<any> {
    const url = `${environment.url}/api/v1/ClientAddress`;
    return this.http.post(url, address);
  }

  update(address: { id: number, idClient: number, address: string }): Observable<any> {
    const url = `${environment.url}/api/v1/ClientAddress/${address.idClient}/${address.id}`;
    return this.http.put(url, address);
  }

  delete(id: number, idClient: number): Observable<any> {
    const url = `${environment.url}/api/v1/ClientAddress/${idClient}/${id}`;
    return this.http.delete(url);
  }
}
