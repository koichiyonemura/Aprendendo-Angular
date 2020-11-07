import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { retry , catchError } from 'rxjs/operators';
import { Pokemon } from './models/pokemon';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  url = 'https://pokeapi.co/api/v2/pokemon/'; //?offset=0&limit=151
  urlSprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  getPokemons(): Observable<Pokemon[]> {
    /*return this.http.get<Pokemon[]>(this.url + '?offset=0&limit=151')
    .pipe(
       retry(2),
       catchError(this.handleError)
    ) */
    return this.http.get(this.url + '?offset=0&limit=151')
    .pipe(
      map(result => result['results'])
    );
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
