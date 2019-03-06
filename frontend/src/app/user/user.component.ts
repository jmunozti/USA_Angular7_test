import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  displayedColumns: string[] = ['name', 'lastname', 'age', 'active'];
  data: User[] = [];
  isLoadingResults = true;

 constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getUsers()
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
