import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError } from '../../../types/ApiError';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css'
})
export class ServerError {
protected error:ApiError;
protected showdetails=false;
private router=inject(Router);
constructor(){
const navigation=this.router.getCurrentNavigation();
this.error=navigation?.extras?.state?.['error']
}
detailsToggle(){
  this.showdetails=!this.showdetails;
}
}
