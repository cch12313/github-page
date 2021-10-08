import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {RecordService} from '../record.service';
import {RecordDetail} from '../record-detail';
import {environment} from '../../../environments/environment';
import {distinctUntilChanged, skip} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private record: RecordService
  ) {
  }

  isMdExist$ = new BehaviorSubject(false);

  params = this.urlParam(this.route.snapshot.params);
  detail = this.getRecordMapByKey(this.params.getFile(), this.record.recordMap);


  ngOnInit(): void {
    this.route.url.pipe(
      skip(1),
      distinctUntilChanged(),
    ).subscribe(_ => window.location.reload());
  }

  private urlParam(params: Params) {
    const urlParams = params;
    return {
      getYear(): string {
        return urlParams.hasOwnProperty('year') ? urlParams.year : '';
      },
      getMonth(): string {
        return urlParams.hasOwnProperty('month') ? urlParams.month : '';
      },
      getFile(): string {
        return urlParams.hasOwnProperty('file') ? urlParams.file : '';
      }
    };
  }

  private getRecordMapByKey(key: string, recordMap: Map<string, RecordDetail>) {
    const recordNotExist = !recordMap.has(key);

    if (recordNotExist) {
      this.isMdExist$.next(false);
      return {
        getTitle(): string {
          return '';
        },
        getImage(): string {
          return '';
        },
        getComment(): string {
          return '';
        },
        getPath(): string[] {
          return [];
        }
      };
    }

    const record = recordMap.get(key) ?? {} as RecordDetail;
    const detail = this.urlParam(this.route.snapshot.params);

    this.isMdExist$.next(true);

    return {
      getTitle(): string {
        return record.title;
      },
      getImage(): string {
        return record.image ?? '';
      },
      getComment(): string {
        return record.comment;
      },
      getPath(): string[] {
        return [
          environment.mdPath,
          detail.getYear(),
          detail.getMonth(),
          detail.getFile()
        ];
      }
    };
  }


}
