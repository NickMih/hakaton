export interface IStatistic {
  name: string | number;
  value: number;
}

export interface IDefaultResponse<T> {
  results: Array<T>;
  count: number;
}
