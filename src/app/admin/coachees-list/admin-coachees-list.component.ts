import {AfterViewInit, Component, OnDestroy, OnInit} from "@angular/core";
import {Coachee} from "../../model/Coachee";
import {Subscription} from "rxjs/Subscription";
import {CoachCoacheeService} from "../../service/coach_coachee.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'er-admin-coachees-list',
  templateUrl: './admin-coachees-list.component.html',
  styleUrls: ['./admin-coachees-list.component.scss']
})
export class AdminCoacheesListComponent implements OnInit, AfterViewInit, OnDestroy {

  private coachees: BehaviorSubject<Array<Coachee>>;
  private getAllCoacheesSub: Subscription;

  loading = true;

  constructor(private apiService: CoachCoacheeService) {
    this.coachees = new BehaviorSubject(null);
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    this.fetchData();
  }

  ngOnDestroy(): void {
    if (this.getAllCoacheesSub != null) {
      this.getAllCoacheesSub.unsubscribe();
    }
  }

  private fetchData() {
    this.loading = true;
    this.getAllCoacheesSub = this.apiService.getCoachees(true).subscribe(
      (coachees: Array<Coachee>) => {
        console.log('getAllCoachees subscribe, coachees : ', coachees);
        //filter coachee with NO selected coachs
        let notAssociatedCoachees = new Array<Coachee>();
        for (let coachee of coachees) {
          if (coachee.selectedCoach == null) {
            notAssociatedCoachees.push(coachee);
          }
        }
        this.loading = false;
        this.coachees.next(notAssociatedCoachees);
      }
    );
  }

}
