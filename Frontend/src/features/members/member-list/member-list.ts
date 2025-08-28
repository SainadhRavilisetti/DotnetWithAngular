import { Component, inject, OnInit, signal } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { Observable } from 'rxjs';
import { memberParams, profile } from '../../../types/profile';
import { AsyncPipe } from '@angular/common';
import { MemberCard } from "../../members/member-card/member-card";
import { Pagination, PaginationResult } from '../../../types/pagination';
import { Paginator } from "../../../shared/paginator/paginator";

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCard, Paginator],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css'
})
export class MemberList implements OnInit {
  private memberservice=inject(MemberService);
  protected paginatedMember=signal<PaginationResult<profile>|null>(null);
  protected memberParams=new memberParams();
  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberservice.getMembers(this.memberParams).subscribe({
      next:next=>{
        this.paginatedMember.set(next);
      }
    })
  }

  onPageChange(event : {pageNumber:number,pageSize:number}){
    this.memberParams.pageSize=event.pageSize;
    this.memberParams.pageNumber=event.pageNumber;
    this.loadMembers();
  }
}
