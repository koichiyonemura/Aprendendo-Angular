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

  getPokemons() {
    /*return this.http.get<Pokemon[]>(this.url + '?offset=0&limit=151')
    .pipe(
       retry(2),
       catchError(this.handleError)
    ) */
    return this.http.get(this.url + '?offset=0&limit=151').pipe(
      map((response: any , index ) => {
        response = response['results'];
        //console.log(response);
        response.forEach((elemento,index) => {
          var detalhes = this.getDetails(elemento.url);
          ///response[index] = console.log(detalhes);
        });
        return response;
      }));
  }

  getDetails(url : string) {
    /*var dados = this.http.get(url).pipe().subscribe((ret: Pokemon) => {
      return ret;
    }); */
    return this.http.get(url).pipe(
      map((response:any , index) => {
        return response;
      })
    );

    //return detalhes;
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
