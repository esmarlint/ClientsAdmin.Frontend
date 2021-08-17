import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Client } from 'src/app/models/response.interface';
import { AddressService } from '../../services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styles: [
  ]
})
export class AddressComponent implements OnInit {

  @Input() clientId?: number;

  mainForm: FormGroup = this.fb.group({
    addressArray: this.fb.array([], [Validators.required])
  });

  get elements(): FormArray {
    return this.mainForm.get("addressArray") as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    this.addressService.getAll(this.clientId!).pipe(
      map(res => res.data)
    )
      .subscribe(collection => {
        for (const address of collection) {

          const element = this.fb.group({
            id: [address.id, Validators.required],
            idClient: [this.clientId, Validators.required],
            address: [address.address, Validators.required],
          });
          this.elements.push(element);
        }
      });
  }

  add() {
    const element = this.fb.group({
      id: [0, Validators.required],
      idClient: [this.clientId, Validators.required],
      address: ['', Validators.required],
    });

    this.elements.push(element);
  }

  remove(id: number) {
    this.elements.removeAt(id);
  }

  save() {
    if (this.mainForm.invalid) return;

    console.log("hola");
    
    console.log(this.mainForm.value.addressArray.filter((e: any) => e.id == 0));
    

    this.mainForm.value.addressArray.filter((e: any) => e.id == 0)
      .forEach((value: any) => {
        this.addressService.create(value).subscribe();
    });

  }

}
