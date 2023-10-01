<template>
  <div class="main">
    <Title>{{ capitalizeFirstLetter(name) }} | Mandira's Pokedex</Title>
    <h1>{{ name }}</h1>

    <div v-if="pending">
      <p>Loading...</p>
    </div>

    <div class="body-content" v-else>
      <NuxtImg v-if="frontDefaultSprite" :src="frontDefaultSprite" :alt="name" />

      <h3>ID: {{ id }}</h3>

      <h2>Abilities</h2>
      <ul class="attribute-list">
        <li v-for="ability in abilities" :key="ability.name">
          <p>{{ formatAbilityName(ability.name) }}</p>
        </li>
      </ul>

      <h2>Dimensions</h2>
      <p>Height: {{ height/10 }} m</p>
      <p>Weight: {{ weight/10 }} kgs</p>

      <h2>Types</h2>
      <ul class="attribute-list">
        <li v-for="pokemonType in types" :key="pokemonType.name">
          {{ capitalizeFirstLetter(pokemonType.name) }}
        </li>
      </ul>
      
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';

const route = useRoute();
const name = route.params.name;
const pending = ref(true);
const abilities = ref([]);
const types = ref([]);
const height = ref([]);
const weight = ref(0);
const id = ref([]);
const frontDefaultSprite = ref(null);

const fetchData = async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    id.value = data.id;
    height.value = data.height;
    weight.value = data.weight;
    frontDefaultSprite.value = data.sprites.other['official-artwork'].front_default;
    abilities.value = data.abilities.map(a => a.ability).map(a => ({ name: a.name }));
    types.value = data.types.map(t => t.type).map(t => ({ name: t.name }));
    pending.value = false;
  } catch (error) {
    console.error('Fetch error:', error);
    pending.value = false;
  }
};

onMounted(async () => {
  await fetchData();
});

const capitalizeFirstLetter = (string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
};

const formatAbilityName = (abilityName) => {
  return abilityName
    ? abilityName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';
};
</script>

<style>
.main {
  padding: 0 15px 0 15px;
}

h1 {
  text-transform: uppercase;
}

.body-content {
  text-align: center;
}

.attribute-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.abilities {
  text-transform: capitalize;
}
</style>
