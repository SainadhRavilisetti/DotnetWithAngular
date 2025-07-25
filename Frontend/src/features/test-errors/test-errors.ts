import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  imports: [],
  templateUrl: './test-errors.html',
  styleUrl: './test-errors.css'
})
export class TestErrors {
private http =inject(HttpClient);
baseUrl='https://localhost:5002/api/';
validationErrors=signal<string[]>([]);
get404error(){
  this.http.get(this.baseUrl+"ErrorHandling/not-found").subscribe({
    next:response=>{
      console.log(response);
    },
    error:error=>{console.log(error);}
  })
}
get400error(){
  this.http.get(this.baseUrl+"ErrorHandling/bad-request").subscribe({
    next:response=>{
      console.log(response);
    },
    error:error=>{console.log(error);}
  })
}
get400validationerror(){
  this.http.post(this.baseUrl+"Account/register",{}).subscribe({
    next:response=>{
      console.log(response);
    },
    error:error=>{
      console.log(error);
      this.validationErrors.set(error);
    }
  })
}
get401error(){
  this.http.get(this.baseUrl+"ErrorHandling/auth").subscribe({
    next:response=>{
      console.log(response);
    },
    error:error=>{console.log(error);}
  })
}
get500error(){
  this.http.get(this.baseUrl+"ErrorHandling/server-error").subscribe({
    next:response=>{
      console.log(response);
    },
    error:error=>{console.log(error);}
  })
}
}
