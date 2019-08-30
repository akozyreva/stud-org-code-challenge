<template>
  <v-app>
    <v-toolbar class="toolbar-height">
      <v-toolbar-title class="headline">
        <span class="font-weight-light">Code challenge </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to="/" text>
          Home page
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
       <v-layout>
     <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
    <v-container>
       <router-view></router-view>
    </v-container>
    </v-flex>
    </v-layout>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="css">
  .toolbar-height {
    max-height: 64px;
  }
</style>
