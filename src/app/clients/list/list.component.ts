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

  response!: ApiPaginatedResponse<Client>;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(response=>{      
      this.response = response;
    })
  }

}
