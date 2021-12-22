<template>
  <div class="col">
    <q-item-label class="text-h5 text-center q-py-sm"
      >Search Results</q-item-label
    >
    <div class="text-center q-mb-sm" v-if="recipes?.hits?.length > 0">
      <q-btn @click="copy()" icon-right="link">Share&ensp;</q-btn>
    </div>

    <q-list v-if="recipes?.hits?.length > 0" class="results-col">
      <q-item v-for="(recipe, index) in recipes?.hits" :key="index">
        <SearchResultCard :recipe="recipe"></SearchResultCard>
      </q-item>
    </q-list>
    <q-list v-else>
      <p class="text-h6 text-center q-ma-md">No Results Found</p>
    </q-list>
  </div>
</template>

<script>
import SearchResultCard from "@/components/SearchResultCard.vue";

export default {
  name: "SearchResults",
  components: {
    SearchResultCard,
  },
  props: {
    recipes: {
      type: Object,
    },
  },
  methods: {
    copy() {
      this.$emit("copy-to-clipboard");
    },
  },
};
</script>

<style scoped>
.results-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
