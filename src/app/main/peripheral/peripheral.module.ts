import { TableDetailComponent } from '../gateway-detail-dialog/components/table-detail/table-detail.component';
import { GatewayDetailDialogComponent } from '../gateway-detail-dialog/gateway-detail-dialog.component';
import { DeviceDialogComponent } from '../device-dialog/device-dialog.component';
import { GatewayDialogComponent } from '../gateway-dialog/gateway-dialog.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';

import { PeripheralComponent } from './peripheral.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';


const routes = [
    {
        path     : 'main',
        component: PeripheralComponent
    }
];

@NgModule({
    declarations: [
        PeripheralComponent,
        GatewayDialogComponent,
        GatewayDetailDialogComponent,
        DeviceDialogComponent,
        TableDetailComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,
        
        MatChipsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,        
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatToolbarModule,
        MatTooltipModule,
        MatDividerModule,                
        MatDatepickerModule,    
        MatCheckboxModule,
    ],
    exports     : [
        PeripheralComponent
    ],
    entryComponents: [
        GatewayDialogComponent,
        DeviceDialogComponent,
        GatewayDetailDialogComponent
    ],
})

export class PeripheralModule
{
}
