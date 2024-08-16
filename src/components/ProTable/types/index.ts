export type ColumnItem = {
  id: string | number;
  prop: string;
  label: string;
  width?: number;
  isShowColumn?: boolean;
  type: string;
  fixed?: "left" | "right";
  sortable?: boolean;
};
