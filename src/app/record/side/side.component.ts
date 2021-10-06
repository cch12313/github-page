import {Component, OnInit} from '@angular/core';
import {RecordService} from '../record.service';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {SideTreeFlatNode} from './side-tree-flat-node';
import {SideNode} from './side-node';

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
  }

  records = this.record.tree;

  ngOnInit(): void {
    this.treeControl.expandAll();
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
