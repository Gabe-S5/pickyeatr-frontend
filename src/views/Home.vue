<template>
  <q-layout view="hHh Lpr lFr">
    <q-header elevated class="bg-green">
      <q-toolbar>
        <q-toolbar-title class="text-h3 q-my-sm">
          PickyEatr
        </q-toolbar-title>
        <div>
          <q-icon
            name="logout"
            size="sm"
            class="q-pa-sm cursor-pointer"
            clickable
            v-ripple
            round
            @click.prevent="logOut"
          />
        </div>
        <q-btn
          flat
          dense
          round
          @click="rightDrawerOpen = !rightDrawerOpen"
          aria-label="Menu"
          icon="star"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" overlay bordered side="right">
      <Favourites />
    </q-drawer>

    <q-page-container>
      <div class="q-pa-xl">
        <div class="q-pa-sm shadow-10 white-bg">
          <SearchBar
            @keyword-changed="addKeyword"
            @keyword-searched="searchKeyword"
          />
          <div class="row">
            <SearchFilters
              @diet-searched="addDiet"
              @health-searched="addHealth"
              @cuisine-searched="addCuisine"
              @meal-searched="addMeal"
              @dish-searched="addDish"
              @checkbox-changed="searchKeyword(this.keywords)"
            />
            <SearchResults :recipes="recipes" @copy-to-clipboard="copy" />
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import Favourites from "@/components/Favourites.vue";
import SearchBar from "@/components/SearchBar.vue";
import SearchFilters from "@/components/SearchFilters.vue";
import SearchResults from "@/components/SearchResults.vue";
import { copyToClipboard } from "quasar";
import router from "@/router";

export default {
  name: "HomeView",
  components: {
    Favourites,
    SearchBar,
    SearchFilters,
    SearchResults,
  },
  setup() {
    const API = axios.create({});
    let rightDrawerOpen = ref(false);
    return {
      API,
      rightDrawerOpen,
    };
  },
  data() {
    return {
      recipes: {},
      keywords: "",
      checkedDiet: [],
      checkedHealth: [],
      checkedCuisine: [],
      checkedMeal: [],
      checkedDish: [],
    };
  },
  computed: {
    url() {
      const app_id = "38c6fdb9";
      const app_key = "3971e1a9bd82d77b49b648e66a7afc54";
      // Sample URL https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=38c6fdb9&app_key=3971e1a9bd82d77b49b648e66a7afc54&diet=balanced&health=alcohol-free&cuisineType=American&mealType=Breakfast&dishType=Main%20course

      let base_URL = "https://api.edamam.com/api/recipes/v2?type=public";
      base_URL += "&app_id=" + app_id + "&app_key=" + app_key;

      base_URL += this.checkedDiet.map((elem) => `&diet=${elem}`).join("");

      base_URL += this.checkedHealth.map((elem) => `&health=${elem}`).join("");

      base_URL += this.checkedCuisine
        .map((elem) => `&cuisineType=${elem}`)
        .join("");

      base_URL += this.checkedMeal.map((elem) => `&mealType=${elem}`).join("");

      base_URL += this.checkedDish.map((elem) => `&dishType=${elem}`).join("");
      const sanitizedURL = encodeURI(base_URL);
      return sanitizedURL;
    },
  },
  methods: {
    logOut() {
      this.$store.commit("LOGOUT");
      router.push({ name: "Login" });
    },
    copy() {
      // Sample URL http://10.0.0.115:8080/?q=chicken&diet=high-fiber&health=keto-friendly,egg-free&cuisine=mexican&meal=dinner&dish=condiments%20and%20sauces
      let base_URL = `${window.location.origin}`;
      if (process.env.NODE_ENV !== "development") {
        base_URL += "/pickyeatr/?";
      } else {
        base_URL += "/?";
      }

      base_URL += `q=${this.keywords.toLowerCase()}`;
      base_URL += `&diet=${this.checkedDiet.map((elem) => elem).join(",")}`;
      base_URL += `&health=${this.checkedHealth.map((elem) => elem).join(",")}`;
      base_URL += `&cuisine=${this.checkedCuisine
        .map((elem) => elem)
        .join(",")}`;
      base_URL += `&meal=${this.checkedMeal.map((elem) => elem).join(",")}`;
      base_URL += `&dish=${this.checkedDish.map((elem) => elem).join(",")}`;
      copyToClipboard(base_URL)
        .then(() => {
          // success!
          alert("Copied URL to clipboard!");
        })
        .catch((error) => {
          // fail
          console.log(error);
        });
    },
    addKeyword(keyword) {
      this.keywords = keyword;
    },
    searchKeyword(keywords) {
      if (!keywords) {
        return;
      }
      this.keywords = keywords;
      const base_URL = this.url + `&q=${keywords.toLowerCase()}`;
      const sanitizedURL = encodeURI(base_URL);
      this.API.get(sanitizedURL)
        .then((response) => {
          this.recipes = response.data;
          this.recipes.hits.splice(8, 12);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    },
    addDiet(filter) {
      this.checkedDiet = filter;
    },
    addHealth(filter) {
      this.checkedHealth = filter;
    },
    addCuisine(filter) {
      this.checkedCuisine = filter;
    },
    addMeal(filter) {
      this.checkedMeal = filter;
    },
    addDish(filter) {
      this.checkedDish = filter;
    },
  },
};
</script>
<style>
.white-bg {
  background-color: rgba(255, 255, 255, 0.96);
  border-radius: 8px;
}
</style>
