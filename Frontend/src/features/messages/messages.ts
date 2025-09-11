import { Component, inject, OnInit, signal } from '@angular/core';
import { MessageService } from '../../core/services/message-service';
import { PaginationResult } from '../../types/pagination';
import { Message } from '../../types/message';
import { Paginator } from "../../shared/paginator/paginator";
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-messages',
  imports: [Paginator,RouterLink,DatePipe],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages implements OnInit {
  private messageService = inject(MessageService);
  protected container = 'Inbox';
  protected fetchedContainer='Inbox';
  protected pageNumber = 1;
  protected pageSize = 10;
  protected paginationMessages = signal<PaginationResult<Message> | null>(null);
  tabs = [
    { label: 'Inbox', value: 'Inbox' },
    { label: 'Outbox', value: 'Outbox' },
  ];
message: any;
  ngOnInit(): void {
    this.loadMessages();
  }
  loadMessages() {
    this.messageService
      .getMessage(this.container, this.pageNumber, this.pageSize)
      .subscribe({
        next: (response) => {
          this.paginationMessages.set(response);
          this.fetchedContainer=this.container;
        },
      });
  }
  get isInbox() {
    return this.fetchedContainer === 'Inbox';
  }
  setContainer(container: string) {
    this.container = container;
    this.loadMessages();
  }
  onPageChange(event: { pageNumber: number; pageSize: number }) {
    this.pageNumber = event.pageNumber;
    this.pageSize = event.pageSize;
    this.loadMessages();
  }
  deleteMessage(event:Event ,id:string){
    event.stopPropagation();
    this.messageService.deleteMessage(id).subscribe({
      next:()=>{
        this.loadMessages();
        const current=this.paginationMessages();
        if(current?.items){
          this.paginationMessages.update(prev=>{
            if(!prev){return null;}
            const newItems=prev.items.filter(x=>x.id!==id) || [];
            return {
              items:newItems,
              metadata:prev.metadata
            }
          })
        }
      }
    })
  }
}
