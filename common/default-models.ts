import {dateToString} from "./utils";

export class PaginatorOption {
  length: number = 0;
  limit: number = 20;
  offset: number = 0;

  constructor(limit?: number) {
    if (limit) {
      this.limit = limit;
    }
  }
}
export class DefaultParams {
  [key: string]: any;
  search = null;
  mergedParams: any;

  constructor(
    public ordering?: string,
    public paginationOption?: PaginatorOption,
    public expand?: string[],
    private _additional?: Object
  ) {
    if (_additional) {
      Object.assign(this, _additional);
    }
  }

  getParams() {
    this.prepareParams();
    const params = { ...this, ...this.paginationOption };
    delete params.mergedParams;
    delete params.paginationOption;
    delete params.length;
    delete params._additional;

    return params;
  }

  prepareParams() {
    Object.keys(this).forEach((key) => {
      if (this[key]) {
        if (this[key] instanceof Date) {
          this[key] = dateToString(this[key]);
        }
      } else {
        delete this[key];
      }
    });
  }

  resetParams() {
    this.search = null;
    delete this.mergedParams;
    if (this._additional) {
      Object.assign(this, this._additional);
    }
  }
}
export interface IOption {
  name: string;
  value: number;
}
