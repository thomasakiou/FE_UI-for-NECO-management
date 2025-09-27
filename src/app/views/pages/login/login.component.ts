import { Component } from '@angular/core';
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
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent,
    CardComponent, CardBodyComponent, FormDirective, InputGroupComponent,
    InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle, RouterLink]
})
export class LoginComponent {}
