import { GatewayDetailDialogComponent } from "../gateway-detail-dialog/gateway-detail-dialog.component";
import { DeviceDialogComponent } from "../device-dialog/device-dialog.component";
import { GatewayDialogComponent } from "../gateway-dialog/gateway-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { map } from "rxjs/operators";
import { GatewayService } from "../services/gateway.service";
import { Component, OnInit } from "@angular/core";
import { result } from "lodash";
import { Gateway } from "../models/gateways";
import { catchError } from "rxjs/operators";
import { of, Subscription } from "rxjs";

@Component({
    selector: "peripheral",
    templateUrl: "./peripheral.component.html",
    styleUrls: ["./peripheral.component.scss"],
})
export class PeripheralComponent implements OnInit {
    displayedColumns: string[] = [
        "serial",
        "name",
        "ipv4_addressd",
        "count",
        "Ficha",
    ];
    gateways: Array<Gateway> = [];

    isLoadingResults = true;
    resultsLength = 0;

    dialogRef: any;
    private subscriptionTables: Subscription;

    constructor(
        protected _dialog: MatDialog,
        private gatewayService: GatewayService
    ) {}

    ngOnInit(): void {
        this.init_table();
    }

    init_table() {
        this.isLoadingResults = true;
        this.gatewayService.getData().subscribe(
            (res) => {
                this.isLoadingResults = false;
                if (+res.code === 200) {
                    this.gateways = res.body.map(
                        (r) => <any>{ ...r, count: r.devices.items.length }
                    );
                    this.resultsLength = res.body.length;
                }
            },
            (err) => {
                this.isLoadingResults = false;
                return of({ error: err });
            }
        );
    }

    detailDevice(gateWay: Gateway) {
        this.dialogRef = this._dialog.open(GatewayDetailDialogComponent, {
            data: {
                gateway: gateWay,
            },
        });

        this.dialogRef.afterClosed().subscribe((result) => {
            this.init_table();
        });
    }

    addGateway() {
        this.dialogRef = this._dialog.open(GatewayDialogComponent, {
            data: {
                reloadTable: this.init_table.bind(this),
            },
        });
    }

    addDevice(periphId: string) {
        this.dialogRef = this._dialog.open(DeviceDialogComponent, {
            data: {
                periphId: periphId,
                reloadTable: this.init_table.bind(this),
            },
        });
    }

    removeGateway(periphId: string) {
        this.gatewayService.remove(periphId).subscribe(
            (res: any) => {
                if (+res.code === 200) {
                    this.init_table();
                }
            },
            (err) => {
                this.isLoadingResults = false;
                return of({ error: err });
            }
        );
    }

    onSelectGateway(gateway) {
        gateway.inProgress = true;
        this.gatewayService.remove(gateway._id).subscribe(
            (res: any) => {
                gateway.inProgress = true;
                if (+res.code === 200) {
                    this.init_table();
                }
            },
            (err) => {
                this.isLoadingResults = false;
                return of({ error: err });
            }
        );
    }
}
