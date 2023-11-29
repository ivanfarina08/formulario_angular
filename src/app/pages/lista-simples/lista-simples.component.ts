import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ModalExemplo, detalhesUsuario } from '../modal/modal.component';

@Component({
  selector: 'app-lista-simples',
  templateUrl: './lista-simples.component.html',
  styleUrls: ['./lista-simples.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatDividerModule, MatIconModule]
})

export class ListaSimplesComponent {
  displayedColumns: string[] = ['id', 'name', 'acao'];

  dataSource = new MatTableDataSource<User>();
  
  constructor(private router:Router,public service:UserService, public dialog: MatDialog){
    this.carregaItensTabela();
  }

  carregaItensTabela(){
    this.service.getUsers().subscribe({
      next: (response) => {
        console.log(response)
        this.dataSource.data = response;
      },
      error: (erro:any) =>{
        console.log('Ocorreu algum erro')
        console.log(erro)
      }
    })
  }

  openDialog(id:string) {
    const dialogRef = this.dialog.open(detalhesUsuario);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  goToDetail(id:string){
    this.router.navigate(['detalhe',id]);
  }


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}


/*

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lista-simples',
  templateUrl: './lista-simples.component.html',
  styleUrls: ['./lista-simples.component.css']
})
export class ListaSimplesComponent {
  constructor(private router:Router,public service:UserService){}

  users:User[] = [];

  ngOnInit(): void{
    this.getUsers()
  }

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
  goToDetail(user:User){
    this.router.navigate(['detalhe',user.id,user.phone]);
  }
}
  
*/