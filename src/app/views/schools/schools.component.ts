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
// import { DropdownModule } from 'primeng/dropdown';
import {Dialog, DialogModule} from 'primeng/dialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {InputGroup} from 'primeng/inputgroup';
import * as XLSX from 'xlsx';
import {School} from '../models/school.models'
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
    IconFieldModule, InputIconModule, ButtonModule, Dialog, ConfirmDialog, InputGroup],
  providers: [ConfirmationService, MessageService],
  templateUrl: './schools.component.html',
  styleUrl: './schools.component.scss'
})
export class SchoolsComponent implements OnInit{
  number: string | undefined;
  schools: School[] = [];
  visible: boolean = false;
  exams: Exm[] | undefined;
  selectedExam: Exm | undefined;

  selectedSchool: School = {
    id: 0,
    SCHNUM: '',
    STATE_NAME: '',
    SCH_NAME: '',
    CUST_CODE: '',
    CUSTODIAN: '',
    TOWN: '',
    ACCD_YEAR: ''
  };

  states = [
    { name: 'Abia' }, { name: 'Adamawa' }, { name: 'Akwa Ibom' }, { name: 'Anambra' },
    { name: 'Bauchi' }, { name: 'Bayelsa' }, { name: 'Benue' }, { name: 'Borno' },
    { name: 'Cross River' }, { name: 'Delta' }, { name: 'Ebonyi' }, { name: 'Edo' },
    { name: 'Ekiti' }, { name: 'Enugu' }, { name: 'FCT' }, { name: 'Gombe' },
    { name: 'Imo' }, { name: 'Jigawa' }, { name: 'Kaduna' }, { name: 'Kano' },
    { name: 'Katsina' }, { name: 'Kebbi' }, { name: 'Kogi' }, { name: 'Kwara' },
    { name: 'Lagos' }, { name: 'Nasarawa' }, { name: 'Niger' }, { name: 'Ogun' },
    { name: 'Ondo' }, { name: 'Osun' }, { name: 'Oyo' }, { name: 'Plateau' },
    { name: 'Rivers' }, { name: 'Sokoto' }, { name: 'Taraba' }, { name: 'Yobe' },
    { name: 'Zamfara' }
  ];

  showDialog() {
    this.visible = true;
  }


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


  // Open modal to EDIT a school
  editSchool(school: any) {
    // this.visible = true;
    this.selectedSchool = { ...school };

    // Make sure STATE_NAME matches the states array value
    // e.g. if backend returns lowercase, fix it:
    const match = this.states.find(s => s.name.toLowerCase() === this.selectedSchool.STATE_NAME.toLowerCase());
    if (match) {
      this.selectedSchool.STATE_NAME = match.name;
    } else {
      this.selectedSchool.STATE_NAME = ''; // fallback if no match
    }

    this.visible = true;
  }


  // Save updated or new record
  saveSchool() {
    if (this.selectedSchool.id) {
      // update existing
      const index = this.schools.findIndex(s => s.id === this.selectedSchool.id);
      if (index !== -1) {
        this.schools[index] = { ...this.selectedSchool };
      }
    } else {
      // add new
      const newId = this.schools.length ? Math.max(...this.schools.map(s => s.id)) + 1 : 1;
      this.selectedSchool.id = newId;
      this.schools.push({ ...this.selectedSchool });
    }

    this.visible = false;
    this.resetForm();
  }


  resetForm() {
    this.selectedSchool = {
      id: 0,
      SCHNUM: '',
      SCH_NAME: '',
      STATE_NAME: '',
      TOWN: '',
      CUST_CODE: '',
      CUSTODIAN: '',
      ACCD_YEAR: ''
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


  // Handle file import
  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);

    if (target.files.length !== 1) {
      console.error('Cannot use multiple files');
      return;
    }

    const file = target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);

      // Transform your data into School interface
      this.schools = (data as any[]).map((row: any, index: number) => ({
        id: index + 1,
        SCHNUM: row['SCHNUM'] || '',
        STATE_NAME: row['STATE_NAME'] || '',
        SCH_NAME: row['SCH_NAME'] || '',
        CUST_CODE: row['CUST_CODE'] || '',
        CUSTODIAN: row['CUSTODIAN'] || '',
        TOWN: row['TOWN'] || '',
        ACCD_YEAR: row['ACCD_YEAR'] || '',
        // accrYr: row['Accr. Year'] || '',
        // status: row['Status'] || ''
      }));

      event.target.value = null;

      console.log('Imported Data:', this.schools);
    };

    reader.readAsBinaryString(file);
  }

}
