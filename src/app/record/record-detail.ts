export interface RecordDetail {
  title: string;
  comment: string;
  image?: string;
  fileName: string;
  children?: RecordDetail[];
}
