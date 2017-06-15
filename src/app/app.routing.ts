import {RouterModule, Routes} from "@angular/router";
import {SigninComponent} from "./login/signin/signin.component";
import {SignupAdminComponent} from "./login/signup/signup_admin.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {ChatComponent} from "./chat/chat.component";
import {CoachListComponent} from "./user/coach-list/coach-list.component";
import {CoachDetailsComponent} from "./user/coach-details/coach-details.component";
import {MeetingListComponent} from "./meeting/meeting-list/meeting-list.component";
import {ProfileCoachComponent} from "./user/profile/coach/profile-coach.component";
import {ProfileCoacheeComponent} from "./user/profile/coachee/profile-coachee.component";
import {MeetingDateComponent} from "./meeting/meeting-date/meeting-date.component";
import {AdminCoachsListComponent} from "./admin/coachs-list/admin-coachs-list.component";
import {AdminComponent} from "./admin/admin.component";
import {ProfileRhComponent} from "./user/profile/rh/profile-rh.component";
import {SignupCoacheeComponent} from "./login/signup/signup-coachee.component";
import {SignupCoachComponent} from "./login/signup/signup-coach.component";
import {SignupRhComponent} from "./login/signup/signup-rh.component";
import {AvailableMeetingsComponent} from "./meeting/meeting-list/coach/available-meetings.component";
import {CoacheesListComponent} from "./admin/coachees-list/coachees-list.component";
import {RhsListComponent} from "./admin/rhs-list/rhs-list.component";

const APP_ROUTES: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'signup_coachee', component: SignupCoacheeComponent},
  {path: 'signup_coach', component: SignupCoachComponent},
  {path: 'signup_rh', component: SignupRhComponent},
  // {path: 'profile_coach', component: ProfileCoachComponent},
  {path: 'profile_coachee', component: ProfileCoacheeComponent},
  {path: 'profile_rh', component: ProfileRhComponent},
  {path: 'coachs', component: CoachListComponent},
  {path: 'profile_coach/:id', component: CoachDetailsComponent},
  {path: 'coachees', component: CoachListComponent},
  {path: 'meetings', component: MeetingListComponent},
  {path: 'date/:meetingId', component: MeetingDateComponent},
  {path: 'available_meetings', component: AvailableMeetingsComponent},
  {
    path: 'admin', component: AdminComponent,
    children: [
      {path: 'signup', component: SignupAdminComponent},
      {path: 'coachs-list', component: AdminCoachsListComponent},
      {path: 'coachees-list', component: CoacheesListComponent},
      {path: 'rhs-list', component: RhsListComponent}
    ]
  },

  // {path: 'coachees', component: CoachListComponent, canActivate: [AuthGuard]},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
