import { Component, OnInit } from '@angular/core';
import { Pokemon } from './models/pokemon'
import { PokedexService } from './pokedex.service';
import { NgForm } from '@angular/forms';
/*
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  pokemon = {} as Pokemon;
  pokemons: Pokemon[];

  urlSprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  constructor(private pokedexservice: PokedexService){}

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
        //var dados = this.pokedexservice.getDetails(pokemon.url);
        //console.log(dados);
      });
      this.pokemons = pokemons
      //console.log(pokemons)
    });
  }  
  
}
