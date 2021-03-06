import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Coach} from "../../../../model/Coach";
import {CoachCoacheeService} from "../../../../service/coach_coachee.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

declare var Materialize: any;
declare var $: any;

@Component({
  selector: 'er-profile-coach-admin',
  templateUrl: './profile-coach-admin.component.html',
  styleUrls: ['./profile-coach-admin.component.scss']
})
export class ProfileCoachAdminComponent implements OnInit, AfterViewInit, OnDestroy {

  private coach: BehaviorSubject<Coach>;
  private subscriptionGetCoach: Subscription;
  private subscriptionGetRoute: Subscription;

  private loading: boolean = true;

  private avatarLoading = false;
  private avatarFile: File;


  constructor(private apiService: CoachCoacheeService, private cd: ChangeDetectorRef, private route: ActivatedRoute) {
    this.coach = new BehaviorSubject(null);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.loading = true;
    this.getCoach();
  }


  ngAfterViewInit(): void {
    console.log("afterViewInit");
    // this.isOwner = (user instanceof Coach) && (coach.email === user.email);
  }


  ngOnDestroy(): void {
    if (this.subscriptionGetCoach) {
      console.log("Unsubscribe coach");
      this.subscriptionGetCoach.unsubscribe();
    }

    if (this.subscriptionGetRoute) {
      console.log("Unsubscribe route");
      this.subscriptionGetRoute.unsubscribe();
    }
  }

  private getCoach() {
    this.subscriptionGetCoach = this.route.params.subscribe(
      (params: any) => {
        let coachId = params['id'];

        this.subscriptionGetCoach = this.apiService.getCoachForId(coachId, true).subscribe(
          (coach: Coach) => {
            console.log("gotCoach", coach);
            this.coach.next(coach);
            this.loading = false;
          }
        );
      }
    )
  }


  previewPicture(event: any) {
    console.log('filePreview', event.target.files[0]);

    this.avatarFile = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e: any) {
        $('#avatar-preview').css('background-image', 'url(' + e.target.result + ')');
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  uploadAvatarPicture() {

    if (this.avatarFile !== null && this.avatarFile !== undefined) {
      console.log("Upload avatar");
      this.avatarLoading = true;

      this.coach.asObservable().last().flatMap(
        (coach: Coach) => {
          return this.apiService.updateCoachProfilePicture(coach.id, this.avatarFile);
        }
      ).subscribe(
        (res: any) => {
          // refresh page
          console.log("Upload avatar, DONE, res : " + res);
          this.avatarLoading = false;
          window.location.reload();
        }, (error) => {
          Materialize.toast('Impossible de modifier votre photo', 3000, 'rounded');
          this.avatarLoading = false;
        }
      );

    }
  }
}
