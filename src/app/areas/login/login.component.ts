import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors } from '@angular/forms';
import { Alert, AlertType } from '../../shared/models/alert';

@Component({
    selector: 'app-root',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
    alerts: Alert;
    private _autenticationService: AuthenticationService;
    returnUrl: string;
    alert: Alert;
    form: FormGroup;

    constructor(fb: FormBuilder, autenticationService: AuthenticationService, private route: ActivatedRoute) {
        this._autenticationService = autenticationService;

        this.form = fb.group({
            chapa: new FormControl('', [Validators.required/*, Validators.minLength(3)*/]),
            senha: new FormControl('', [Validators.required/*, Validators.minLength(6)*/]),
           // unidade: new FormControl('', [Validators.required]),
        });
    }

    ngOnInit() {
        this._autenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    submit() {
        if (this.form.valid) {
            this._autenticationService.login(this.form.get("chapa").value, this.form.get("senha").value, this.returnUrl);
        }
    }

    get f() { return this.form.controls; }
}
