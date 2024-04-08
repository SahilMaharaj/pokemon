<template>
  <div>
    <div class="logo-container">
      <NuxtLink class="logo-link" to="/" @click="resetPagination">
        <NuxtImg width="300" id="logo" src="/pukudex-logo.png" />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.logo-container {
  text-align: center;
}
.logo-link {
  color: #fff;
  text-decoration: none;
  transition: transform 0.5s ease;
  display: inline-block;
}

.logo-link:hover {
  animation: pulse 1s infinite;
}

.logo-heading {
  display: inline-block;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
