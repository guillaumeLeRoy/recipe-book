import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {Coachee} from "../../../../model/Coachee";
import {ActivatedRoute, Router} from "@angular/router";
import {CoachCoacheeService} from "../../../../service/coach_coachee.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'er-profile-coachee-admin',
  templateUrl: './profile-coachee-admin.component.html',
  styleUrls: ['./profile-coachee-admin.component.scss']
})
export class ProfileCoacheeAdminComponent implements OnInit, AfterViewInit, OnDestroy {

  private coachee: BehaviorSubject<Coachee>;
  private rhId: string;
  private subscriptionGetCoachee: Subscription;
  private subscriptionGetRoute: Subscription;

  loading: boolean = true;

  constructor(private router: Router, private cd: ChangeDetectorRef, private apiService: CoachCoacheeService, private route: ActivatedRoute) {
    this.coachee = new BehaviorSubject(null);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.loading = true;
    this.getCoachee();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subscriptionGetCoachee) {
      console.log("Unsubscribe coach");
      this.subscriptionGetCoachee.unsubscribe();
    }

    if (this.subscriptionGetRoute) {
      console.log("Unsubscribe route");
      this.subscriptionGetRoute.unsubscribe();
    }
  }

  private getCoachee() {

    this.subscriptionGetRoute = this.route.params.subscribe(
      (params: any) => {
        let coacheeId = params['id'];

        this.subscriptionGetCoachee = this.apiService.getCoacheeForId(coacheeId, true).subscribe(
          (coachee: Coachee) => {
            console.log("gotCoachee", coachee);
            this.coachee.next(coachee);
            this.rhId = coachee.associatedRh.id;
            // this.cd.detectChanges();
            this.loading = false;
          }
        );
      }
    )
  }

  goToRhProfile() {
    this.router.navigate(['admin/profile/rh', this.rhId])
  }

}
