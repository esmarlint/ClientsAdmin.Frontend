import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
  ]
})
export class AddComponent implements OnInit {

  mainForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.mainForm = fb.group({
      'socialReason': ['', [Validators.required]],
      'comercialName': [''],
      'phone': [''],
      'rnc': ['']
    })
  }

  ngOnInit(): void {
  }

  save() {
    if(this.mainForm.invalid) return;
    
    this.router.navigate(['clients/list']);
  }

}
