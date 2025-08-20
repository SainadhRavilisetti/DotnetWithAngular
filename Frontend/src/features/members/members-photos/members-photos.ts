import { Component, inject, OnInit, signal } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Photos, profile } from '../../../types/profile';
import { AsyncPipe } from '@angular/common';
import { ImageUpload } from '../../../shared/image-upload/image-upload';
import { AccountService } from '../../../core/services/account-service';
import { User } from '../../../types/user';
import { StarButton } from '../../../shared/star-button/star-button';
import { DeleteButton } from '../../../shared/delete-button/delete-button';

@Component({
  selector: 'app-members-photos',
  imports: [ImageUpload, StarButton, DeleteButton],
  templateUrl: './members-photos.html',
  styleUrl: './members-photos.css',
})
export class MembersPhotos implements OnInit {
  protected memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  protected accountService = inject(AccountService);
  protected photos = signal<Photos[]>([]);
  protected loading = signal(false);
  ngOnInit(): void {
    const memberId = this.route.parent?.snapshot.paramMap.get('id');
    if (memberId) {
      this.memberService.getMembersPhotos(memberId).subscribe({
        next: (photos) => this.photos.set(photos),
      });
    }
  }
  onUploadImage(file: File) {
    this.loading.set(true);
    this.memberService.uploadPhoto(file).subscribe({
      next: (photo) => {
        this.memberService.editMode.set(false);
        this.loading.set(false);
        this.photos.update((photos) => [...photos, photo]);
        if(!this.memberService.member()?.imgUrl){
          this.setLocalMainPhoto(photo);
        }
      },
      error: (error) => {
        console.log('Error uploading the image:', error);
        this.loading.set(false);
      },
    });
  }
  setMainPhoto(photo: Photos) {
    this.memberService.setMainPage(photo).subscribe({
      next: () => {
        this.setLocalMainPhoto(photo);
      },
    });
  }
  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe({
      next: () => {
        this.photos.update((photos) => photos.filter((x) => x.id !== photoId));
      },
    });
  }
  private setLocalMainPhoto(photo:Photos) {
    const currentUser = this.accountService.currentuser();
    if (currentUser) {
      currentUser.imgUrl = photo.url;
    }
    this.accountService.setcurrentuser(currentUser as User);
    this.memberService.member.update(
      (member) =>
        ({
          ...member,
          imgUrl: photo.url,
        } as profile)
    );
  }
}
