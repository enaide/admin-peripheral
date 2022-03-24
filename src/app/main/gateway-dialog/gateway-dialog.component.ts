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
  selector: 'gateway-dialog',
  templateUrl: './gateway-dialog.component.html',
  styleUrls: ['./gateway-dialog.component.scss']
})
export class GatewayDialogComponent implements OnInit {
    
    gatewayForm: FormGroup ;

    isLoading = false;
    options: any = {
        active: false,
        spinnerSize: 18,
        raised: true,
        buttonColor: 'accent',
        spinnerColor: 'primary',
        fullWidth: true,
        text: 'save',
        disabled: true,
        mode: 'indeterminate'
    };
    
    constructor(
        
        public dialogRef: MatDialogRef<GatewayDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: FormBuilder,
        private gatewayService: GatewayService,        
        protected _dialog: MatDialog,

    ) {
        this.gatewayForm = this.createGatewayForm();
        const self = this;
        this.gatewayForm.valueChanges.subscribe(newValues => {            
            self.options.disabled = !self.gatewayForm.valid;           
        });
    }

    ngOnInit() {}

    public createGatewayForm(): FormGroup {
        return this._formBuilder.group({
            Name: ['', Validators.required],
            Serial: ['', Validators.required],
            IpAddressd: ['', Validators.required],            
        });         
    }

    get Name() {
        return this.gatewayForm.get('Name');
    }

    get Serial() {
        return this.gatewayForm.get('Serial');
    }

    get IpAddressd() {
        return this.gatewayForm.get('IpAddressd');
    }

    disabledForm(): void {

        this.gatewayForm.disable();
        this.options.active = true;        
    }

    enabledForm(): void {

        this.gatewayForm.enable();
        this.options.active = false;        
    }

    save() {

        Util.markFormGroupTouched(this.gatewayForm);
        
        if (!this.gatewayForm.valid) {
            return;
        }else {
            
            this.disabledForm();                                      
            const gateWay: Gateway = {                
                serial: this.Serial.value,
                name: this.Name.value,
                ipv4_addressd: this.IpAddressd.value                
            };
            
            this.gatewayService.register(gateWay)
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
