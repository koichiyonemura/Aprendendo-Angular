import { Pokemon } from './models/pokemon'
import { PokedexService } from './pokedex.service';
import { tipos } from './models/tipo';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
/*
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: '{{tipos | json}}'
})


export class AppComponent implements OnInit{
  pokemon = {} as Pokemon;
  pokemons: Pokemon[];  
  tipos = tipos;
 

  urlSprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  filter = '';
  filters = [];
  constructor(private pokedexservice: PokedexService){
    console.log(tipos);
  }

  ngOnInit(){
    this.getPokemons();
  }

  getPokemons(){
    this.pokedexservice.getPokemons().subscribe((pokemons: Pokemon[]) => {
      //this.pokemons = pokemons;
      pokemons.forEach( (pokemon, index) => {
        pokemon.id = index+1;
        pokemon.name = pokemon.name;
        pokemon.sprite = this.urlSprite + (index+1) + '.png';
        pokemon.sprite_shiny = this.urlSprite+'shiny/' + (index+1) + '.png';
        pokemon.show = 'Y';
        var dados = this.pokedexservice.getDetails(pokemon.url).subscribe(val => {
          //console.log(val);
          pokemon.detalhes = val;
          pokemon.type1 = val['types'][0]['type'].name;
          if( val['types'][1] )
            pokemon.type2 = val['types'][1]['type'].name;
        });        
        //console.log(dados);
      });     
      this.pokemons = pokemons
      console.log(pokemons)
      
    });
  } 
 
  //Recupera o icone do tipo
  getClassIcon = function(tipo) {
    //console.log('Tipo solicitado = '+ tipo);
    return tipos.find( i => { return i.name == tipo}).classIcon;    
  }

  //Seta o filtro de tipo
  setFilter(tipo){
    
    //this.filter = tipo
    this.filter = (this.filter == tipo) ? '': tipo; //Se for o mesmo tipo selecionado, zera o filtro, tipo um toggle   
    if(this.filters.length > 0){
      var index = this.filters.indexOf(tipo)
      if(index > -1){
          this.filters.splice(index,1)
      }
      else{
          this.filters.push(tipo);
      }
    }
    else{
      this.filters.push(tipo);
    }

    this.displayFilteredPokemon();

  }

  displayFilteredPokemon(){
    
    if(this.filters.length < 1 ){
      this.pokemons.forEach((pokemon,index) => {
        pokemon.show = 'Y';
      });
    }
    else if (this.filters.length == 1){
      var elemento1 = this.filters[0];
      this.pokemons.forEach((pokemon,index) => {
        if(pokemon.type1 == elemento1 || pokemon.type2 == elemento1){
          pokemon.show = 'Y';
        }
        else{
          pokemon.show = 'N';
        }
      });
    }
    else{
      var elemento1 = this.filters[0];
      var elemento2 = this.filters[1];
      this.pokemons.forEach((pokemon,index) => {
        if((pokemon.type1 == elemento1 && pokemon.type2 == elemento2) ||  
           (pokemon.type1 == elemento2 && pokemon.type2 == elemento1)
          ){
          pokemon.show = 'Y';
        }
        else{
          pokemon.show = 'N';
        }
      });
    }
    console.log(this.pokemons);
  }
}