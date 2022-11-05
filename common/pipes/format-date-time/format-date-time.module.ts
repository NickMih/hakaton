import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatDateTimePipe } from './format-date-time.pipe';


@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        FormatDateTimePipe
    ],
    declarations: [FormatDateTimePipe]
})
export class FormatDateTimeModule {
}
