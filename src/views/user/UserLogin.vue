<template>
  <v-app class="overflow-hidden" style="background: #fdfcfc">
    <v-main>
      <v-container class="fill-height pt-0 pb-0" fluid>
        <v-row class="login-row">
          <img class="logo-img d-sm-none" src="@/assets/logo-black.png" />
          <v-col
            col="12"
            sm="6"
            md=""
            class="d-flex flex-column align-items-center login-left-block"
          >
            <img
              v-if="display.mdAndUp"
              class="ml-auto"
              src="@/assets/arrow1.svg"
              height="140"
              width="140"
              contain
            />
            <div class="text-start mt-n5 mb-15">
              <v-flex d-flex md10>
                <h1>
                  Sneak Peek <br />
                  Into Health
                </h1>
              </v-flex>
              <v-flex md12>
                <p class="mt-5 my-md-10 ml-sm-0">
                  Get access to essential health data that aids in taking
                  crucial decisions for life. Track vital information in a
                  graphical view and hasten the next step.
                </p>
              </v-flex>
              <div class="box-item-row">
                <div class="mini-box-item">
                  <div class="item">
                    <v-img
                      src="@/assets/Heart hand.png"
                      class="item-img"
                      contain
                    ></v-img>
                  </div>
                </div>
                <div class="mini-box-item">
                  <div class="item">
                    <v-img
                      src="@/assets/Heart hand1.png"
                      class="item-img"
                      contain
                    ></v-img>
                  </div>
                </div>
                <div class="mini-box-item">
                  <div class="item">
                    <v-img
                      src="@/assets/watch.png"
                      class="item-img"
                      contain
                    ></v-img>
                  </div>
                </div>
              </div>
            </div>
            <img
              v-if="display.mdAndUp"
              class="mr-auto mt-auto mb-n1 ml-n10 building-image"
              src="@/assets/login-building.png"
              width="320"
              contain
            />
          </v-col>
          <v-col col="12" class="pa-0 login-center-block">
            <img
              src="@/assets/Mask Group 7.png"
              width="100%"
              contain
              top
              class="ml-sm-8"
            />
          </v-col>

          <v-col class="d-flex flex-column mx-auto login-right-block">
            <div class="login--box">
              <img src="@/assets/logo-black.png" contain class="logo-img" />
              <div class="inner-block">
                <h2>Welcome Back!</h2>
                <p class="mt-5" style="font-size: 20px">
                  Login into your account
                </p>

                <form class="mt-4" ref="form" @submit.prevent="login">
                  <v-text-field
                    type="email"
                    v-model.trim="email"
                    name="email"
                    :append-icon="'mdi-account'"
                    placeholder="Email"
                    required
                    filled
                    :rules="emailRules"
                  ></v-text-field>

                  <v-text-field
                    class="mt-2"
                    :append-icon="showPassIcon ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassIcon ? 'text' : 'password'"
                    v-model.trim="password"
                    name="password"
                    placeholder="Password"
                    hint="At least 6 characters"
                    required
                    filled
                    @click:append="showPassIcon = !showPassIcon"
                    :rules="passwordRules"
                  ></v-text-field>

                  <v-btn
                    class="mt-2"
                    color="warning"
                    type="submit"
                    width="100%"
                    large
                    :disabled="isLoading"
                    >Login</v-btn
                  >
                </form>
              </div>
              <h5 class="font-weight-regular">
                © Copyright 2022 Bacancy. All Right Reserved.
              </h5>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";

const display = ref(useDisplay());

const router = useRouter();
const store = useStore();

const email = ref("");
const password = ref("");
const showPassIcon = ref(false);
const isLoading = ref(false);

const emailRules = [
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => (v && v.length >= 6) || "Password must be at least 6 characters",
];

const login = async () => {
  isLoading.value = true;
  const data = {
    email: email.value,
    password: password.value,
  };

  try {
    const success = await store.dispatch("users/loginUser", data);
    console.log(success);
    isLoading.value = false;

    let userRole = localStorage.getItem("role");
    if (userRole === "Admin") {
      router.push({ path: "/devices" });
    } else {
      router.push({ path: "/" });
    }
    toast.success("Login successful", { timeout: 3000 });
  } catch (err) {
    isLoading.value = false;
    toast.error("Invalid Credentials", { timeout: 3000 });
    console.log(err);
  }
};
</script>

