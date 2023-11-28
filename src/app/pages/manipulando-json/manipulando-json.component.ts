import { Component } from '@angular/core';
import studentsData from '../../students.json';
import { Router } from '@angular/router';

interface Student {
  id: number;
  name: string;
  email: string;
  gender: string;
}

@Component({
  selector: 'app-manipulando-json',
  templateUrl: './manipulando-json.component.html',
  styleUrls: ['./manipulando-json.component.css']
})
export class ManipulandoJsonComponent {
  students: Student[] = studentsData;

  constructor(private router: Router){}

  ngOnInit(): void {
    console.log(this.students);
  }

  goToDetail(student:Student){
    this.router.navigate(['detalhe',student.id]);
  }
}
