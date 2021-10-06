import {Injectable} from '@angular/core';
import {RecordDetail} from './record-detail';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private watchingSubject = new BehaviorSubject<RecordDetail>({
    mdPath: '',
    image: '',
    title: '',
    comment: ''
  });

  tree: RecordDetail[] = [
    {
      mdPath: environment.mdPath + 'test.md',
      image: '',
      title: 'test',
      comment: 'test comment'
    }
  ];

  watching$ = this.watchingSubject.asObservable();

  constructor() {
  }

  updateWatching(detail: RecordDetail): void {
    this.watchingSubject.next(detail);
  }

}
