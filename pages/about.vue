<template>
  <div>
    <h1>About</h1>
    <ul>
      <li v-for="pokemon in pokemonData" :key="pokemon.id">
        <NuxtLink :to="`/pokemon/${pokemon.name}`">
          <NuxtImg
            width="300"
            height="300"
            :src="`/images/${pokemon.name}.png`"
          />
          <div>{{ pokemon.name }}</div>
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
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(150px, 1fr));
  gap: 10px;
  text-align: center;
}

ul li {
  flex: 1;
}

ul li img {
  justify-content: center;
  text-align: center;
  align-items: center;
}
</style>
