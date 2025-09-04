import { Component, inject, OnInit, signal } from '@angular/core';
import { LikesService } from '../../core/services/likes-service';
import { memberParams, profile } from '../../types/profile';
import { User } from '../../types/user';
import { MemberCard } from "../members/member-card/member-card";
import { PaginationResult } from '../../types/pagination';
import { Paginator } from "../../shared/paginator/paginator";

@Component({
  selector: 'app-lists',
  imports: [MemberCard, Paginator],
  templateUrl: './lists.html',
  styleUrl: './lists.css',
})
export class Lists implements OnInit {
  private likesService = inject(LikesService);
  protected paginatedResult = signal<PaginationResult<profile>|null>(null);
  protected predicate = 'liked';
  protected pageNumber=1;
  protected pageSize=5;

  tabs=[
    {label:'Liked',value:'liked'},
    {label:'Liked me',value:'likedBy'},
    {label:'Mutual',value:'mutual'},
  ]

  ngOnInit(): void {
   this.loadLikes();
  }
  setPredicate(predicate:string){
    if(this.predicate!==predicate){
      this.predicate=predicate;
      this.pageNumber=1;
      this.loadLikes();
    }
  }
  loadLikes(){
    this.likesService.getLikes(this.predicate,this.pageNumber,this.pageSize).subscribe({
      next:response=>this.paginatedResult.set(response)
    })
    // console.log(this.members)
  }
  onPageChange(event:{pageNumber:number,pageSize:number}){
    this.pageNumber=event.pageNumber;
    this.pageSize=event.pageSize;
    this.loadLikes();
  }
}
