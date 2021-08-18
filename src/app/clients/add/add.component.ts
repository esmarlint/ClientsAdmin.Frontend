import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
  ]
})
export class AddComponent implements OnInit {

  mainForm: FormGroup = this.fb.group({
    'socialReason': ['', [Validators.required, Validators.maxLength(100)]],
    'comercialName': ['', [Validators.required, Validators.maxLength(100)]],
    'phone': ['', [Validators.maxLength(20)]],
    'rnc': ['', [Validators.required, Validators.maxLength(20)]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService,
    private toast: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  showError(field: string) {
    return this.mainForm.get(field)?.touched && this.mainForm.get(field)?.errors;
  }

  save() {
    if (this.mainForm.invalid) return;

    const client = this.mainForm.value;
    this.clientService.createClient(client).subscribe((response: any) => {

      this.toast.info('Empresa creada', 'Notificación');
      this.router.navigate(['/clients/', response.data.id]);

    })
  }

}
