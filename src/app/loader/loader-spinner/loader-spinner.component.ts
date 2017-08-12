import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.scss']
})
export class LoaderSpinnerComponent implements OnInit {

  constructor(public elRef: ElementRef) { }

  ngOnInit() {
  }

}
