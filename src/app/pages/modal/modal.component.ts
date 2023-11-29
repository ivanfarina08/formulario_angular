import {Component, Input} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class ModalComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ModalExemplo);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'modal-exemplo',
  templateUrl: 'modal-exemplo.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ModalExemplo {}

@Component({
  selector: 'detalhes-usuario',
  templateUrl: 'detalhes-usuario.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class detalhesUsuario {
  @Input() dadosFilho: any;
  constructor(public service:UserService){
    this.getUsers();
  }

  users:User[] = [];

  getUsers(): void{
    this.service.getUsers().subscribe({
      next: (response) => {
        console.log(response)
        this.users = response
      },
      error: (erro:any) =>{
        console.log('Ocorreu algum erro')
        console.log(erro)
      }
    })
  }
}