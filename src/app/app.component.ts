import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'new-rose-project';
  isSubmitted = false;
  // Dogs = [{name: '001', compound: 'cp1', mechanism: 'mec1', breed: 'Beagle'},
  //         {name: '002', compound: 'cp2', mechanism: 'mec2', breed: 'Pitbull'},
  //         {name: '003', compound: 'cp3', mechanism: 'mec3', breed: 'Terrier'},
  //         {name: '004', compound: 'cp4', mechanism: 'mec4', breed: 'Beagle'}];

  compounds: any ;
  mechanisms: any;
  chosenDogs: any = [];
  baseURL = 'localhost:8080/search/';
  @ViewChild(MatTable) table: MatTable<any>;
  constructor(public fb: FormBuilder, private http: HttpClient) { }

  /*########### Form ###########*/
  myForm = this.fb.group({
    compound: [''],
    mechanism: ['']
  })
  displayedColumns: string[] = ['studyId', 'compound', 'mechanism', 'testSite', 'route', 'species', 'duration', 'durationUnit', 'species' ];
  // Getter method to access formcontrols
  get dogCompound() {
    return this.myForm.get('compound');
  }

  get dogMechanism() {
    return this.myForm.get('mechanism');
  }

  onChange(event) {
    this.chosenDogs = [];
    if(this.dogCompound.value['name'] !== this.dogMechanism.value['name']){
      
      if(this.dogCompound.value){
        this.chosenDogs.push(this.dogCompound.value)
      }
      if(this.dogMechanism.value){
        this.chosenDogs.push(this.dogMechanism.value)
      }
    } else {
      if(event.target.name === 'compound'){
        this.chosenDogs.push(this.dogCompound.value)
      } 
      
      if(event.target.name === 'mechanism'){
        this.chosenDogs.push(this.dogMechanism.value)
      }
    }

    if(this.table){
      this.table.renderRows();
    }
  }

  onClear(){
    this.myForm.reset(this.myForm.value);
  }

  onSubmit() {
    this.isSubmitted = true;
    this.chosenDogs = [];
    if (this.myForm.invalid) {
      return false;
    } else {
      let headers = new HttpHeaders();
      headers.set('Access-Control-Allow-Origin', '*');
      if(this.dogCompound.value.length > 0 || this.dogMechanism.value.length > 0){
        this.http.get(this.baseURL + "studyInfo?" + "compounds=" + this.dogCompound.value + "&mechanisms=" + this.dogMechanism.value, {headers}).subscribe((data) => {
          this.chosenDogs = data;
          if(this.table){
            this.table.renderRows();
          }
        });
      } else {
        console.log('You must choose either a compound or mechanism');
      }
    }

  }

  ngOnInit(){
    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    this.http.get(this.baseURL + 'compound', {headers}).subscribe((data) => {
      // console.log(typeof data);
      // console.log('Data: ', data);
      this.compounds = data;
    });

    this.http.get(this.baseURL + 'mechanism', {headers}).subscribe((data) => {
      // console.log(typeof data);
      // console.log('Data: ', data);
      this.mechanisms = data;
    });
  }

}
