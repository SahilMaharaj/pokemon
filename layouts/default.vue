<template>
  <div>
    <NuxtLoadingIndicator />
    <Logo />
    <slot></slot>
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: #363b81;
  font-family: "Montserrat", sans-serif;
}

h1 {
  color: #fbd743;
  font-size: 2.5em; /* 40px if the base font size is 16px */
  font-weight: 700; /* Bold */
  margin-bottom: 0.5em;
}

h2 {
  color: #fbd743;
  font-size: 2em; /* 32px if the base font size is 16px */
  font-weight: 600; /* Slightly less bold than h1 */
  margin-bottom: 0.75em;
}

h3 {
  color: #fbd743;
  font-size: 1.75em; /* 28px if the base font size is 16px */
  font-weight: 500; /* Medium weight */
  margin-bottom: 1em;
}

h4 {
  color: #fbd743;
  font-size: 1.5em; /* 24px if the base font size is 16px */
  font-weight: 400; /* Normal weight */
  margin-bottom: 0.5em;
}

img {
  max-width: 100%;
}
</style>
