import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { Lists } from '../features/lists/lists';
import { Messages } from '../features/messages/messages';
import { authGuard } from '../core/guards/auth-guard';
import { TestErrors } from '../features/test-errors/test-errors';
import { NotFound } from '../shared/errors/not-found/not-found';
import { ServerError } from '../shared/errors/server-error/server-error';
import { MemberList } from '../features/members/member-list/member-list';
import { MemberDetailed } from '../features/members/member-detailed/member-detailed';
import { MembersProfile } from '../features/members/members-profile/members-profile';
import { MembersPhotos } from '../features/members/members-photos/members-photos';
import { MembersMessages } from '../features/members/members-messages/members-messages';
import { memberResolver } from '../features/members/member-resolver';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'members', component: MemberList },
      {
        path: 'members/:id',
        resolve:{member:memberResolver},
        runGuardsAndResolvers:'always',
         component: MemberDetailed,
         children:[
          {path:'',redirectTo:'profile',pathMatch:'full'},
          {path:'profile',component:MembersProfile,title:'Profile'},
          {path:'photos',component:MembersPhotos,title:'Photos'},
          {path:'messages',component:MembersMessages,title:'Messages'}
         ]
        },
      { path: 'lists', component: Lists },
      { path: 'messages', component: Messages },
    ],
  },
  { path: 'error', component: TestErrors },
  { path: 'server-error', component: ServerError },
  { path: '**', component: NotFound },
];
