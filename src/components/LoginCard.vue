<template>
  <div class="row q-pa-xl justify-left" style="height:100vh">
    <div class="column col-xs-12 q-pa-lg">
      <q-card class="q-pa-lg login-card">
        <q-card-section class="q-pt-none">
          <div class="column">
            <div class="row">
              <div class="col-xs-9" style="align-self:flex-end">
                <div class="text-h5" style="margin-bottom: 4px">
                  Log In
                </div>
                <div class="text-subtitle2">
                  Find your saved recipes
                </div>
              </div>
              <div>
                <q-img
                  src="@/assets/kitchenIcon.png"
                  class="gt-xs kitchen-logo"
                />
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="column">
            <div class="col-xs-12">
              <q-form
                @submit.prevent="onSubmit"
                ref="form"
                class="q-col-gutter-y-lg"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="off"
                :greedy="true"
              >
                <q-input
                  outlined
                  v-model="username"
                  label="Username"
                  lazy-rules="ondemand"
                  hide-bottom-space
                  light
                  :rules="[(val) => !!val || 'Field is required']"
                  :error-message="isErrorMessage"
                  :error="isError"
                />
                <div class="row items-end text-center text-subtitle2">
                  <q-btn
                    class="login-btn q-pa-sm"
                    :class="$q.screen.xs ? 'login-btn-mobile' : ''"
                    type="submit"
                    color="secondary"
                    text-color="white"
                    push
                    >Log In</q-btn
                  >
                  <div class="q-ml-sm q-my-xs">
                    Automatically Registers accounts for you.
                  </div>
                </div>
              </q-form>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/components/LoginCard.sass'
@import '@/styles/quasar.variables.sass'
</style>

<script>
import { ref } from "vue";
import router from "@/router";
import { useStore } from "vuex";

export default {
  name: "LoginCardComponent",
  setup() {
    const store = useStore();

    let form = ref(null);
    let username = ref(null);
    let isError = ref(null);
    let isErrorMessage = ref(null);

    return {
      form,
      username,
      isError,
      isErrorMessage,
      onSubmit: () => {
        if (username.value.trim().length > 0) {
          store
            .dispatch("FIND_OR_CREATE_USER", username.value)
            .then(() => {
              router.push({ name: "Home" });
              isError.value = false;
            })
            .catch((err) => {
              form.value = null;
              username.value = null;
              store.state.token = "";
              store.state.userInfo = {};
              console.log(err.message);
              isError.value = true;
              isErrorMessage.value = err.message;
            });
        } else {
          form.value = null;
          username.value = null;
          store.state.token = "";
          store.state.userInfo = {};
          isError.value = true;
          isErrorMessage.value = "Field is required";
        }
      },
    };
  },
};
</script>
