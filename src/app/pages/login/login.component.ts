import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { AutorizacaoService } from 'src/app/services/autorizacao.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    email: [null, Validators.compose([
      Validators.required,Validators.minLength(5), Validators.maxLength(50), Validators.email
    ])],
    password: [null, Validators.compose([
      Validators.required,Validators.minLength(8)
    ])]
  });

  email = this.addressForm.controls['email'];

  getErrorMessage(){
    if(this.email.hasError('required')){
      return 'E-mail é obrigatório'
    }
    return this.email.hasError('email')? 'Você deve preencher um valor válido para o e-mail.' : '';
  }
  hasUnitNumber = false;

  
  constructor(private autorizacaoService: AutorizacaoService){}

  loginClick(){
    if(this.autorizacaoService.obterLoginStatus()){this.autorizacaoService.deslogar();}
    else{this.autorizacaoService.autorizar();}
  }

  onSubmit(): void {
    this.loginClick();
    alert('Thanks!');
  }
}
