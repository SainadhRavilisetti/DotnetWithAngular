import { Component, output, inject, OnInit, signal } from '@angular/core';
import { register } from '../../../types/user';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { JsonPipe } from '@angular/common';
import { TextInput } from '../../../shared/text-input/text-input';
import { generate } from 'rxjs';
import { Router } from '@angular/router';
// import { NgClass } from "../../../../node_modules/@angular/common/common_module.d";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, TextInput],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register{
  private accountService = inject(AccountService);
  cancelRegister = output<boolean>();
  private router=inject(Router);
  private fb = inject(FormBuilder);
  protected creds = {} as register;
  protected credentialsForm: FormGroup;
  protected profileForm:FormGroup;
  protected currentStep=signal(1);
  protected validationError=signal<string[]>([]);

  constructor() {
    this.credentialsForm =this.fb.group({
      email:['', [Validators.required, Validators.email]],
      name:['', Validators.required],
      password:['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
      ]],
      confrimPassword: ['', [
        Validators.required,
        this.matchValues('password'),
      ]],
    });

    this.profileForm=this.fb.group({
      gender:['male',Validators.required],
      dateOfBirth:['',Validators.required],
      city:['',Validators.required],
      country:['',Validators.required]
    })

    this.credentialsForm.controls['password'].valueChanges.subscribe(() => {
      this.credentialsForm.controls['confrimPassword'].updateValueAndValidity();
    });
  }


  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (!parent) return null;
      const matchValue = parent.get(matchTo)?.value;
      return control.value === matchValue ? null : { passwordMismatch: true };
    };
  }
  getMaxDate(){
    const today=new Date();
    today.setFullYear(today.getFullYear()-18);
    return today.toISOString().split('T')[0];
  }
  nextStep(){
    if(this.credentialsForm.valid){
      this.currentStep.update(prevStep=>prevStep+1);
    }
  }
  prevStep(){
    this.currentStep.update(prevStep=>prevStep-1);
  }
  register() {
    if(this.profileForm.valid && this.credentialsForm.valid){
      const formData={...this.credentialsForm.value,...this.profileForm.value};
      this.accountService.register(formData).subscribe({
      next:()=>{
        this.router.navigateByUrl('/members');
        this.cancel();
      },
      error:error=>{
        console.log(error);
        this.validationError.set(error);
      }
    })
    }
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
