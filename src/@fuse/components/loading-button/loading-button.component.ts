import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss']
})
export class LoadingButtonComponent implements OnInit {

    @Input()
    options: any = {
        active: false,
        text: '',        
        spinnerSize: 18,
        raised: true,
        buttonColor: 'accent',
        spinnerColor: 'primary',
        fullWidth: false,
        disabled: false,
        extraClass: '',        
        mode: 'indeterminate'
    };

    @Output()
    clickButton: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {}

    clicked($event) {            
        this.clickButton.emit(true);
    }

    ngOnInit() {
    }

}
