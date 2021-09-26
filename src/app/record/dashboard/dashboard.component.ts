import { Component, OnInit } from '@angular/core';
import {RecordDetail} from '../record-detail';

const TEST_STRUCT: RecordDetail = {
  mdPath: 'assets/md/test.md',
  image: '',
  title: 'test',
  comment: 'test comment'
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  detail = TEST_STRUCT;

  constructor() { }

  ngOnInit(): void {
  }

}
