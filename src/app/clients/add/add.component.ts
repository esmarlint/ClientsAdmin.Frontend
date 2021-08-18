import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
  ]
})
export class AddComponent implements OnInit {

  mainForm: FormGroup = this.fb.group({
    'socialReason': ['', [Validators.required]],
    'comercialName': ['', [Validators.required]],
    'phone': [''],
    'rnc': ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService
  ) {
  }

  ngOnInit(): void {
  }

  save() {
    if (this.mainForm.invalid) return;
    
    const client = this.mainForm.value;
    this.clientService.createClient(client).subscribe((response: any) => {
      console.log(response);
      
      this.router.navigate(['/clients/', response.data.id]);
    })
  }

}
