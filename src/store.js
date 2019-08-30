import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
const backendUrl = 'https://swapi.co/api/starships/';
const sendReq = (vuexContext, baseURI) => {
  axios
    .get(baseURI)
    .then((res) => {
      vuexContext.dispatch('clearStore');
      res = res.data;
      let { next } = res;
      let prev = res.previous;
      if (next) next = next.slice(-1);
      if (prev) prev = prev.slice(-1);
      vuexContext.commit('setPrev', prev);
      vuexContext.commit('setNext', next);
      const ships = res.results;
      const shipsArr = [];
      ships.forEach((el) => {
        const id = el.url.split('/').slice(-2, -1).join('');
        shipsArr.push({
          name: el.name,
          id,
        });
      });
      vuexContext.commit('setShips', shipsArr);
    })
    .catch((er) => {
      console.log(er);
    });
};
export default new Vuex.Store({
  state: {
    ships: [],
    next: undefined,
    prev: undefined,
    ship: {},
  },
  mutations: {
    setShips(state, ships) {
      ships.forEach(el => state.ships.push(el));
    },
    setPrev(state, prev) {
      state.prev = prev;
    },
    setNext(state, next) {
      state.next = next;
    },
    clearStore(state) {
      state.ships = [];
      state.next = undefined;
      state.prev = undefined;
      state.ship = {};
    },
    singleShip(state, ship) {
      state.ship = ship;
    },
  },
  actions: {
    clearStore(vuexContext) {
      vuexContext.commit('clearStore');
    },

    searchShips(vuexContext, searchItem) {
      const baseURI = `${backendUrl}?search=${searchItem}`;
      sendReq(vuexContext, baseURI);
    },
    loadSingleShip(vuexContext, id) {
      const baseURI = `${backendUrl}${id}`;
      axios
        .get(baseURI)
        .then((res) => {
          res = res.data;
          const ship = {
            name: res.name,
            costInCredits: res.cost_in_credits,
            length: res.length,
            manufacturer: res.manufacturer,
            maxAtmospheringSpeed: res.max_atmosphering_speed,
            model: res.model,
            starshipClass: res.starship_class,
          };
          vuexContext.commit('singleShip', ship);
        })
        .catch((er) => {
          console.log(er);
        });
    },

    showShips(vuexContext, page) {
      const baseURI = `${backendUrl}?page=${page}`;
      sendReq(vuexContext, baseURI);
    },
  },
  getters: {
    loadedShips(state) {
      return state.ships;
    },
    getPrev(state) {
      return state.prev;
    },
    getNext(state) {
      return state.next;
    },
    getSingleShip(state) {
      return state.ship;
    },
  },
});
