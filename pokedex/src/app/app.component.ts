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

  constructor(private pokedexservice: PokedexService){}

  ngOnInit(){
    this.getPokemons();
  }

  getPokemons(){
    this.pokedexservice.getPokemons().subscribe((pokemons: Pokemon[]) => {
      this.pokemons = pokemons["results"];
      console.log(pokemons)
    });
  }
}
