import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';
import { ApiPaginatedResponse, Client } from 'src/app/models/response.interface';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  page: number = 1;
  pageSize: number = 10;
  total: number = 0;

  response!: ApiPaginatedResponse<Client>;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getAll({ page: this.page, pageSize: this.pageSize }).subscribe(response => {
      this.response = response;
    });
  }

  fetch(page: number) {
    this.clientService.getAll({ page: page, pageSize: this.pageSize }).subscribe(response => {
      this.response = response;
    });
  }

}
