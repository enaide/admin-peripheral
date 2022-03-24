import { Component, OnInit, Input } from '@angular/core';
import { GatewayService } from 'app/main/services/gateway.service';

@Component({
  selector: 'table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss']
})
export class TableDetailComponent implements OnInit {

    displayedColumns: string[] = ['uid', 'vendor', 'date', 'status', 'Ficha'];
    
    loading = true;

    @Input() periphId: string;
    @Input()
    devices: Array<any> = [];
    
    resultsLength = 0;

    constructor(private gatewayService: GatewayService  ) { }

    ngOnInit() {        
        this.resultsLength = this.devices.length;
    }

    onSelectDevice(device: any): void {

        device.inProgress = true;        
        this.gatewayService.removeDevice(this.periphId, device.deviceId._id).subscribe(res=>{
            device.inProgress = false;                        
            this.devices = this.devices.filter(item =>{
                return item.deviceId._id.toString() !== device.deviceId._id.toString();
            });
        });
    }

    removeGateway(deviceId: string){
        
        this.gatewayService.removeDevice(this.periphId, deviceId).subscribe(res=>{
                        
            this.devices = this.devices.filter(item =>{
                return item.deviceId._id.toString() !== deviceId.toString();
            });
        });
    }

}
