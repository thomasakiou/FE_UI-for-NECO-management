import {Component, OnInit} from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardGroupComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent
} from '@coreui/angular';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {first} from 'rxjs';
import {FormBuilder, FormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {AuthService} from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [RowComponent, ColComponent,
    FormDirective, InputGroupComponent,
    InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, FormsModule, NgStyle, CardBodyComponent, CardComponent, CardGroupComponent, ContainerComponent]
})
export class LoginComponent implements OnInit {
  // loginForm!: FormGroup;
  // loading = false;
  // submitted = false;
  returnUrl: string = '/dashboard';
  error = '';
  // convenience getter for easy access to form fields
  // fieldTypePassword: boolean = true;
  email = '';
  password = '';


  // console.log('Payload sent to API:', payload);

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private dataService: DataService,
    private authenticationService: AuthService) {}


  onLogin() {
    this.authenticationService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        // Save token in localStorage/sessionStorage
        // localStorage.setItem('token', res.token);
        this.dataService.setToken(res['token']);
        // Navigate to dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert('Login failed! Check username/password');
        console.error(err);
      },
    });
  }

  ngOnInit() {
    // this.loginForm = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required]
    // });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    // LoginComponent.router = this.router;

    if (!this.authenticationService.tokenExpired()) {
      return this.redirectLogin();
    }
  }

  // get f() {
  //   return this.loginForm.controls;
  // }
  //
  // onSubmit() {
  //   this.submitted = true;
  //   // stop here if form is invalid
  //   if (this.loginForm.invalid) {
  //     return;
  //   }
  //   this.loading = true;
  //   this.authenticationService.login(this.f['username'].value, this.f['password'].value)
  //     .pipe(first())
  //     .subscribe({
  //       next: () => {
  //         this.loading = false;
  //         this.redirectLogin();
  //       },
  //       error: err => {
  //         if (err.hasOwnProperty('message')) {
  //           this.error = 'Invalid username/email and/or password!';
  //         }
  //         this.loading = false;
  //       },
  //       complete: () => this.loading = false
  //     });
  // }


  private redirectLogin(): void {
    this.router.navigate([this.returnUrl]).then(() => {
    }, res => {
      if (!res) {
        console.log('n' +
          'login nav fails, retrying...');
        this.redirectLogin();
      }
    });
  }
}

