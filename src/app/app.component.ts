import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private data: DataService, private toastr: ToastrService) { }

  title = 'Registration Form';

  public FirstName: string;
  public LastName: string;
  public DOB: any;
  public Age: number;
  public Address1: string;
  public Address2: string;
  public MobileNumber: number;
  public PinCode: string;
  public State: string;
  public District: string;
  public Image: any;
  public url: string;

  public pincodeData;
  Genders: Gender[] = [
    { value: 'Male-0', viewValue: 'Male' },
    { value: 'Female-1', viewValue: 'Female' },
    { value: 'Transgender-2', viewValue: 'Transgender' }
  ];
  ngOnInit(): void {
  }

  public OnFileSelected(event): any {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.url = e.target.result;
      };
    }
  }

  public CalculateAge(): any {
    const today = new Date();
    const birthDate = new Date(this.DOB);
    this.Age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
      this.Age--;
    }
    return this.Age;
  }

  public FetchPinCodeData(): any {
    const pin = this.PinCode.valueOf();
    this.data.FetchPinCodeData(pin).subscribe((data) => {
      this.pincodeData = data;
      console.log(this.pincodeData);
      this.State = this.pincodeData?.[0]?.PostOffice[0]?.State;
      this.District = this.pincodeData?.[0]?.PostOffice[0]?.District;
    });
  }

  public SubmitForm(): any {

    if (!this.FirstName) {
      this.toastr.warning('Enter first name');
    }
    else if (!this.LastName) {
      this.toastr.warning('Enter last name');
    }
    else if (!this.Genders) {
      this.toastr.warning('Enter gender');
    }
    else if (!this.DOB) {
      this.toastr.warning('Enter Date of Birth');
    }
    else if (!this.Age) {
      this.toastr.warning('Enter Age');
    }
    else if (!this.Address1) {
      this.toastr.warning('Enter Address Line 1');
    }
    else if (!this.Address2) {
      this.toastr.warning('Enter Address Line 2');
    }
    else if (!this.MobileNumber) {
      this.toastr.warning('Enter Mobile Number');
    }
    else if (!this.PinCode) {
      this.toastr.warning('Enter PinCode');
    }
    else if (!this.State) {
      this.toastr.warning('Enter State');
    }
    else if (!this.District) {
      this.toastr.warning('Enter District');
    }
    else {
      this.toastr.warning('Please Upload Image File');
    }
    const FormData = {
      FirstName: this.FirstName,
      LastName: this.LastName,
      Genders: this.Genders,
      DOB: this.DOB,
      Age: this.Age,
      Address1: this.Address1,
      Address2: this.Address2,
      MobileNumber: this.MobileNumber,
      PinCode: this.PinCode,
      State: this.State,
      District: this.District,
    };
    localStorage.setItem('registrationFormData', JSON.stringify(FormData));
    localStorage.setItem('ImageUpload', this.url);
  }
}
