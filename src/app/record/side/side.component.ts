import {Component, OnInit} from '@angular/core';
import {RecordService} from '../record.service';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {SideTreeFlatNode} from './side-tree-flat-node';
import {SideNode} from './side-node';
import {RecordDetail} from '../record-detail';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {
  treeControl = new FlatTreeControl<SideTreeFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private record: RecordService
  ) {
    this.dataSource.data = this.detailToNodeRecursive(record.tree, '');
  }

  private detailToNodeRecursive(details: RecordDetail[], path: string): SideNode[] {
    return details.map(detail => {
      const hasChildren = (detail.children?.length ?? 0) > 0;
      const newPath = this.getUrlPath(path);

      if (hasChildren && detail.children) {
        return {
          name: detail.title,
          href: '',
          children: this.detailToNodeRecursive(detail.children, newPath + detail.fileName)
        };
      }

      return {
        name: detail.title,
        href: newPath + detail.fileName,
      };
    });
  }

  private getUrlPath(path: string): string{
    return path ? path + '/' : '';
  }

  ngOnInit(): void {
    // this.treeControl.expandAll();
  }


  hasChild = (_: number, node: SideTreeFlatNode) => node.expandable;

  private transformer(node: SideNode, level: number): any {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      href: node.href,
      level,
    };
  }
}
