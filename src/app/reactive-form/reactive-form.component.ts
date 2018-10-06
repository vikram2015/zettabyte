import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  myForm: FormGroup;


  constructor(private formBuilder: FormBuilder) { }


  clickAct() {
    console.log(this.myForm.value);
    this.myForm.value.data = 10
    console.log(this.myForm.value)
  }
  initializeForm() {
    this.myForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{8,16}$')
      ]],
      cellPhone: this.formBuilder.array([]),
      agree: [false, [
        Validators.requiredTrue
      ]],
      address:this.formBuilder.array([])
    })
  }

  ngOnInit() {
    this.initializeForm()
    // this.myForm.valueChanges.subscribe()
  }

  clearRecord() {
    this.initializeForm()
  }

  get phoneForms() {
    return this.myForm.get('cellPhone') as FormArray
  }

  get AdressList(){
    return this.myForm.get('address') as FormArray
  }


  addPhone() {
    const cellPhones = this.formBuilder.group({
      resid: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10)
      ]],
      mobile: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10)
      ]]
    })
    this.phoneForms.push(cellPhones);
  }


  addAdress(){
    const NewAdress = this.formBuilder.group({
      line1:['',[
        Validators.required
      ]],
      line2:['',[
        Validators.required
      ]],
      district:['',[
        Validators.required
      ]],
      state:['',[
        Validators.required
      ]],
      country:['',[
        Validators.required
      ]],
      pincode:['',[
        Validators.required
      ]]
    })
    this.AdressList.push(NewAdress);
  }

  deleteAdress(i) {
    this.AdressList.removeAt(i)
  }

  deletePhone(i) {
    this.phoneForms.removeAt(i)
  }

}
