<template>
  <div class="q-ma-md q-px-md search-bar">
    <div>
      <h3 class="text-center text-h4 q-mb-sm q-mt-lg">Find Your Recipes</h3>
      <p class="text-body1 text-center q-mb-lg q-px-lg">
        Filter through a wide variety of options and find the right recipe for
        you. Find everything you could need down to the calorie. Never forget a
        recipe again.
      </p>
    </div>
    <form @submit.prevent="pressed">
      <q-input
        v-model="search"
        class="input-bar"
        type="search"
        outlined
        hint="Input Ingredient(s) like Fried Chicken"
      >
        <!--:rules="[val => !! val || 'Field is required']" -->
        <template v-slot:append>
          <q-btn @click="pressed" color="primary" label="Search"></q-btn>
        </template>
      </q-input>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      search: "",
    };
  },
  mounted() {
    this.checkURL(this.$route.query);
  },
  methods: {
    checkURL(urlQuery) {
      this.search = urlQuery.q;
      if (this.search) {
        this.pressed();
      }
    },
    pressed() {
      this.$emit("keyword-searched", this.search);
    },
  },
};
</script>
<style scoped>
.search-bar {
  border-style: solid;
  border-width: 0 0 2px 0;
  border-color: rgb(49, 206, 0);
  margin: 2px 0 0 0;
  padding-bottom: 14px;
}

.input-bar {
  font-size: 24px;
  max-width: 50%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 8px;
  padding-bottom: 28px;
}
</style>
