import { Component, OnInit } from '@angular/core';
import {costs, importExport, weights} from "./filders.data";

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  importExport = importExport;
  weights = weights;
  costs = costs;
  constructor() { }

  ngOnInit(): void {
  }

}
