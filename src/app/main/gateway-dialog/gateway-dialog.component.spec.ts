import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import {
    MatDialogModule,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { GatewayService } from "../services/gateway.service";
import { GatewayDialogComponent } from "./gateway-dialog.component";
import {
    BrowserAnimationsModule,
    NoopAnimationsModule,
} from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";

describe("GatewayDialogComponent", () => {
    let component: GatewayDialogComponent;
    let fixture: ComponentFixture<GatewayDialogComponent>;
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(() => {
        const matDialogRefStub = () => ({ close: (arg) => ({}) });
        const matDialogStub = () => ({});
        const gatewayServiceStub = () => ({
            register: (gateWay) => ({
                pipe: () => ({ subscribe: (f) => f({}) }),
            }),
        });

        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [GatewayDialogComponent],
            imports: [MatDialogModule, ReactiveFormsModule, FormsModule],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: FormBuilder, useValue: formBuilder },
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useFactory: matDialogRefStub },
                { provide: MatDialog, useFactory: matDialogStub },
                { provide: GatewayService, useFactory: gatewayServiceStub },
            ],
        });

        fixture = TestBed.createComponent(GatewayDialogComponent);
        component = fixture.componentInstance;
    });

    it("can load instance", () => {
        expect(component).toBeTruthy();
    });

    it('should make the name control required', () => {
        let controlName = component.Name;
        let controlSerial = component.Serial;
        let controlIpAddressd = component.IpAddressd;
        
        controlName.setValue('');
        controlSerial.setValue('');
        controlIpAddressd.setValue('');
        
        expect(controlName.valid).toBeFalsy()
        expect(controlSerial.valid).toBeFalsy()
        expect(controlIpAddressd.valid).toBeFalsy()
    })
});
