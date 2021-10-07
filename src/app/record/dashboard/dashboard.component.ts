import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {RecordService} from '../record.service';
import {RecordDetail} from '../record-detail';

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

  params = this.urlParam(this.route.snapshot.params);
  detail = this.getRecordMapByKey(this.params.getFile(), this.record.recordMap);


  ngOnInit(): void {
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
          detail.getYear(),
          detail.getMonth(),
          detail.getFile()
        ];
      }
    };
  }


}
