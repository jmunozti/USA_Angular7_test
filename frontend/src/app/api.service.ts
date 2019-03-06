import {
  Injectable
} from '@angular/core';
import {
  Observable,
  of ,
  throwError
} from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import {
  catchError,
  tap,
  map
} from 'rxjs/operators';
import {
  Product
} from './product';
import {
  User
} from './user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
const apiUrl = "http://localhost:8080/api";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getProducts(): Observable < Product[] > {
    return this.http.get < Product[] > (apiUrl)
      .pipe(
        tap(products => console.log('Fetch products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  getProduct(id: number): Observable < Product > {
    const url = `${apiUrl}/${id}`;
    return this.http.get < Product > (url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError < Product > (`getProduct id=${id}`))
    );
  }

  addProduct(product): Observable < Product > {
    return this.http.post < Product > (apiUrl, product, httpOptions).pipe(
      tap((product: Product) => console.log(`added product w/ id=${product._id}`)),
      catchError(this.handleError < Product > ('addProduct'))
    );
  }

  updateProduct(id, product): Observable < any > {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError < any > ('updateProduct'))
    );
  }

  deleteProduct(id): Observable < Product > {
    const url = `${apiUrl}/${id}`;

    return this.http.delete < Product > (url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError < Product > ('deleteProduct'))
    );
  }


  getUsers(): Observable < User[] > {
    return this.http.get < User[] > (apiUrl)
      .pipe(
        tap(users => console.log('Fetch users')),
        catchError(this.handleError('getUsers', []))
      );
  }

  getUser(id: number): Observable < User > {
    const url = `${apiUrl}/${id}`;
    return this.http.get < User > (url).pipe(
      tap(_ => console.log(`fetched user id=${id}`)),
      catchError(this.handleError < User > (`getUser id=${id}`))
    );
  }

  addUser(user): Observable < User > {
    return this.http.post < User > (apiUrl, user, httpOptions).pipe(
      tap((user: User) => console.log(`added user w/ id=${user.id}`)),
      catchError(this.handleError < User > ('addUser'))
    );
  }

  updateUser(id, user): Observable < any > {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, user, httpOptions).pipe(
      tap(_ => console.log(`updated user id=${id}`)),
      catchError(this.handleError < any > ('updateUser'))
    );
  }

  deleteUser(id): Observable < User > {
    const url = `${apiUrl}/${id}`;

    return this.http.delete < User > (url, httpOptions).pipe(
      tap(_ => console.log(`deleted user id=${id}`)),
      catchError(this.handleError < User > ('deleteUser'))
    );
  }

  private handleError < T > (operation = 'operation', result ? : T) {
    return (error: any): Observable < T > => {
      console.error(error);
      return of(result as T);
    };
  }
}