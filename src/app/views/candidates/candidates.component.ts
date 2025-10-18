import {Component, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {DatePicker} from 'primeng/datepicker';
import {Dialog} from 'primeng/dialog';
import {IconField} from 'primeng/iconfield';
import {InputGroup} from 'primeng/inputgroup';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {ConfirmationService, MessageService, PrimeTemplate} from 'primeng/api';
import {Select} from 'primeng/select';
import {TableModule} from 'primeng/table';
import {Textarea} from 'primeng/textarea';
import {Toast} from 'primeng/toast';
import {Toolbar} from 'primeng/toolbar';
import {FormsModule} from '@angular/forms';
import * as XLSX from 'xlsx';
import {NgForOf} from '@angular/common';

export interface Candidate {
  id: number;
  SCHNUM: string;
  REG_NO: string;
  CAND_NAME: string;
  S_OF_ONAME?: string;
  LGA_NAME?: string;
  sex?: string;
  D_OF_B?: string;
  // status?: string;
  subjects: string[];
}

interface Cand {
  name: string;
}

@Component({
  selector: 'app-candidates',
  imports: [
    Button,
    DatePicker,
    Dialog,
    IconField,
    InputGroup,
    InputIcon,
    InputText,
    PrimeTemplate,
    Select,
    TableModule,
    Textarea,
    Toast,
    Toolbar,
    FormsModule,
    Toolbar,
    ConfirmDialog,
    NgForOf,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss'
})
export class CandidatesComponent implements OnInit{
  number: string | undefined;
  candidates: any[] = [];
  maxSubjects = 0;


  exams: Cand[] | undefined;

  selectedExam: Cand | undefined;

  ngOnInit() {
    this.exams = [
      { name: 'SSCE Int' },
      { name: 'SSCE Ext' },
      { name: 'NCEE' },
      { name: 'BECE'},
    ];
  }

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

  confirm1(event: Event) {
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


  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, { defval: '' });

      this.candidates = data.map((row: any, index: number) => {
        //Find all columns starting with "REG_" but not "REG_NO"
        const subjectFields = Object.keys(row)
          .map(key => key.trim())
          .filter(key => key.toUpperCase().startsWith('REG_') && key.toUpperCase() !== 'REG_NO');

        const subjects: string[] = subjectFields
          .map(key => {
            const val = row[key];
            // Only add subject if it has a value
            return val ? key.substring(4) : '';  // strip 'REG_'
          })
          .filter(subject => subject !== '');

        // Track the largest subject count
        if (subjects.length > this.maxSubjects) {
          this.maxSubjects = subjects.length;
        }

        return {
          id: index + 1,
          SCHNUM: row['SCHNUM'] || '',
          REG_NO: row['REG_NO'] || '',
          CAND_NAME: row['CAND_NAME'] || '',
          S_OF_ONAME: row['S_OF_ONAME'] || '',
          LGA_NAME: row['LGA_NAME'] || '',
          SEX: row['SEX'] || '',
          D_OF_B: row['D_OF_B'] || '',
          subjects
        };
      });

      console.log('Parsed candidates:', this.candidates);
    };

    reader.readAsBinaryString(target.files[0]);
    // reader.readAsText(target.files[0]);
  }
}
