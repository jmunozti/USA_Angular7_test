import {
	Component,
	OnInit
} from '@angular/core';
import {
	Router
} from '@angular/router';
import {
	ApiService
} from '../api.service';
import {
	FormControl,
	FormGroupDirective,
	FormBuilder,
	FormGroup,
	NgForm,
	Validators
} from '@angular/forms';

@Component({
	selector: 'app-user-add',
	templateUrl: './user-add.component.html',
	styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

	userForm: FormGroup;
	name: string = '';
	lastName: string = '';
	age: number = null;
	active: number = null;
	isLoadingResults = false;

	constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.userForm = this.formBuilder.group({
			'name': [null, Validators.required],
			'lastName': [null, Validators.required],
			'age': [null, Validators.required],
			'active': [null, Validators.required]
		});
	}

	onFormSubmit(form: NgForm) {
		this.isLoadingResults = true;
		this.api.addUser(form)
			.subscribe(res => {
				const id = res['id'];
				this.isLoadingResults = false;
				this.router.navigate(['/user-details', id]);
			}, (err) => {
				console.log(err);
				this.isLoadingResults = false;
			});
	}

}