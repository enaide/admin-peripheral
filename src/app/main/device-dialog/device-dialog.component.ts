import { Util } from './../utils/utils';
import {Component, Inject, OnInit, OnDestroy, EventEmitter, Output, AfterViewInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment/min/moment.min.js';
import 'moment/locale/es';
import { isNullOrUndefined } from 'util';

import {MatDialog} from '@angular/material/dialog';
import { GatewayService } from '../services/gateway.service';
import { Gateway } from '../models/gateways';


@Component({
  selector: 'device-dialog',
  templateUrl: './device-dialog.component.html',
  styleUrls: ['./device-dialog.component.scss']
})
export class DeviceDialogComponent implements OnInit {
    
    deviceForm: FormGroup ;
    selected = 'online';

    isLoading = false;
    loadingButtonOptions: any = {
        active: false,
        spinnerSize: 18,
        raised: true,
        buttonColor: 'accent',
        spinnerColor: 'primary',
        fullWidth: true,

        disabled: true,
        mode: 'indeterminate'
    };
    
    constructor(
        
        public dialogRef: MatDialogRef<DeviceDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: FormBuilder,
        private gatewayService: GatewayService,        
        protected _dialog: MatDialog,

    ) {
        this.deviceForm = this.createDeviceForm();
    }

    ngOnInit() {
        
    }

    public createDeviceForm(): FormGroup {
        return this._formBuilder.group({
            uid: ['', Validators.required],
            vendor: ['', Validators.required],
            date: ['', Validators.required],            
            status: ['', Validators.required],                                   
        });         
    }

    get UID() {
        return this.deviceForm.get('uid');
    }

    get Vendor() {
        return this.deviceForm.get('vendor');
    }
    
    get Status() {
        return this.deviceForm.get('status');
    }

    get Date() {
        return this.deviceForm.get('date');
    }

    disabledForm(): void {
        this.deviceForm.disable();
        this.loadingButtonOptions.active = true;        
    }

    enabledForm(): void {
        this.deviceForm.enable();
        this.loadingButtonOptions.active = false;        
    }

    save() {
        
        Util.markFormGroupTouched(this.deviceForm);
        if (!this.deviceForm.valid) {
            return;
        }else{
            
            this.disabledForm();                                      
            const device = {                
                uid: this.UID.value,
                vendor: this.Vendor.value,
                status: this.selected,
                date: this.Date.value.format('DD/MM/YYYY HH:mm') ,
                periphId: this.data.periphId               
            };
            console.log(device);

            this.gatewayService.registerDevice(device)
            .pipe(
                catchError(err => {
                    this.enabledForm();            
                    this.dialogRef.close(false);
                    return of({error: err});
                })
            )
            .subscribe((response: any) => {                
                
                switch (+response.code) {
                    case 200:
                        this.enabledForm();                                                                
                        this.dialogRef.close(true);                                                
                        if(this.data.reloadTable) {
                            this.data.reloadTable() 
                        } 
                        
                        break;
                    default:
                        console.log({erros: response});
                        this.enabledForm();
                        
                        break;
                }
            });
        }

    }

}
