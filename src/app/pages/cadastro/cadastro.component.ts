import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { GenericValidator } from 'src/app/comum/validador';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  private fb = inject(FormBuilder);
  user: User = new User();
  addressForm = this.fb.group({
    name: [null, Validators.compose([
      Validators.required,Validators.minLength(2), Validators.maxLength(100)
    ])],
    email: [null, Validators.compose([
      Validators.required,Validators.minLength(5), Validators.maxLength(50)
    ])],
    phone: [null, Validators.compose([
      Validators.required,Validators.minLength(10), Validators.maxLength(11)
    ])],
    cpf: [null, Validators.compose([
      Validators.required,GenericValidator.isValidCpf()
    ])],
    password: [null, Validators.compose([
      Validators.required,Validators.minLength(8)
    ])]
  });

  onSubmit(): void {
    this.user.id = '';
    if(this.addressForm.controls['name'].value)
      this.user.name = this.addressForm.controls['name'].value;
    if(this.addressForm.controls['email'].value)
      this.user.email = this.addressForm.controls['email'].value;
    if(this.addressForm.controls['phone'].value)
      this.user.phone = this.addressForm.controls['phone'].value;
    if(this.addressForm.controls['cpf'].value)
      this.user.cpf = this.addressForm.controls['cpf'].value;
    if(this.addressForm.controls['password'].value)
      this.user.password = this.addressForm.controls['password'].value;
    alert('Cadastrado!');
    console.log(this.user);
    localStorage.setItem('user', JSON.stringify(this.user));
  }
}
