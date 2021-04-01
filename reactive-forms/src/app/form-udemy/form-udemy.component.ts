import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-udemy',
  templateUrl: './form-udemy.component.html',
  styleUrls: [`./form-udemy.component.css`]
})
export class FormUdemyComponent implements OnInit {
  form: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
          Validators.email,
          Validators.required
      ]),
      password: new FormControl(null,[
          Validators.required,
          Validators.minLength(6)
      ]),
      address: new FormGroup({
        country: new FormControl('ru'),
        city: new FormControl('', Validators.required)
      }),
      skills: new FormArray([])
    });
  }

  submit() {
    console.log('Form: ', this.form);
    const formData = {... this.form.value};
    console.log('Form data: ', formData);
  }

  setCapital() {
    const cityMap = {
      ru: 'Moscow',
      by: 'Minsk',
      ua: 'Kiev'
    };

    const city = cityMap[this.form.get('address').get('country').value];
    this.form.patchValue({address: {city}});
  }

  addSkill() {
    const control = new FormControl('', Validators.required);
    // (<FormArray>this.form.get('skills')).push()
    (this.form.get('skills') as FormArray ).push(control);

  }
}
