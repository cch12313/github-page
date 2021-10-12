import {Injectable} from '@angular/core';
import {RecordDetail} from './record-detail';
import {BehaviorSubject} from 'rxjs';
import {WatchingRecord} from './watching-record';

const RECORD_TREE: RecordDetail[] = [
  {
    fileName: '2021',
    title: '2021',
    comment: '',
    children: [
      {
        fileName: '10',
        title: '10月',
        comment: '',
        children: [
          {
            fileName: 'test.md',
            title: '說明',
            image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
            comment: '使用說明',
          },
        ]
      },

    ]
  }
];

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private watchingSubject = new BehaviorSubject<WatchingRecord>({
    path: '',
    fileName: '',
    image: '',
    title: '',
    comment: ''
  });

  tree = RECORD_TREE;
  recordMap = new Map<string, RecordDetail>();

  watching$ = this.watchingSubject.asObservable();

  constructor() {
    this.treeToMap(this.tree);
  }

  private treeToMap(details: RecordDetail[]): void {
    details.forEach(detail => {
      this.recordMap.set(detail.fileName, detail);

      if (detail.children) {
        this.treeToMap(detail.children);
      }
    });
  }

  updateWatching(detail: WatchingRecord): void {
    this.watchingSubject.next(detail);
  }

}
