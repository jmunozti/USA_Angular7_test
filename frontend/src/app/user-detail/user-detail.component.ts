import {
	Component,
	OnInit
} from '@angular/core';

import {
	ActivatedRoute,
	Router
} from '@angular/router';
import {
	ApiService
} from '../api.service';
import {
	User
} from '../user';

@Component({
	selector: 'app-user-detail',
	templateUrl: './user-detail.component.html',
	styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

	user: User = {
		id: '',
		name: '',
		lastName: '',
		age: null,
		active: null
	};
	isLoadingResults = true;

	constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {}

	ngOnInit() {
		this.getUserDetails(this.route.snapshot.params['id']);
	}

	getUserDetails(id) {
		this.api.getUser(id)
			.subscribe(data => {
				this.user = data;
				console.log(this.user);
				this.isLoadingResults = false;
			});
	}

	deleteUser(id) {
		this.isLoadingResults = true;
		this.api.deleteUser(id)
			.subscribe(res => {
				this.isLoadingResults = false;
				this.router.navigate(['/user']);
			}, (err) => {
				console.log(err);
				this.isLoadingResults = false;
			});
	}

}