import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry , catchError } from 'rxjs/operators';
import { Pokemon } from './models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.url)
    .pipe(
       retry(2),
       catchError(this.handleError)
    )
    
  }

  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    } else{
      errorMessage = `Código do erro: ${error.status},` + `mensagem: ${error.message}`;
      console.log(errorMessage);
      return throwError(errorMessage);
    }
  }
}
