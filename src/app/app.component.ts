import { Component, HostListener, Inject, NgModule, OnInit, ElementRef,ViewChild  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {DOCUMENT} from '@angular/common';
import { WINDOW } from "./services/window.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

  animations: [
    trigger('changeDivSize', [
      state('initial', style({
        marginTop: 180 //this.offset - this.sidebar_offset + 15      issue
      })),
      state('final', style({
        marginTop: 0
      })),
      transition('initial=>final', animate('3000ms')),
      transition('final=>initial', animate('1000ms'))
    ]),
  ]


})
export class AppComponent {
  position:string;
  offset :any;
  sidebar_offset:any;
  @ViewChild('sidebar') sidebar: ElementRef;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window
  ) {}

@HostListener("window:scroll", [])
  onWindowScroll() {
    this.offset = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    this.sidebar_offset = this.sidebar.nativeElement.offsetTop;
    console.log(this.offset+'***'+this.sidebar_offset);
    if (this.offset > this.sidebar_offset) 
      this.changeState('initial');
    else
      this.changeState('final');
  }
  
  currentState = 'initial';
  changeState(position:any) {
    this.currentState = position;
  }
}
