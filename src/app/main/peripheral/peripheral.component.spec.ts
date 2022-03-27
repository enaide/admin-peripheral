import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
    waitForAsync,
} from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { GatewayService } from "../services/gateway.service";
import { Gateway } from "../models/gateways";
import { PeripheralComponent } from "./peripheral.component";
import { BehaviorSubject, Observable, of } from "rxjs";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormBuilder } from "@angular/forms";

describe("PeripheralComponent", () => {
    let component: PeripheralComponent;
    let fixture: ComponentFixture<PeripheralComponent>;
    let devices = {
        code: 200,
        body: [
            {
                ipv4_addressd: "10.1.1.1",
                name: "Cisco Catalyst",
                serial: "C921-4PLTEAS",
                devices: {
                    items: [],
                },
            },
            {
                ipv4_addressd: "10.5.5.5",
                name: "Cisco",
                serial: "ISR4451-X/K9",
                devices: {
                    items: [],
                },
            },
        ],
    };
    const gatewayServiceStub = {
        getData(): Observable<any> {
            return of(devices);
        },
    };
    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [PeripheralComponent],
            imports: [
                BrowserAnimationsModule,
                MatDialogModule,
                HttpClientModule,
            ],
            providers: [
                MatDialog,
                { provide: GatewayService, useValue: gatewayServiceStub },
                { provide: FormBuilder, useValue: formBuilder },
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(PeripheralComponent);
        component = fixture.componentInstance;
    });

    describe("ngOnInit", () => {
        it("makes expected calls", () => {
            spyOn(component, "init_table").and.callThrough();
            component.ngOnInit();
            expect(component.init_table).toHaveBeenCalled();
        });
    });

    describe("init_table", () => {
        it("makes expected calls", () => {
            const gatewayServiceStub: GatewayService =
                fixture.debugElement.injector.get(GatewayService);
            spyOn(gatewayServiceStub, "getData").and.callThrough();
            component.init_table();
            expect(gatewayServiceStub.getData).toHaveBeenCalled();
        });
    });

    it("can load instance", () => {
        expect(component).toBeTruthy();
    });

    it(`displayedColumns has default value`, () => {
        expect(component.displayedColumns).toEqual([
            `serial`,
            `name`,
            `ipv4_addressd`,
            `count`,
            `Ficha`,
        ]);
    });

    it(`gateways has default value`, () => {
        expect(component.gateways).toEqual([]);
    });

    it(`isLoadingResults has default value`, () => {
        expect(component.isLoadingResults).toEqual(true);
    });

    it(`resultsLength has default value`, () => {
        expect(component.resultsLength).toEqual(0);
    });

    describe("addGateway", () => {
        it("makes expected calls", () => {
            const matDialogStub: MatDialog = fixture.debugElement.injector.get(MatDialog);
            expect(matDialogStub).toBeTruthy();
            
            // spyOn(matDialogStub, "open").and.callThrough();
            // component.addGateway();
            // expect(matDialogStub.open).toHaveBeenCalled();
        });
    });

    it("getData expected calls", fakeAsync(() => {
        const gatewayServiceStub =
            fixture.debugElement.injector.get(GatewayService);
        spyOn(gatewayServiceStub, "getData").and.returnValue(of(devices));
        fixture.detectChanges();
        tick();
        expect(component.resultsLength).toEqual(2);
    }));
});
