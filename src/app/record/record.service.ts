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
        fileName: '9',
        title: '9月',
        comment: '',
        children: [
          {fileName: '20210905.md', title: '第一週', comment: 'test', image: ''},
          {fileName: '20210912.md', title: '第二週', comment: 'test', image: ''},
          {fileName: '20210919.md', title: '第三週', comment: 'test', image: ''},
          {fileName: '20210926.md', title: '第四週', comment: 'test', image: ''},

        ]
      },
      {
        fileName: '10',
        title: '10月',
        comment: '',
        children: [
          {fileName: '20211003.md', title: '第一週', comment: 'test', image: ''},
        ]
      }
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
