<template>
  <div class="col-3 col-md-2 filter-col q-pa-sm">
    <p class="text-h5 text-center q-mb-sm q-px-md">Filters</p>
    <div class="q-my-sm filter-title q-px-md">
      <q-btn
        v-on:click="setOpenedFilter(0)"
        color="green"
        label="Diet"
        outline
        style="width:100%"
      />
    </div>
    <div class="column q-px-md" v-show="openedFilter == 0">
      <q-checkbox
        color="green"
        size="sm"
        v-for="filter in filterDiet"
        :key="filter"
        v-model="checkedDiet"
        :val="filter.val"
        :label="filter.label"
        @click="checkDiet(filter)"
      />
    </div>
    <div class="q-my-sm filter-title q-px-md q-my-sm">
      <q-btn
        v-on:click="setOpenedFilter(1)"
        color="blue"
        label="Health"
        outline
        style="width:100%"
      />
    </div>
    <div class="column q-px-md" v-show="openedFilter == 1">
      <q-checkbox
        color="blue"
        size="sm"
        v-for="filter in filterHealth"
        :key="filter"
        v-model="checkedHealth"
        :val="filter.val"
        :label="filter.label"
        @click="checkHealth(filter)"
      />
    </div>
    <div class="q-my-sm filter-title q-px-md">
      <q-btn
        v-on:click="setOpenedFilter(2)"
        color="orange"
        label="Cuisine"
        outline
        style="width:100%"
      />
    </div>
    <div class="column q-px-md" v-show="openedFilter == 2">
      <q-checkbox
        color="orange"
        size="sm"
        v-for="filter in filterCuisine"
        :key="filter"
        v-model="checkedCuisine"
        :val="filter.val"
        :label="filter.label"
        @click="checkCuisine(filter)"
      />
    </div>
    <div class="q-my-sm filter-title q-px-md">
      <q-btn
        v-on:click="setOpenedFilter(4)"
        color="negative"
        label="Meal"
        outline
        style="width:100%"
      />
    </div>
    <div class="column q-px-md" v-show="openedFilter == 4">
      <q-checkbox
        color="negative"
        size="sm"
        v-for="filter in filterMeal"
        :key="filter"
        v-model="checkedMeal"
        :val="filter.val"
        :label="filter.label"
        @click="checkMeal(filter)"
      />
    </div>
    <div class="q-my-sm filter-title q-px-md">
      <q-btn
        v-on:click="setOpenedFilter(3)"
        color="red"
        label="Dish"
        outline
        style="width:100%"
      />
    </div>
    <div class="column q-px-md" v-show="openedFilter == 3">
      <q-checkbox
        color="red"
        size="sm"
        v-for="filter in filterDish"
        :key="filter"
        v-model="checkedDish"
        :val="filter.val"
        :label="filter.label"
        @click="checkDish(filter)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchFilters",
  created() {
    this.checkURL(this.$route.query);
  },
  data() {
    return {
      filterDiet: [
        {
          label: "Balanced",
          val: "balanced",
        },
        {
          label: "High Fiber",
          val: "high-fiber",
        },
        {
          label: "High Protein",
          val: "high-protein",
        },
        {
          label: "Low Carb",
          val: "low-carb",
        },
        {
          label: "Low Sodium",
          val: "low-sodium",
        },
        {
          label: "Low Fat",
          val: "low-fat",
        },
      ],
      filterHealth: [
        {
          label: "Alcohol Free",
          val: "alcohol-free",
        },
        {
          label: "Celery Free",
          val: "celery-free",
        },
        {
          label: "Crustacean Free",
          val: "curstacean-free",
        },
        {
          label: "Dairy Free",
          val: "dairy-free",
        },
        {
          label: "Egg Free",
          val: "egg-free",
        },
        {
          label: "Gluten Free",
          val: "gluten-free",
        },
        {
          label: "Pork Free",
          val: "pork-free",
        },
        {
          label: "Keto Friendly",
          val: "keto-friendly",
        },
        {
          label: "Peanut Free",
          val: "peanut-free",
        },
        {
          label: "Tree Nut Free",
          val: "tree-nut-free",
        },
        {
          label: "Vegan",
          val: "vegan",
        },
        {
          label: "Vegetarian",
          val: "vegetarian",
        },
        {
          label: "Wheat Free",
          val: "wheat-free",
        },
      ],
      filterCuisine: [
        {
          label: "American",
          val: "american",
        },
        {
          label: "Asian",
          val: "asian",
        },
        {
          label: "British",
          val: "british",
        },
        {
          label: "Caribbean",
          val: "caribbean",
        },
        {
          label: "Chinese",
          val: "chinese",
        },
        {
          label: "French",
          val: "french",
        },
        {
          label: "Indian",
          val: "indian",
        },
        {
          label: "Italian",
          val: "italian",
        },
        {
          label: "Japanese",
          val: "japanese",
        },
        {
          label: "Mediterranean",
          val: "mediterranean",
        },
        {
          label: "Mexican",
          val: "mexican",
        },
        {
          label: "South American",
          val: "south american",
        },
      ],
      filterMeal: [
        {
          label: "Breakfast",
          val: "breakfast",
        },
        {
          label: "Lunch",
          val: "lunch",
        },
        {
          label: "Dinner",
          val: "dinner",
        },
        {
          label: "Snack",
          val: "snack",
        },
        {
          label: "Teatime",
          val: "teatime",
        },
      ],
      filterDish: [
        {
          label: "Bread",
          val: "bread",
        },
        {
          label: "Cereals",
          val: "cereals",
        },
        {
          label: "Condiments and Sauces",
          val: "condiments%20and%20sauces",
        },
        {
          label: "Desserts",
          val: "desserts",
        },
        {
          label: "Drinks",
          val: "drinks",
        },
        {
          label: "Main Course",
          val: "main%20course",
        },
        {
          label: "Salad",
          val: "salad",
        },
        {
          label: "Side Dish",
          val: "side%20dish",
        },
        {
          label: "Soup",
          val: "soup",
        },
        {
          label: "Sweets",
          val: "sweets",
        },
      ],
      openedFilter: 0,
      checkedHealth: [],
      checkedDiet: [],
      checkedCuisine: [],
      checkedDish: [],
      checkedMeal: [],
    };
  },
  methods: {
    checkURL(urlQuery) {
      // prettier-ignore
      if (urlQuery.diet) this.checkedDiet.push(...urlQuery.diet.split(","))
      this.$emit("diet-searched", this.checkedDiet);

      // prettier-ignore
      if (urlQuery.health) this.checkedHealth.push(...urlQuery.health.split(","));
      this.$emit("health-searched", this.checkedHealth);

      // prettier-ignore
      if (urlQuery.cuisine) this.checkedCuisine.push(...urlQuery.cuisine.split(","));
      this.$emit("cuisine-searched", this.checkedCuisine);
      // prettier-ignore
      if (urlQuery.dish) this.checkedDish.push(...urlQuery.dish.split(","));
      this.$emit("dish-searched", this.checkedDish);
      // prettier-ignore
      if (urlQuery.meal) this.checkedMeal.push(...urlQuery.meal.split(","));
      this.$emit("meal-searched", this.checkedMeal);
    },
    setOpenedFilter(i) {
      this.openedFilter = i;
    },
    checkDiet(filter) {
      let index = -1;
      this.checkedDiet.forEach((elem, i) => {
        if (elem.val == filter.val) {
          index = i;
          this.checkedDiet.splice(index, 1);
        }
      });
      this.$emit("diet-searched", this.checkedDiet);
      this.$emit("checkbox-changed");
    },
    checkHealth(filter) {
      let index = -1;
      this.checkedHealth.forEach((elem, i) => {
        if (elem.val == filter.val) {
          index = i;
          this.checkedHealth.splice(index, 1);
        }
      });
      this.$emit("health-searched", this.checkedHealth);
      this.$emit("checkbox-changed");
    },
    checkCuisine(filter) {
      let index = -1;
      this.checkedCuisine.forEach((elem, i) => {
        if (elem.val == filter.val) {
          index = i;
          this.checkedCuisine.splice(index, 1);
        }
      });
      this.$emit("cuisine-searched", this.checkedCuisine);
      this.$emit("checkbox-changed");
    },
    checkMeal(filter) {
      let index = -1;
      this.checkedMeal.forEach((elem, i) => {
        if (elem.val == filter.val) {
          index = i;
          this.checkedMeal.splice(index, 1);
        }
      });
      this.$emit("meal-searched", this.checkedMeal);
      this.$emit("checkbox-changed");
    },
    checkDish(filter) {
      let index = -1;
      this.checkedDish.forEach((elem, i) => {
        if (elem.val == filter.val) {
          index = i;
          this.checkedDish.splice(index, 1);
        }
      });
      this.$emit("dish-searched", this.checkedDish);
      this.$emit("checkbox-changed");
    },
  },
};
</script>

<style scoped>
.filter-col {
  border-style: solid;
  border-color: rgb(49, 206, 0);
  border-width: 0 2px 0 0;
}

.q-my-sm filter-title {
  text-align: left;
}
</style>
