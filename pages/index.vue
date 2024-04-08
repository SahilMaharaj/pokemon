<template>
  <div>
    <UPagination
      :inactive-button="{ color: 'bay-of-many' }"
      class="pagination-custom"
      v-model="currentPage"
      :total="totalPages * itemsPerPage"
      :page-count="itemsPerPage"
      @update:modelValue="goToPage"
      size="md"
      :prev-button="{
        icon: 'i-heroicons-arrow-small-left-20-solid',
        label: 'Prev',
        color: 'bay-of-many',
      }"
      :next-button="{
        icon: 'i-heroicons-arrow-small-right-20-solid',
        trailing: true,
        label: 'Next',
        color: 'bay-of-many',
      }"
    />

    <div v-if="pending">
      <p>Loading...</p>
    </div>

    <div v-else class="pokemon">
      <ul>
        <li v-for="pokemon in detailedPokemonData" :key="pokemon.id">
          <div class="pokemon-content">
            <NuxtLink :to="`/pokemon/${pokemon.name}/`">
              <NuxtImg
                v-if="pokemon.sprite"
                :src="pokemon.sprite"
                :alt="pokemon.name"
                :width="100"
                :height="100"
              />
              <p v-else>No Image Available</p>
            </NuxtLink>
            <NuxtLink :to="`/pokemon/${pokemon.name}/`">
              <p class="pokemon-name">{{ pokemon.name }}</p>
            </NuxtLink>
            <p>#{{ pokemon.id }}</p>
          </div>
        </li>
      </ul>
    </div>

    <UPagination
      :inactive-button="{ color: 'bay-of-many' }"
      class="pagination-custom"
      v-model="currentPage"
      :total="totalPages * itemsPerPage"
      :page-count="itemsPerPage"
      @update:modelValue="goToPage"
      size="md"
      :prev-button="{
        icon: 'i-heroicons-arrow-small-left-20-solid',
        label: 'Prev',
        color: 'bay-of-many',
      }"
      :next-button="{
        icon: 'i-heroicons-arrow-small-right-20-solid',
        trailing: true,
        label: 'Next',
        color: 'bay-of-many',
      }"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { nextTick } from "vue";

const detailedPokemonData = ref([]);
let pending = ref(true);
const itemsPerPage = 20;
let totalPages = ref(0);

const router = useRouter();
const route = useRoute();
let currentPage = ref(route.query.page ? parseInt(route.query.page) : 1);

watch(currentPage, async (newPage) => {
  pending.value = true;
  try {
    await fetchPokemonDetails(newPage);
  } catch (error) {
    console.error("Fetch error:", error); // Error handling
  }
});

const fetchInitialData = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    totalPages.value = Math.ceil(data.count / itemsPerPage);
  } catch (error) {
    console.error("Fetch error:", error); // Error handling
  }
};

const fetchPokemonDetails = async (page) => {
  const offset = (page - 1) * itemsPerPage;
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const allPokemonDetails = await Promise.all(
      data.results.map((p) => fetch(p.url).then((res) => res.json()))
    );

    detailedPokemonData.value = allPokemonDetails.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      sprite: pokemon.sprites.other["official-artwork"].front_default,
    }));

    pending.value = false;
  } catch (error) {
    console.error("Fetch error:", error); // Error handling
  }
};

const goToPage = (page) => {
  currentPage.value = page;
  router.push({ query: { page: page.toString() } });
  // You might need to call fetchPokemonDetails here or ensure it reacts to currentPage changes
};

const resetPagination = () => {
  currentPage.value = 1;
  router.push("/"); // Navigates to the homepage without any query parameters
};

useFetch(async () => {
  try {
    await fetchInitialData();
    await fetchPokemonDetails(currentPage.value);
  } catch (error) {
    console.error("Fetch error:", error); // Error handling
  }
});

useHead({
  title: "Pukudex | The Pokemon Directory",
  meta: [
    {
      name: "description",
      content: "This is the Pukudex.",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: route.path,
    },
  ],
});
</script>

<style>
.pagination-custom {
  margin: 30px 0;
  justify-content: center;
}

.pagination-custom button {
  background-color: #fbd743;
}

h1 {
  font-family: "Permanent Marker", cursive;
  text-align: center;
  font-size: 48px;
}

.about {
  display: block;
  text-align: center;
  margin-top: 30px;
}
/* -- POKEMON GRID -- */
.pokemon ul {
  margin: 30px 0 0 0;
  padding: 0;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.pokemon-content {
  text-align: center;
}

.pokemon-content a {
  display: flex;
  justify-content: center;
}

.pokemon-content img {
  width: 70%;
  aspect-ratio: 1 / 1; /* Adjust this based on your images' aspect ratio */
  object-fit: cover; /* This ensures the image covers the reserved area nicely */
}

.pokemon-name {
  text-transform: capitalize;
  font-weight: 700;
}

/* -- MEDIA QUERIES -- */
@media only screen and (max-width: 768px) {
  .pokemon ul {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (max-width: 480px) {
  .pokemon ul {
    grid-template-columns: 1fr;
  }
}
</style>
