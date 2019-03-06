import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  ProductsComponent
} from './products/products.component';
import {
  ProductDetailComponent
} from './product-detail/product-detail.component';
import {
  ProductAddComponent
} from './product-add/product-add.component';
import {
  ProductEditComponent
} from './product-edit/product-edit.component';

import {
  UserComponent
} from './user/user.component';
import {
  UserDetailComponent
} from './user-detail/user-detail.component';
import {
  UserAddComponent
} from './user-add/user-add.component';
import {
  UserEditComponent
} from './user-edit/user-edit.component';

const routes: Routes = [{
  path: 'user',
  component: UserComponent,
  data: {
    title: 'List of Users'
  }
}, {
  path: 'user-details/:id',
  component: UserDetailComponent,
  data: {
    title: 'User Details'
  }
}, {
  path: 'user-add',
  component: UserAddComponent,
  data: {
    title: 'Add User'
  }
}, {
  path: 'user-edit/:id',
  component: UserEditComponent,
  data: {
    title: 'Edit User'
  }
}, {
  path: '',
  redirectTo: '/user',
  pathMatch: 'full'
}, {
  path: 'products',
  component: ProductsComponent,
  data: {
    title: 'List of Products'
  }
}, {
  path: 'product-details/:id',
  component: ProductDetailComponent,
  data: {
    title: 'Product Details'
  }
}, {
  path: 'product-add',
  component: ProductAddComponent,
  data: {
    title: 'Add Product'
  }
}, {
  path: 'product-edit/:id',
  component: ProductEditComponent,
  data: {
    title: 'Edit Product'
  }
}, {
  path: '',
  redirectTo: '/products',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}