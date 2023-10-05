import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  NgForm,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {fuseAnimations} from '@fuse/animations';
import {FuseAlertType} from '@fuse/components/alert';
import {AuthService} from 'app/core/auth/auth.service';
import {catchError, Subject, takeUntil, tap, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../../core/user/user.service';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit, OnDestroy {
  @ViewChild('signInNgForm') signInNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  signInForm: UntypedFormGroup;
  showAlert: boolean = false;
  activateRealLogin: boolean = false;
  reportingUnits: any = null;
  private loginSubject = new Subject();

  constructor(
      private _activatedRoute: ActivatedRoute,
      private authService: AuthService,
      private userService: UserService,
      private _formBuilder: UntypedFormBuilder,
      private _router: Router,
  ) {
  }

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      username: ['JAYCHANDRA', [Validators.required]],
      password: ['Green@1981', Validators.required],
      reportingUnit: [null],
      rememberMe: [''],
    });
  }

  signIn(): void {
    if (this.signInForm.invalid) {
      return;
    }
    this.signInForm.disable();
    this.showAlert = false;

    this.authService.reportingUnits(this.signInForm.value).pipe(
        tap((apiResponse) => {
          this.signInForm.enable();
          this.activateRealLogin = apiResponse.success;
          this.reportingUnits = apiResponse.data;
        }),
        catchError((error: HttpErrorResponse) => {
          this.signInForm.enable();
          this.alert = {
            type: 'error',
            message: 'Wrong email or password',
          };
          this.showAlert = true;
          return throwError(() => error);
        }),
        takeUntil(this.loginSubject),
    ).subscribe();
  }

  signInWithReportUnit(): void {
    if (this.signInForm.invalid) {
      return;
    }

    if (this.signInForm.controls.reportingUnit.value == null) {
      this.showAlert = true;
      this.alert = {
        type: 'error',
        message: 'Please select reporting unit',
      };
      return;
    }
    this.signInForm.disable();
    this.showAlert = false;

    this.authService.signInWithReportUnit(this.signInForm.value).pipe(
        tap((apiResponse) => {
          this.userService.setUserWithParams(apiResponse.data);
          const redirectURL = this._activatedRoute.snapshot.queryParamMap.get(
              'redirectURL') || '/signed-in-redirect';
          this._router.navigateByUrl(redirectURL);
        }),
        catchError((error: HttpErrorResponse) => {
          this.signInForm.enable();
          this.alert = {
            type: 'error',
            message: 'Wrong email or password',
          };
          this.showAlert = true;
          return throwError(() => error);
        }),
        takeUntil(this.loginSubject),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.loginSubject.next(null);
    this.loginSubject.complete();
  }
}
