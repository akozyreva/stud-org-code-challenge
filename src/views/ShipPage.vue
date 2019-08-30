<template>
    <div>
    <v-list  disabled>
      <v-subheader>INFO ABOUT SHIP</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(value, name, i) in getSingleShip"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title>{{name}} : {{ value }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getSingleShip']),
  },
  mounted() {
    this.$store.dispatch('loadSingleShip', this.$route.params.id.slice(1));
  },
};
</script>
