import {
	Component,
	OnInit
} from '@angular/core';
import {
	Router,
	ActivatedRoute
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
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

	userForm: FormGroup;
	id: string = '';
	name: string = '';
	lastName: string = '';
	age: number = null;
	active: number = null;
	isLoadingResults = false;

	constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.getUser(this.route.snapshot.params['id']);
		this.userForm = this.formBuilder.group({
			'name': [null, Validators.required],
			'lastName': [null, Validators.required],
			'age': [null, Validators.required],
			'active': [null, Validators.required]
		});
	}

	getUser(id) {
		this.api.getUser(id).subscribe(data => {
			this.id = data.id;
			this.userForm.setValue({
				name: data.name,
				lastName: data.lastName,
				age: data.age,
				active: data.active
			});
		});
	}

	onFormSubmit(form: NgForm) {
		this.isLoadingResults = true;
		this.api.updateUser(this.id, form)
			.subscribe(res => {
				const id = res['id'];
				this.isLoadingResults = false;
				this.router.navigate(['/user-details', id]);
			}, (err) => {
				console.log(err);
				this.isLoadingResults = false;
			});
	}

	userDetails() {
		this.router.navigate(['/user-details', this.id]);
	}

}