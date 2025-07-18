import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http=inject(HttpClient);
  protected  title = 'Hello';
  protected  profile=signal<any>([]);

  async ngOnInit(){
     this.profile.set(await this.GetUsers())
  }


  async GetUsers(){
    try{
      return lastValueFrom(this.http.get('https://localhost:5002/api/Profile'));
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }
}
