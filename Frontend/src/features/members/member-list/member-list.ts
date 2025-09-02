import { Component, inject, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { memberParams, profile } from '../../../types/profile';
import { MemberCard } from '../../members/member-card/member-card';
import { PaginationResult } from '../../../types/pagination';
import { Paginator } from '../../../shared/paginator/paginator';
import { FilterModel } from '../../../filter-model/filter-model';

@Component({
  selector: 'app-member-list',
  imports: [MemberCard, Paginator, FilterModel],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList implements OnInit {
  @ViewChild('filterModel') model!:FilterModel;
  private memberservice = inject(MemberService);
  protected paginatedMember = signal<PaginationResult<profile> | null>(null);
  protected memberParams = new memberParams();
  private updatedParams=new memberParams();
  constructor(){
    const filter=localStorage.getItem('filters');
    if(filter){
      this.memberParams=JSON.parse(filter);
      this.updatedParams=JSON.parse(filter);
    }
  }
  ngOnInit(): void {
    this.loadMembers();
  }
  loadMembers() {
    this.memberservice.getMembers(this.memberParams).subscribe({
      next: (next) => {
        this.paginatedMember.set(next);
      },
    });
  }
  onPageChange(event: { pageNumber: number; pageSize: number }) {
    this.memberParams.pageSize = event.pageSize;
    this.memberParams.pageNumber = event.pageNumber;
    this.loadMembers();
  }
  openModel(){
    this.model.open();
  }
  onClose(){
    console.log('model closed');
  }
  onFilterChange(data:memberParams){
    this.memberParams={...data};
    this.updatedParams={...data};
    this.loadMembers();
  }
  resetFilters(){
    this.memberParams=new memberParams();
    this.updatedParams=new memberParams();
    this.loadMembers();
  }
  get displayMessage():string{
    const defaultParams=new memberParams();
    const filters:string[]=[];
    if(this.updatedParams.gender){
        filters.push(this.updatedParams.gender+'s')
    }
    else{
      filters.push('Males,Females');
    }
    if(this.updatedParams.minAge!==defaultParams.minAge || this.updatedParams.maxAge!==defaultParams.maxAge){
      filters.push(`ages ${this.updatedParams.minAge}-${this.updatedParams.maxAge}`);
    }
    filters.push(this.updatedParams.orderBy==='lastActive'?'Recently active':'Newest members');
    return filters.length>0?`Selected :${filters.join(' | ')}`:'All members'
  }
}
