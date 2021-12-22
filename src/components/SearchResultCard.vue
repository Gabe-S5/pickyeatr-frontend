<template>
  <div class="search-result-card row border q-pa-md shadow-2">
    <div class="col q-ma-sm" style="position: relative">
      <q-img
        class="img-border"
        :src="recipe.recipe.image"
        :ratio="1"
        style="height: auto; max-width: 340px"
      >
        <div
          class="text-subtitle1 absolute-bottom text-center text-uppercase text-bold"
        >
          {{ recipe.recipe.label }}
        </div>
      </q-img>

      <!-- button if recipe IS NOT in favourites: star_border; v-if -->
      <q-btn
        v-if="checkFavourited(recipe.recipe)"
        @click="removeFavourite(recipe.recipe)"
        icon="star"
        flat
        dense
        round
        class="star-btn shadow-2"
      />
      <q-btn
        v-else
        @click="addFavourite(recipe.recipe)"
        icon="star_border"
        flat
        dense
        round
        class="star-btn shadow-2"
      />

      <!-- button if recipe IS in favourites: star; v-if -->

      <p class="search-result-heading text-center">
        <a :href="recipe.recipe.url" target="_blank">View Recipe</a>
      </p>
    </div>
    <div class="col-4 q-ma-sm">
      <div class="col search-result-section">
        <p class="search-result-heading">CALORIES</p>
        <div>
          <p class="search-result-body">
            {{ Math.round(recipe.recipe.calories) }}
          </p>
        </div>
      </div>
      <div class="col search-result-section">
        <p class="search-result-heading">TIME</p>
        <div v-if="recipe.recipe.totalTime > 0">
          <p class="search-result-body">
            {{ recipe.recipe.totalTime }} minutes
          </p>
        </div>
        <p v-else class="search-result-body">1 minute</p>
      </div>
      <div class="col search-result-section">
        <p class="search-result-heading">INGREDIENTS</p>
        <div v-for="ingredient in recipe.recipe.ingredients" :key="ingredient">
          <p class="search-result-body">{{ ingredient.food }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SearchResultCard",
  props: {
    recipe: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters({ favourites: "getFavourites" }),
  },
  methods: {
    ...mapActions(["addFavourite", "removeFavourite"]),
    checkFavourited(recipe) {
      let match = false;
      this.favourites.forEach((elem) => {
        if (elem.url == recipe.url) {
          match = true;
        }
      });
      return match;
    },
  },
};
</script>

<style scoped>
.search-result-card {
  width: 400px;
}

.img-border {
  border-radius: 12px;
}

.border {
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.25);
  border-width: 1px;
  border-radius: 8px;
}

.star-btn {
  position: absolute;
  left: -8px;
  top: -8px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  color: black;
}

.search-result-section {
  margin-bottom: 12px;
}

.search-result-heading,
.search-result-heading a {
  font-size: 16px;
  font-weight: bold;
  padding: 0;
  margin: 0;
}

.search-result-body {
  font-size: 14px;
  padding: 0;
  margin: 0;
}
</style>
