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
  selector: 'gateway-detail-dialog',
  templateUrl: './gateway-detail-dialog.component.html',
  styleUrls: ['./gateway-detail-dialog.component.scss']
})
export class GatewayDetailDialogComponent implements OnInit {
    
    
    gateWayDetail: Gateway;

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
    
    gatewayForm: FormGroup ;
    constructor(
        
        public dialogRef: MatDialogRef<GatewayDetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: FormBuilder,
        private gatewayService: GatewayService,        
        protected _dialog: MatDialog,

    ) {
        this.gateWayDetail = data.gateway;
        console.log({ppp: this.gateWayDetail});
        
        this.gatewayForm = this.createGatewayForm();
    }

    ngOnInit() {
        this.gatewayForm.disable();
    }

    public createGatewayForm(): FormGroup {
        return this._formBuilder.group({
            Name: [this.gateWayDetail.name, Validators.required],
            Serial: [this.gateWayDetail.serial, Validators.required],
            IpAddressd: [this.gateWayDetail.ipv4_addressd, Validators.required],            
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
        this.loadingButtonOptions.active = true;        
    }

    enabledForm(): void {

        this.gatewayForm.enable();
        this.loadingButtonOptions.active = false;        
    }


}
