import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PeopleService } from '../shared/services/people.service';
import { FormComponent } from './components/form/form.component';
//import { Report } from './store/admin.actions';
//import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('appForm') child: FormComponent;

  peopleGetSub: Subscription;
  //studentsEditSub: Subscription;

  idEdit: String;

  data = [];

  eldery: { name: string; age: number; enable: boolean; urlImage: string; }[];
  young: { name: string; age: number; enable: boolean; urlImage: string; }[];

  //constructor(private peopleService: PeopleService, private store: Store<any>) { }
  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.data = [];
    this.eldery = [];
    this.young = [];
    this.peopleGetSub = this.peopleService.getPeople().subscribe(
      res => {
        Object.entries(res).map((p: any) => this.data.push({id: p[0], ...p[1]}));
        /*
        this.data.forEach(el => {
          this.store.dispatch(Report({person: Object.assign({}, el)}));
        } );
        */
        this.eldery = this.data.filter(el => el.age > 64);

        this.young = this.data.filter(el => el.age < 65);
      },
      err => {
        console.log('ERROR');
      }
    );
  }

  openDrawer(type: boolean) {
    this.child.open(type);
  }

/*
  editDB() {
    this.studentsEditSub = this.studentsService.updateStudent(this.idEdit, this.studentForm.value).subscribe(
      res => {
        this.loadStudents();
      },
      err => {
        console.log('ERROR');
      }
    );
  }

  edit(event) {
    this.idEdit = event.id;
    this.studentForm.patchValue({
      name: event.name,
      age: event.age,
      grade: event.grade,
      urlImage: event.urlImage
    });
  }
*/

  delete() {
    this.loadPeople();
  }

  create() {
    this.loadPeople();
  }

  ngOnDestroy() {
    this.peopleGetSub ? this.peopleGetSub.unsubscribe() : '';
    //this.studentsEditSub ? this.studentsEditSub.unsubscribe() : '';
  }

}