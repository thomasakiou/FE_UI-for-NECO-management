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
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss'
})
export class CandidatesComponent implements OnInit{
  number: string | undefined;


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


  candidates = [
    { id: 1, regNo: '567389865AD', name: 'John Doe', state: 'Niger', dob: '26/07/1992', gender: 'M', school: 'GGSC Bida', certNo: '767887', status: 'active' },
    { id: 2, regNo: '978658332HG', name: 'Peter Bat Evans', state: 'Bayelsa', dob: '04/04/2000', gender: 'M', school: 'Police station', certNo: '908761', status: 'active' },
    { id: 3, regNo: '29845617FG', name: 'Jane Doe', state: 'FCT', dob: '13/05/1982', gender: 'F', school: 'GSS Maitumbi', certNo: '678543', status: 'active' },
    { id: 4, regNo: '98075678FG', name: 'Anthony Joshua', state: 'Kaduna', dob: '27/07/2001', gender: 'M', school: 'Bosso College', certNo: '908745', status: 'active' },
    { id: 5, regNo: '98653234GH', name: 'Nathan S. Danny', state: 'Kano', dob: '09/09/2011', gender: 'M', school: 'CSS Minna', certNo: '234561', status: 'active' },
    { id: 6, regNo: '12345678GH', name: 'Bosso Bida', state: 'Kogi', dob: '10/10/2012', gender: 'M', school: 'Ebidou College', certNo: '012345', status: 'active' }
  ];
}
