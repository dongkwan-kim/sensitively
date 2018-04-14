<template>
  <div id="app">
    <v-app>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css);

* {
  background-color: #fbfbfb;
  box-sizing: border-box;
}

#app {
  font-family: "Spoqa Han Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

.fem {
  background-color: red;
  color: white;
}

.lgbt {
  background-color: blue;
  color: white;
}

.disabled {
  background-color: purple;
  color: white;
}

.local {
  background-color: orange;
  color: white;
}

.ethics {
  background-color: yellow;
  color: white;
}
</style>
