import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit{
  constructor(private dataStore: DataService,
              private router: Router) {
  }

  ngOnInit() {
    this.dataStore.logout();
    this.router.navigate(['/login']);
  }
}
