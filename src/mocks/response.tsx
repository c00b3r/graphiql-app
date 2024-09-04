export const mockedResponsePoke = {
  species: [
    {
      __typename: 'pokemon_v2_pokemonspecies',
      name: 'starmie',
      base_happiness: 50,
      is_legendary: false,
      is_mythical: false,
      generation: {
        __typename: 'pokemon_v2_generation',
        name: 'generation-i',
      },
      habitat: {
        __typename: 'pokemon_v2_pokemonhabitat',
        name: 'sea',
      },
      pokemon: {
        __typename: 'pokemon_v2_pokemon_aggregate',
        nodes: [
          {
            __typename: 'pokemon_v2_pokemon',
            height: 11,
            name: 'starmie',
            id: 121,
            weight: 800,
            abilities: {
              __typename: 'pokemon_v2_pokemonability_aggregate',
              nodes: [
                {
                  __typename: 'pokemon_v2_pokemonability',
                  ability: {
                    __typename: 'pokemon_v2_ability',
                    name: 'illuminate',
                  },
                },
                {
                  __typename: 'pokemon_v2_pokemonability',
                  ability: {
                    __typename: 'pokemon_v2_ability',
                    name: 'natural-cure',
                  },
                },
                {
                  __typename: 'pokemon_v2_pokemonability',
                  ability: {
                    __typename: 'pokemon_v2_ability',
                    name: 'analytic',
                  },
                },
              ],
            },
            stats: [
              {
                __typename: 'pokemon_v2_pokemonstat',
                base_stat: 60,
                stat: {
                  __typename: 'pokemon_v2_stat',
                  name: 'hp',
                },
              },
              {
                __typename: 'pokemon_v2_pokemonstat',
                base_stat: 75,
                stat: {
                  __typename: 'pokemon_v2_stat',
                  name: 'attack',
                },
              },
              {
                __typename: 'pokemon_v2_pokemonstat',
                base_stat: 85,
                stat: {
                  __typename: 'pokemon_v2_stat',
                  name: 'defense',
                },
              },
              {
                __typename: 'pokemon_v2_pokemonstat',
                base_stat: 100,
                stat: {
                  __typename: 'pokemon_v2_stat',
                  name: 'special-attack',
                },
              },
              {
                __typename: 'pokemon_v2_pokemonstat',
                base_stat: 85,
                stat: {
                  __typename: 'pokemon_v2_stat',
                  name: 'special-defense',
                },
              },
              {
                __typename: 'pokemon_v2_pokemonstat',
                base_stat: 115,
                stat: {
                  __typename: 'pokemon_v2_stat',
                  name: 'speed',
                },
              },
            ],
            types: [
              {
                __typename: 'pokemon_v2_pokemontype',
                slot: 1,
                type: {
                  __typename: 'pokemon_v2_type',
                  name: 'water',
                },
              },
              {
                __typename: 'pokemon_v2_pokemontype',
                slot: 2,
                type: {
                  __typename: 'pokemon_v2_type',
                  name: 'psychic',
                },
              },
            ],
            levelUpMoves: {
              __typename: 'pokemon_v2_pokemonmove_aggregate',
              nodes: [
                {
                  __typename: 'pokemon_v2_pokemonmove',
                  move: {
                    __typename: 'pokemon_v2_move',
                    name: 'tackle',
                  },
                  level: 1,
                },
                {
                  __typename: 'pokemon_v2_pokemonmove',
                  move: {
                    __typename: 'pokemon_v2_move',
                    name: 'water-gun',
                  },
                  level: 1,
                },
                {
                  __typename: 'pokemon_v2_pokemonmove',
                  move: {
                    __typename: 'pokemon_v2_move',
                    name: 'hydro-pump',
                  },
                  level: 1,
                },
                {
                  __typename: 'pokemon_v2_pokemonmove',
                  move: {
                    __typename: 'pokemon_v2_move',
                    name: 'surf',
                  },
                  level: 1,
                },
                {
                  __typename: 'pokemon_v2_pokemonmove',
                  move: {
                    __typename: 'pokemon_v2_move',
                    name: 'psybeam',
                  },
                  level: 1,
                },
                {
                  __typename: 'pokemon_v2_pokemonmove',
                  move: {
                    __typename: 'pokemon_v2_move',
                    name: 'bubble-beam',
                  },
                  level: 1,
                },
                {
                  __typename: 'pokemon_v2_pokemonmove',
                  move: {
                    __typename: 'pokemon_v2_move',
                    name: 'psychic',
                  },
                  level: 1,
                },
                {
                  __typename: 'pokemon_v2_pokemonmove',
                  move: {
                    __typename: 'pokemon_v2_move',
                    name: 'recover',
                  },
                  level: 1,
                },
                {
                  __typename: 'pokemon_v2_pokemonmove',
                  move: {
                    __typename: 'pokemon_v2_move',
                    name: 'harden',
                  },
                  level: 1,
                },
                {
                  __typename: 'pokemon_v2_pokemonmove',
                  move: {
                    __typename: 'pokemon_v2_move',
                    name: 'minimize',
                  },
                  level: 1,
                },
                {
                  __typename: 'pokemon_v2_pokemonmove',
                  move: {
                    __typename: 'pokemon_v2_move',
                    name: 'confuse-ray',
                  },
                  level: 40,
                },
                {
                  __typename: 'pokemon_v2_pokemonmove',
                  move: {
                    __typename: 'pokemon_v2_move',
                    name: 'light-screen',
                  },
                  level: 1,
                },
                {
                  __typename: 'pokemon_v2_pokemonmove',
                  move: {
                    __typename: 'pokemon_v2_move',
                    name: 'swift',
                  },
                  level: 1,
                },
                {
                  __typename: 'pokemon_v2_pokemonmove',
                  move: {
                    __typename: 'pokemon_v2_move',
                    name: 'psywave',
                  },
                  level: 1,
                },
                {
                  __typename: 'pokemon_v2_pokemonmove',
                  move: {
                    __typename: 'pokemon_v2_move',
                    name: 'rapid-spin',
                  },
                  level: 1,
                },
                {
                  __typename: 'pokemon_v2_pokemonmove',
                  move: {
                    __typename: 'pokemon_v2_move',
                    name: 'cosmic-power',
                  },
                  level: 1,
                },
                {
                  __typename: 'pokemon_v2_pokemonmove',
                  move: {
                    __typename: 'pokemon_v2_move',
                    name: 'brine',
                  },
                  level: 1,
                },
                {
                  __typename: 'pokemon_v2_pokemonmove',
                  move: {
                    __typename: 'pokemon_v2_move',
                    name: 'power-gem',
                  },
                  level: 1,
                },
                {
                  __typename: 'pokemon_v2_pokemonmove',
                  move: {
                    __typename: 'pokemon_v2_move',
                    name: 'spotlight',
                  },
                  level: 1,
                },
              ],
            },
            foundInAsManyPlaces: {
              __typename: 'pokemon_v2_encounter_aggregate',
              aggregate: {
                __typename: 'pokemon_v2_encounter_aggregate_fields',
                count: 27,
              },
            },
            fireRedItems: [
              {
                __typename: 'pokemon_v2_pokemonitem',
                pokemon_v2_item: {
                  __typename: 'pokemon_v2_item',
                  name: 'stardust',
                  cost: 3000,
                },
                rarity: 50,
              },
              {
                __typename: 'pokemon_v2_pokemonitem',
                pokemon_v2_item: {
                  __typename: 'pokemon_v2_item',
                  name: 'star-piece',
                  cost: 12000,
                },
                rarity: 5,
              },
            ],
          },
        ],
      },
      flavorText: [
        {
          __typename: 'pokemon_v2_pokemonspeciesflavortext',
          flavor_text:
            'This POKéMON has a geometric body.\nBecause of its body, the locals suspect\nthat it is an alien creature.',
        },
      ],
    },
  ],
};

export const mockedResponseSwapiNetlify = {
  data: {
    allFilms: {
      films: [
        {
          title: 'A New Hope',
        },
        {
          title: 'The Empire Strikes Back',
        },
        {
          title: 'Return of the Jedi',
        },
        {
          title: 'The Phantom Menace',
        },
        {
          title: 'Attack of the Clones',
        },
        {
          title: 'Revenge of the Sith',
        },
      ],
    },
  },
};
