<template>
  <div>
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
}
</style>
