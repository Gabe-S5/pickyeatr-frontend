<template>
  <div>
    <q-list>
      <q-item-label class="text-h5 text-center q-ma-sm">Favorites</q-item-label>
      <div v-if="favourites.length > 0">
        <q-item
          v-for="(favourite, index) in favourites"
          :key="index"
          v-ripple
          clickable
          tag="a"
          target="_blank"
          :href="favourite.url"
          class="q-py-md"
        >
          <q-item-section style="max-width:100px">
            <div style="position: relative">
              <q-img
                :src="favourite.image"
                class="rounded-borders"
                style="max-height: 100px; width: 100px;"
              />
              <q-btn
                @click.prevent="removeFavourite(favourite)"
                icon="star"
                flat
                dense
                round
                class="remove-star shadow-2"
              />
            </div>
          </q-item-section>
          <q-item-section style="margin: 0px;">
            <q-item-label>{{ favourite.label }}</q-item-label>
            <q-item-label caption>
              {{ Math.round(favourite.calories) }} calories,
              <div v-if="favourite.totalTime > 0">
                {{ favourite.totalTime }} minute cook time.
              </div>
              <div v-else>1 minute cook time.</div>
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
      <div v-else class="text-center ">
        Add favourites by clicking the star on recipes.
      </div>
    </q-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Favourites",
  props: {},
  computed: {
    ...mapGetters({ favourites: "getFavourites" }),
  },
  methods: {
    ...mapActions(["removeFavourite"]),
  },
};
</script>

<style>
a:link,
a:visited {
  text-align: center;
  cursor: pointer;
}

.remove-star {
  position: absolute !important;
  left: -12px;
  top: -12px;
  text-align: center;
  background-color: rgb(255, 255, 255) !important;
  color: black;
}
</style>
