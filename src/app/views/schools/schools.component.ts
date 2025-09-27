import {Component, OnInit} from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DropdownModule } from '@coreui/angular';
import {Dialog, DialogModule} from 'primeng/dialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {IftaLabel} from 'primeng/iftalabel';
import {FloatLabel} from 'primeng/floatlabel';
import {DatePicker} from 'primeng/datepicker';
// import {FloatLabel} from 'primeng/floatlabel';


interface Exm {
  name: string;
}

@Component({
  selector: 'app-schools',
  imports: [TableModule, SelectModule, ToastModule, ToolbarModule,
    InputTextModule, TextareaModule, CommonModule, DropdownModule,
    InputTextModule, FormsModule, InputIconModule, DialogModule,
    IconFieldModule, InputIconModule, ButtonModule, Dialog, ConfirmDialog, InputGroup, DatePicker],
  providers: [ConfirmationService, MessageService],
  templateUrl: './schools.component.html',
  styleUrl: './schools.component.scss'
})
export class SchoolsComponent implements OnInit{
  number: string | undefined;


  exams: Exm[] | undefined;

  selectedExam: Exm | undefined;

  ngOnInit() {
    this.exams = [
      { name: 'SSCE Int' },
      { name: 'SSCE Ext' },
      { name: 'NCEE' },
      { name: 'BECE'},
    ];
  }

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle custom-icon',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }


  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }


  schools = [
    { id: 1, schNo: '021985', name: 'GSS Minna', state: 'Niger', lga: 'Chchanga', zone: 'SW', address: '19 tunga', custodian: 'Police station', accrYr: '2021', status: 'active' },
    { id: 2, schNo: '032456', name: 'CSS Yenagos', state: 'Bayelsa', lga: 'Yenagoa', zone: 'SW', address: '19 tunga', custodian: 'Police station', accrYr: '2021', status: 'active' },
    { id: 3, schNo: '031867', name: 'FGC Kuta', state: 'FCT', lga: 'Abaji', zone: 'SW', address: '19 tunga', custodian: 'Police station', accrYr: '2021', status: 'active' },
    { id: 4, schNo: '025674', name: 'RHS Minna', state: 'Kaduna', lga: 'Bosso', zone: 'SW', address: '19 tunga', custodian: 'Police station', accrYr: '2021', status: 'active' },
    { id: 5, schNo: '001654', name: 'GSS Bida', state: 'Kano', lga: 'Kuda', zone: 'SW', address: '19 tunga', custodian: 'Police station', accrYr: '2021', status: 'active' },
    { id: 6, schNo: '010764', name: 'GGSC Bosso', state: 'Kogi', lga: 'Okene', zone: 'SW', address: '19 tunga', custodian: 'Police station', accrYr: '2021', status: 'active' }
  ];

}
