import { Component, input } from '@angular/core';
import { profile } from '../../../types/profile';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-member-card',
  imports: [RouterLink],
  templateUrl: './member-card.html',
  styleUrl: './member-card.css'
})
export class MemberCard {
members=input.required<profile>();
}
