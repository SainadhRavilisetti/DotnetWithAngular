import { Component, inject, OnInit, signal } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Photos } from '../../../types/profile';
import { AsyncPipe } from '@angular/common';
import { ImageUpload } from '../../../shared/image-upload/image-upload';

@Component({
  selector: 'app-members-photos',
  imports: [ImageUpload],
  templateUrl: './members-photos.html',
  styleUrl: './members-photos.css',
})
export class MembersPhotos implements OnInit {
  protected memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  protected photos = signal<Photos[]>([]);
  protected loading=signal(false);
  ngOnInit(): void {
    const memberId = this.route.parent?.snapshot.paramMap.get('id');
    if (memberId) {
      this.memberService.getMembersPhotos(memberId).subscribe({
        next: (photos) => this.photos.set(photos),
      });
    }
  }
  onUploadImage(file:File){
    this.loading.set(true);
    this.memberService.uploadPhoto(file).subscribe({
      next:photo=>{
          this.memberService.editMode.set(false);
          this.loading.set(false);
          this.photos.update(photos=>[...photos,photo]);

      },
      error:error=>{
        console.log('Error uploading the image:',error);
        this.loading.set(false);
      }
    })
  }
}
