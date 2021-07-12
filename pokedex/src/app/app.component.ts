import { Pokemon } from './models/pokemon'
import { PokedexService } from './pokedex.service';
import { tipos } from './models/tipo';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { isUndefined } from 'util';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
  do_change;
 

  urlSprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  filter = '';
  filters = [];
  constructor(private pokedexservice: PokedexService){
    
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
        pokemon.sprite_commom = this.urlSprite + (index+1) + '.png';
        pokemon.sprite_shiny = this.urlSprite+'shiny/' + (index+1) + '.png';
        pokemon.show = 'Y';
        pokemon.do_change = false;
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
      //console.log(pokemons)
      
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
    if(this.filters.length == 0){
      this.filters.push(tipo);
    }
    else if(this.filters.length == 1 ){   
        var index = this.filters.indexOf(tipo)
        if(index > -1){
            this.filters.splice(index,1)
        }
        else{
            this.filters.push(tipo);
        }
    }
    else if(this.filters.length == 2){
      var index = this.filters.indexOf(tipo)
      if(index > -1){
          this.filters.splice(index,1)
      }
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
  }

  displayShinySprite(pokemon){
    
    if(pokemon.sprite == pokemon.sprite_commom){
      pokemon.sprite = pokemon.sprite_shiny;
      pokemon.do_change = true;
    }
    else{
      pokemon.sprite = pokemon.sprite_commom;
      pokemon.do_change = false;
    }
    this.pokemon = pokemon;
  } 
} 