<template>
  <div>
    <ul>
      <li v-for="pokemon in pokemonData" :key="pokemon.id">
        <NuxtLink :to="`/pokemon/${pokemon.name}`">
          <NuxtImg
            width="300"
            height="300"
            :src="`/images/${pokemon.name}.png`"
          />
          <div>{{ toTitleCase(pokemon.name) }}</div>
          <div>#{{ pokemon.id }}</div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const { data } = await useFetch("/api/pokemon");
const pokemonData = ref(data);

useHead({
  title: "About | Mandira's Pokdex",
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
ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  /* Create as many 150px wide columns as can fit, or switch to 1fr (full width) when not enough space */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 10px;
  text-align: center;
}

ul li {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content vertically in the grid item */
}

ul li img {
  width: 100%; /* Make image responsive within the grid item */
  height: auto; /* Maintain aspect ratio */
}
</style>
