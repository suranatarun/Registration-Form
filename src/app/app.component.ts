import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {}
  title = 'Registration Form';
  registrationform: FormGroup;

  FirstName: string;
  LastName: string;
  DOB: Date;
  Age: number;
  Address: string;
  MobileNumber: number;
  PinCode: number;
  State: string;
  District: string;
  image: any;

  Genders: Gender[] = [
    {value: 'Male-0', viewValue: 'Male'},
    {value: 'Female-1', viewValue: 'Female'},
    {value: 'Transgender-2', viewValue: 'Transgender'}
  ];
  ngOnInit(): void {
    this.FormInitialization();
  }

  public FormInitialization(): any {
    this.registrationform = new FormGroup({
      FirstName: new FormControl(['', Validators.required, Validators.minLength, Validators.maxLength]),
      LastName: new FormControl(['', Validators.required, Validators.minLength]),
      Genders: new FormControl(['', Validators.required]),
      DOB: new FormControl([''], Validators.required),
      Age: new FormControl([''], Validators.required),
      Address: new FormControl([''], Validators.required),
      MobileNumber: new FormControl([''], Validators.required),
      PinCode: new FormControl([''], Validators.required),
      State: new FormControl([''], Validators.required),
      District: new FormControl([''], Validators.required),
      image: new FormControl([''], Validators.required),
    });
  }

  public SubmitForm(): any{

  }
}
