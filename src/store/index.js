import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

const store = createStore({
  state() {
    return {
      token: "",
      userInfo: {},
      favouritesList: [],
    };
  },
  getters: {
    getFavourites: (state) => {
      return state.favouritesList;
    },
    token(state) {
      return state.token;
    },
  },
  mutations: {
    addFavourite(state, payload) {
      state.favouritesList.push(payload);
      // window.localStorage.setItem(payload.label, JSON.stringify(payload));
    },
    removeFavourite(state, payload) {
      let index = -1;
      state.favouritesList.forEach((elem, i) => {
        if (elem.url == payload.url) {
          index = i;
          state.favouritesList.splice(index, 1);
          // window.localStorage.removeItem(elem.label);
        }
      });
    },
    ADD_USER(state, payload) {
      state.token = payload.data.name;
      state.userInfo = payload.data;
      if (payload.data.favourites !== undefined) {
        payload.data.favourites.forEach((elem) => {
          elem.recipe["favouriteid"] = elem.favouriteid;
          state.favouritesList.push(elem.recipe);
        });
      }
    },
    LOGOUT(state) {
      state.token = "";
      state.userInfo = {};
      state.favouritesList = [];
    },
  },
  actions: {
    // https://github.com/lukehoban/es6features#destructuring
    addFavourite({ commit, state }, payload) {
      axios
        .post(`http://localhost:5000/users/${state.token}/favourites`, {
          recipe: payload,
        })
        .then((res) => {
          payload["favouriteid"] = res.data.favouriteid;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      commit("addFavourite", payload);
    },
    removeFavourite({ commit, state }, payload) {
      axios
        .delete(
          `http://localhost:5000/users/${state.token}/favourites/${payload.favouriteid}`
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      commit("removeFavourite", payload);
    },
    FIND_OR_CREATE_USER({ commit }, payload) {
      return axios
        .post(`http://localhost:5000/users`, {
          name: payload,
        })
        .then((res) => {
          commit("ADD_USER", res);
        })
        .catch((err) => {
          throw err;
        });
    },
  },
  plugins: [createPersistedState()],
});

export default store;
