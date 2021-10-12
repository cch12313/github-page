import {Component, Input, OnInit} from '@angular/core';
import {RecordDetail} from '../record-detail';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() path!: string[];
  @Input() title!: string;
  @Input() comment!: string;

  mdPath = '';

  constructor() {
  }

  ngOnInit(): void {
    this.mdPath = this.path.join('/');
  }

}
