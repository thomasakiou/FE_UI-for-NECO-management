import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.models';
import {ConfirmationService, MessageService, PrimeTemplate} from 'primeng/api';
import * as XLSX from 'xlsx';
import {Button} from 'primeng/button';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Dialog} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {IconField} from 'primeng/iconfield';
import {InputGroup} from 'primeng/inputgroup';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {TableModule} from 'primeng/table';
import {Toast} from 'primeng/toast';
import {Toolbar} from 'primeng/toolbar';

@Component({
  selector: 'app-roles',
  imports: [
    Button,
    ConfirmDialog,
    Dialog,
    FormsModule,
    IconField,
    InputGroup,
    InputIcon,
    InputText,
    PrimeTemplate,
    Select,
    TableModule,
    Toast,
    Toolbar
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent implements OnInit {
  number: string | undefined;
  users: User[] = [];
  visible: boolean = false;
  // exams: Exm[] | undefined;
  // selectedExam: Exm | undefined;

  selectedUser: User = {
    id: 0,
    USERNUM: '',
    USER_NAME: '',
    EMAIL: '',
    PHONE: '',
    ROLE: '',
    ACTIVATED: '',
    // TOWN: '',
    // ACCD_YEAR: ''
  };

  // states = [
  //   { name: 'Abia' }, { name: 'Adamawa' }, { name: 'Akwa Ibom' }, { name: 'Anambra' },
  //   { name: 'Bauchi' }, { name: 'Bayelsa' }, { name: 'Benue' }, { name: 'Borno' },
  //   { name: 'Cross River' }, { name: 'Delta' }, { name: 'Ebonyi' }, { name: 'Edo' },
  //   { name: 'Ekiti' }, { name: 'Enugu' }, { name: 'FCT' }, { name: 'Gombe' },
  //   { name: 'Imo' }, { name: 'Jigawa' }, { name: 'Kaduna' }, { name: 'Kano' },
  //   { name: 'Katsina' }, { name: 'Kebbi' }, { name: 'Kogi' }, { name: 'Kwara' },
  //   { name: 'Lagos' }, { name: 'Nasarawa' }, { name: 'Niger' }, { name: 'Ogun' },
  //   { name: 'Ondo' }, { name: 'Osun' }, { name: 'Oyo' }, { name: 'Plateau' },
  //   { name: 'Rivers' }, { name: 'Sokoto' }, { name: 'Taraba' }, { name: 'Yobe' },
  //   { name: 'Zamfara' }
  // ];

  showDialog() {
    this.visible = true;
  }


  ngOnInit() {
    // this.exams = [
    //   { name: 'SSCE Int' },
    //   { name: 'SSCE Ext' },
    //   { name: 'NCEE' },
    //   { name: 'BECE'},
    // ];
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


  // Open modal to EDIT a school
  editUser(user: any) {
    // this.visible = true;
    this.selectedUser = { ...user };

    // // Make sure STATE_NAME matches the states array value
    // // e.g. if backend returns lowercase, fix it:
    // const match = this.users.find(u => u.name.toLowerCase() === this.selectedUser.USER_NAME.toLowerCase());
    // if (match) {
    //   this.selectedSchool.USER_NAME = match.name;
    // } else {
    //   this.selectedSchool.USER_NAME = ''; // fallback if no match
    // }

    this.visible = true;
  }


  // Save updated or new record
  saveUser() {
    if (this.selectedUser.id) {
      // update existing
      const index = this.users.findIndex(s => s.id === this.selectedUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.selectedUser };
      }
    } else {
      // add new
      const newId = this.users.length ? Math.max(...this.users.map(s => s.id)) + 1 : 1;
      this.selectedUser.id = newId;
      this.users.push({ ...this.selectedUser });
    }

    this.visible = false;
    this.resetForm();
  }


  resetForm() {
    this.selectedUser = {
      id: 0,
      USERNUM: '',
      USER_NAME: '',
      EMAIL: '',
      PHONE: '',
      ROLE: '',
      ACTIVATED: '',
    };
  }

  // schools = [
  //   { id: 1, schNo: '021985', name: 'GSS Minna', state: 'Niger', lga: 'Chchanga', zone: 'SW', address: '19 tunga', custodian: 'Police station', accrYr: '2021', status: 'active' },
  //   { id: 2, schNo: '032456', name: 'CSS Yenagos', state: 'Bayelsa', lga: 'Yenagoa', zone: 'SW', address: '19 tunga', custodian: 'Police station', accrYr: '2021', status: 'active' },
  //   { id: 3, schNo: '031867', name: 'FGC Kuta', state: 'FCT', lga: 'Abaji', zone: 'SW', address: '19 tunga', custodian: 'Police station', accrYr: '2021', status: 'active' },
  //   { id: 4, schNo: '025674', name: 'RHS Minna', state: 'Kaduna', lga: 'Bosso', zone: 'SW', address: '19 tunga', custodian: 'Police station', accrYr: '2021', status: 'active' },
  //   { id: 5, schNo: '001654', name: 'GSS Bida', state: 'Kano', lga: 'Kuda', zone: 'SW', address: '19 tunga', custodian: 'Police station', accrYr: '2021', status: 'active' },
  //   { id: 6, schNo: '010764', name: 'GGSC Bosso', state: 'Kogi', lga: 'Okene', zone: 'SW', address: '19 tunga', custodian: 'Police station', accrYr: '2021', status: 'active' }
  // ];


  // // Handle file import
  // onFileChange(event: any) {
  //   const target: DataTransfer = <DataTransfer>(event.target);
  //
  //   if (target.files.length !== 1) {
  //     console.error('Cannot use multiple files');
  //     return;
  //   }
  //
  //   const file = target.files[0];
  //   const reader: FileReader = new FileReader();
  //
  //   reader.onload = (e: any) => {
  //     const bstr: string = e.target.result;
  //     const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
  //     const wsname: string = wb.SheetNames[0];
  //     const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  //     const data = XLSX.utils.sheet_to_json(ws);
  //
  //     // Transform your data into School interface
  //     this.users = (data as any[]).map((row: any, index: number) => ({
  //       id: index + 1,
  //       USERNUM: row['USERNUM'] || '',
  //       USER_NAME: row['USER_NAME'] || '',
  //       EMAIL: row['EMAIL'] || '',
  //       ROLE: row['ROLE'] || '',
  //       ACTIVATED: row['ACTIVATED'] || '',
  //       PHONE: row['PHONE'] || '',
  //       // ACCD_YEAR: row['ACCD_YEAR'] || '',
  //       // accrYr: row['Accr. Year'] || '',
  //       // status: row['Status'] || ''
  //     }));
  //
  //     event.target.value = null;
  //
  //     console.log('Imported Data:', this.users);
  //   };
  //
  //   reader.readAsBinaryString(file);
  // }

}


