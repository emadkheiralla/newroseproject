import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'new-rose-project';
  isSubmitted = false;
  Dogs = [{name: '001', compound: 'cp1', mechanism: 'mec1', breed: 'Beagle'}, {name: '002', compound: 'cp2', mechanism: 'mec2', breed: 'Pitbull'}, {name: '003', compound: 'cp3', mechanism: 'mec3', breed: 'Terrier'}, {name: '004', compound: 'cp4', mechanism: 'mec4', breed: 'Beagle'}]
  chosenDogs = [];
  @ViewChild(MatTable) table: MatTable<any>;
  constructor(public fb: FormBuilder) { }

  /*########### Form ###########*/
  myForm = this.fb.group({
    compound: [''],
    mechanism: ['']
  })
  displayedColumns: string[] = ['name', 'compound', 'mechanism', 'breed' ];
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

  onSubmit() {
    this.isSubmitted = true;
    if (this.myForm.invalid) {
      return false;
    } else {
      alert(JSON.stringify(this.myForm.value))
    }

  }
}
