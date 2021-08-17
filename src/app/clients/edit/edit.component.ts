import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [
  ]
})
export class EditComponent implements OnInit {

  clientId!:number;

  mainForm: FormGroup = this.fb.group({
    'socialReason': ['', [Validators.required]],
    'comercialName': [''],
    'phone': [''],
    'rnc': ['']
  });;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private clientService: ClientService
  ) {
    activedRoute.params.pipe(
      switchMap(({ id }) => this.clientService.getClientById(id))
    ).subscribe(client=>{
      this.clientId = client.id;
      this.mainForm.reset({ ...client })
    });
  }

  ngOnInit(): void {
  }

  save() {
    if(this.mainForm.invalid) return;
  }

}
