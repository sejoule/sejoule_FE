"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var DialogPopupColorComponent = /** @class */ (function () {
    function DialogPopupColorComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.gridHues = [
            '50',
            '100',
            '200',
            '300',
            '400',
            '500',
            '600',
            '700',
            '800',
            '900',
            'A100',
            'A200',
            'A400',
            'A700'
        ];
    }
    DialogPopupColorComponent = __decorate([
        core_1.Component({
            selector: 'app-colors-dialog-popup',
            template: "\n    <h1 mat-dialog-title>{{ data }}</h1>\n    <mat-dialog-content>\n      <mat-list>\n        <mat-list-item *ngFor=\"let hue of gridHues\"\n          [ngClass]=\"'portal-' + data + '-' + hue\">\n          <h3>{{ hue }}</h3>\n        </mat-list-item>\n      </mat-list>\n    </mat-dialog-content>\n    <div mat-dialog-actions>\n      <button mat-button mat-dialog-close i18n>Close</button>\n    </div>\n  ",
            styles: ["\n    .mat-dialog-content {\n      padding: 0;\n    }\n  "]
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], DialogPopupColorComponent);
    return DialogPopupColorComponent;
}());
exports.DialogPopupColorComponent = DialogPopupColorComponent;
var ColorsExampleComponent = /** @class */ (function () {
    function ColorsExampleComponent(dialog) {
        this.dialog = dialog;
        this.gridColors = [
            'red',
            'pink',
            'purple',
            'deep-purple',
            'indigo',
            'blue',
            'light-blue',
            'cyan',
            'teal',
            'green',
            'light-green',
            'lime',
            'yellow',
            'amber',
            'orange',
            'deep-orange',
            'brown',
            'grey',
            'blue-grey',
            'white'
        ];
    }
    ColorsExampleComponent.prototype.openDialog = function (color) {
        var dialogRef = this.dialog.open(DialogPopupColorComponent, {
            width: '400px',
            data: color
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
        });
    };
    ColorsExampleComponent = __decorate([
        core_1.Component({
            selector: 'colors-example',
            templateUrl: './colors-example.component.html',
            styleUrls: ['./colors-example.component.scss']
        }),
        __metadata("design:paramtypes", [material_1.MatDialog])
    ], ColorsExampleComponent);
    return ColorsExampleComponent;
}());
exports.ColorsExampleComponent = ColorsExampleComponent;
//# sourceMappingURL=colors-example.component.js.map