import { Pokemon } from './models/pokemon'
import { PokedexService } from './pokedex.service';
import { tipos } from './models/tipo';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
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
    //console.log('Filtro solicitado = '+ tipo);
    this.filter = (this.filter == tipo) ? '' : tipo; //Se for o mesmo tipo selecionado, zera o filtro, tipo um toggle   
  }
  
}