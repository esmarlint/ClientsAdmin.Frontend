import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/response.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  response!: ApiResponse;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<ApiResponse>('https://localhost:44350/api/v1/client').subscribe((response) => {
      this.response = response;
    })
  }

}
