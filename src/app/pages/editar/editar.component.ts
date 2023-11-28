import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {
  user: User = new User();
  addressForm:any;

  constructor(private fb: FormBuilder){
    if(localStorage.getItem('user')){
      this.user = JSON.parse(localStorage.getItem('user')|| '{}');
    }
    this.addressForm = this.fb.group({
      name: [this.user.name, Validators.compose([
        Validators.required,Validators.minLength(2), Validators.maxLength(100)
      ])],
      email: [this.user.email, Validators.compose([
        Validators.required,Validators.minLength(5), Validators.maxLength(50)
      ])],
      phone: [this.user.phone, Validators.compose([
        Validators.required,Validators.minLength(10), Validators.maxLength(11)
      ])],
      password: [this.user.password, Validators.compose([
        Validators.required,Validators.minLength(8)
      ])]
    })
  }

  onSubmit(): void {
    this.user.id = '';
    if(this.addressForm.controls['name'].value)
      this.user.name = this.addressForm.controls['name'].value;
    if(this.addressForm.controls['email'].value)
      this.user.email = this.addressForm.controls['email'].value;
    if(this.addressForm.controls['phone'].value)
      this.user.phone = this.addressForm.controls['phone'].value;
    if(this.addressForm.controls['password'].value)
      this.user.password = this.addressForm.controls['password'].value;
    alert('Cadastrado!');
    console.log(this.user);
    localStorage.setItem('user', JSON.stringify(this.user));
  }
}
