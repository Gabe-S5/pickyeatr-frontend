<template>
  <router-view />
</template>

<script>
export default {
  name: "LayoutDefault",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");
#app {
  font-family: "Varela Round", sans-serif;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
}
#background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-image: url("./assets/backgroundImg.jpg");
  background-size: 100% 100%;
  background-size: cover;
  background-repeat: no-repeat;
  -webkit-filter: blur(2px);
  -moz-filter: blur(2px);
  -o-filter: blur(2px);
  -ms-filter: blur(2px);
  filter: blur(2px);
}
</style>
