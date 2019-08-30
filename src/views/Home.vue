<template>
  <div>
     <v-text-field
            v-model="searchItem"
            label="Search for special ship by name"
            @input="searchByItem()"
          ></v-text-field>
    <v-list shaped>
      <v-subheader>SHIPS</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(item, i) in loadedShips"
          :key="i"
          :to="`/:${item.id}`"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
      <v-btn v-on:click="prevPage()" :disabled="getPrev ? false : true"
        >prev</v-btn
      >
      <v-btn v-on:click="nextPage()" :disabled="getNext ? false : true"
        >next</v-btn
      >
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      page: 1,
      searchItem: '',
    };
  },
  mounted() {
    this.showShips();
  },
  computed: {
    ...mapGetters(['loadedShips', 'getPrev', 'getNext']),
  },
  methods: {
    searchByItem() {
      this.$store.dispatch('searchShips', this.searchItem);
    },
    nextPage() {
      this.page += 1;
      this.showShips();
    },
    prevPage() {
      this.page -= 1;
      this.showShips();
    },
    showShips() {
      this.$store.dispatch('showShips', this.page);
    },
  },
};
</script>
