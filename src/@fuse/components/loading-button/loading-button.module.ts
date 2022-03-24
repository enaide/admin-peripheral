import { NgModule } from '@angular/core';
import { LoadingButtonComponent } from './loading-button.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        LoadingButtonComponent
    ],
    imports: [
        MatButtonModule,
        MatProgressSpinnerModule,
        CommonModule
    ],
    exports: [
        LoadingButtonComponent
    ],
})
export class LoadingButtonModule
{
}
