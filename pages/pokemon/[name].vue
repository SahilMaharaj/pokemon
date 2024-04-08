<template>
  <main class="main">
    <h1>{{ toTitleCase(specificPokemonDetails.name) }}</h1>
    <NuxtImg
      class="pokemon-thumb"
      :src="`/images/${specificPokemonDetails.name}.png`"
      width="300"
      height="300"
    />

    <div>ID: {{ specificPokemonDetails.id }}</div>
    <div>Base Experience: {{ specificPokemonDetails.base_experience }}</div>

    <!--- ABILITIES --->
    <h4>ABILITIES</h4>
    <ul class="abilities">
      <li
        v-for="ability in specificPokemonDetails.abilities"
        :key="ability.ability"
      >
        {{ toTitleCase(ability.ability) }}
      </li>
    </ul>

    <!--- DIMENSIONS --->
    <h4>DIMENSIONS</h4>
    <div>Height: {{ specificPokemonDetails.height / 10 }}m</div>
    <div>Weight: {{ specificPokemonDetails.weight / 10 }}kgs</div>

    <!--- TYPES --->
    <h4>TYPES</h4>
    <ul class="types">
      <li v-for="type in specificPokemonDetails.types" :key="type.type">
        {{ toTitleCase(type.type) }}
      </li>
    </ul>

    <!--- MOVIES --->
    <h4>MOVES</h4>
    <ul class="moves">
      <li v-for="move in specificPokemonDetails.moves" :key="move.move">
        {{ toTitleCase(move.move) }}
      </li>
    </ul>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";

const route = useRoute();
const pokemonName = route.params.name; // This will dynamically get the Pokémon's name from the URL

// Fetch all Pokémon data
const { data: pokemonData } = await useFetch("/api/pokemon");

// Filter out the details for the specific Pokémon from the fetched data
const specificPokemonDetails = computed(() => {
  return pokemonData.value.find(
    (pokemon) => pokemon.name.toLowerCase() === pokemonName.toLowerCase()
  );
});

const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
</script>

<style scoped>
main {
  text-align: center;
}

.pokemon-thumb {
  margin: 0 auto;
}

.moves {
  display: flex;
  flex-wrap: wrap;
}

.moves li {
  margin: 10px;
  justify-content: center;
  align-items: center;
  background-color: #386abb;
  border-radius: 5px;
  padding: 5px;
}
</style>
