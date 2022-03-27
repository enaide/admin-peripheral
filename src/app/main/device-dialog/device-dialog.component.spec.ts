import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { GatewayService } from "../services/gateway.service";
import { DeviceDialogComponent } from "./device-dialog.component";

describe("DeviceDialogComponent", () => {
    let component: DeviceDialogComponent;
    let fixture: ComponentFixture<DeviceDialogComponent>;
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(() => {
        const matDialogRefStub = () => ({ close: (arg) => ({}) });
        const formBuilderStub = () => ({ group: (object) => ({}) });
        const matDialogStub = () => ({});
        const gatewayServiceStub = () => ({
            registerDevice: (device) => ({
                pipe: () => ({ subscribe: (f) => f({}) }),
            }),
        });

        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [DeviceDialogComponent],
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
        fixture = TestBed.createComponent(DeviceDialogComponent);
        component = fixture.componentInstance;
    });

    it("can load instance", () => {
        expect(component).toBeTruthy();
    });

    it(`selected has default value`, () => {
        expect(component.selected).toEqual(`online`);
    });

    it(`isLoading has default value`, () => {
        expect(component.isLoading).toEqual(false);
    });
});
