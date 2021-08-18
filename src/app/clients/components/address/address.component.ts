import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  deletedItems: Set<number> = new Set<number>();

  mainForm: FormGroup = this.fb.group({
    addressArray: this.fb.array([])
  });

  get elements(): FormArray {
    return this.mainForm.get("addressArray") as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.addressService.getAll(this.clientId!).pipe(
      map(res => res.data)
    )
      .subscribe(collection => {
        this.elements.clear();
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

  remove(addressId: number, id: number) {
    this.elements.removeAt(id);
    if (addressId != 0) {
      this.deletedItems.add(addressId);
    }
  }

  save() {
    if (this.mainForm.invalid) return;

    this.mainForm.value.addressArray
      .forEach((value: any) => {
        if (value.id == 0) {
          this.addressService.create(value).subscribe(e => this.loadData());
        } else {
          this.addressService.update(value).subscribe(e => this.loadData());
        }
      });
    this.deletedItems.forEach(value => {
      this.addressService.delete(value, this.clientId!).subscribe(result => {
        this.deletedItems.clear();
      });
    });

    this.toast.info('Datos de direcciones actualizados', 'Notificación');

  }

}
