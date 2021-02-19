import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'new-rose-project';
  isSubmitted = false;
  Dogs = [{id: 1, breed: 'Beagle'}, {id: 2, breed: 'Pitbull'}, {id: 3, breed: 'Terrier'}, {id: 4, breed: 'Rottweiler'}]

  constructor(public fb: FormBuilder) { }

  /*########### Form ###########*/
  myForm = this.fb.group({
    dogName: ['', [Validators.required]]
  })

  // Getter method to access formcontrols
  get dog() {
    return this.myForm.get('dogName');
  }

  /*########### Template Driven Form ###########*/
  onSubmit() {
    this.isSubmitted = true;
    if (this.myForm.invalid) {
      return false;
    } else {
      alert(JSON.stringify(this.myForm.value))
    }

  }
}
