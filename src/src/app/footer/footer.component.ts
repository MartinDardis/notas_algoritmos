import { Component, OnInit } from '@angular/core';
import {faBug} from "@fortawesome/free-solid-svg-icons";
import {REPORT_BUG_FORM} from "../../environments/environment";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  iconFooter = faBug;
  googleFormLink = REPORT_BUG_FORM;

  constructor() { }

  ngOnInit() {
  }

}
