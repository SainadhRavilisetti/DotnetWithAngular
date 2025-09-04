import { Component, computed, inject, input } from '@angular/core';
import { profile } from '../../../types/profile';
import { RouterLink } from '@angular/router';
import { AgePipe } from '../../../core/pipes/age-pipe';
import { LikesService } from '../../../core/services/likes-service';

@Component({
  selector: 'app-member-card',
  imports: [RouterLink,AgePipe],
  templateUrl: './member-card.html',
  styleUrl: './member-card.css'
})
export class MemberCard {
private likeService=inject(LikesService);
members=input.required<profile>();
protected hasLinked=computed(()=>this.likeService.likeIds().includes(this.members().id));

toggleLike(event:Event){
  event.stopPropagation();
  this.likeService.toggleLike(this.members().id).subscribe({
    next:()=>{
      if(this.hasLinked()){
        this.likeService.likeIds.update(ids=>ids.filter(x=>x!==this.members().id))
      }
      else{
        this.likeService.likeIds.update(ids=>[...ids,this.members().id])
      }
    }
  })
}
}