<style scoped>
p {
  font-size: 16px;
}
h1 {
  font-size: 69px;
  font: normal normal 900 60px/88px Gilroy;
  text-align: left;
}
h2 {
  font-size: 36px;
}
h5 {
  font: normal normal medium 16px/19px Gilroy;
}
.v-text-field {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  font-size: 20px;
}
.box-item-row {
  display: flex;
  margin-left: -4%;
  margin-right: -4%;
}
.mini-box-item {
  padding-left: 4%;
  padding-right: 4%;
  flex-grow: 0;
  width: 33.33%;
  max-width: 200px;
}
.mini-box-item .item {
  padding: 12%;
  background-color: #eee;
  border: 1px solid #c1bebe;
  border-radius: 30%;
}
.container.fill-height {
  align-items: stretch;
}
.login-left-block {
  padding-top: 100px;
  padding-left: 50px;
}
.building-image {
  width: 40%;
  max-width: 320px;
}
.login--box {
  background-color: #fff;
  border: 1px solid #e9e9e9;
  box-shadow: 0px 8px 12px #00000014;
  padding: 60px 40px;
  border-radius: 50px;
  margin: auto;
  width: 94%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
}
.inner-block {
  padding: 20px 0;
  margin: 15% 0;
}

p {
  font-size: 18px;
}
.logo-img {
  height: 70px;
  object-fit: contain;
}
.v-btn {
  border-radius: 10px;
}
.v-application .warning {
  background: linear-gradient(45deg, #e53985, #f58220) !important;
}

@media (max-width: 1199px) and (min-width: 600px) {
  .login-center-block {
    display: none;
  }
}
@media (max-width: 1800px) {
  .inner-block {
    margin: 20px 0;
  }
  .logo-img {
    height: 54px;
  }
}
@media (max-width: 1400px) {
  h1 {
    font-size: 52px;
    line-height: 1.5;
  }
  .login--box {
    max-width: 500px;
  }
}
@media (max-width: 991px) {
  h1 {
    font-size: 42px;
  }
  .login--box {
    width: 100%;
    padding: 30px 20px;
    margin: 30px auto;
  }
  h2 {
    font-size: 30px;
  }
  .logo-img {
    height: 50px;
  }
}
@media (max-width: 767px) {
  .login-left-block {
    padding-left: 15px;
  }
}
@media (max-width: 600px) {
  .login-center-block {
    order: 1;
    width: 100%;
    flex: none;
  }
  .login-left-block {
    order: 2;
  }
  .login-left-block h1 br {
    display: none;
  }
  .box-item-row {
    padding: 0 1rem;
  }
  .login-left-block h1,
  .login-left-block p {
    text-align: center;
    width: 100%;
  }
  .login-right-block {
    order: 3;
  }
  .login-center-block img {
    padding-left: calc(400px / 10.6);
    width: 360px;
    margin-top: 0;
  }
  .logo-img {
    position: absolute;
    top: 20px;
    z-index: 2;
    left: 50%;
    transform: translateX(-50%);
    height: 42px;
  }
  .login-left-block h1 {
    font-size: 32px;
  }
  .login-left-block {
    position: absolute;
    top: 440px;
    padding: 0 20px;
  }
  .login-right-block {
    visibility: hidden;
    animation: fadeUp-4a679094 1s forwards ease-in;
    animation-delay: 0.5s;
    padding: 10px 16px;
    position: relative;
    z-index: 9;
    transform: translateY(100%);
  }
  .login--box {
    margin: 0 auto;
    max-width: 100%;
  }
  .login-right-block .logo-img {
    display: none;
  }
  .inner-block {
    padding: 0;
    margin-bottom: 20px;
  }
  @keyframes fadeUp {
    from {
      visibility: hidden;
    }
    to {
      visibility: visible;
      transform: translateY(-14%);
    }
  }
}
</style>
