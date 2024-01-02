<script setup>
import PageHeader from "@/layouts/PageHeader.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const pushNotification = ref(true);
const dailyReminders = ref(true);
const upcomingReminders = ref(true);
const radioDays = ref("monday");
const radioWeight = ref("kg");
const radioHeight = ref("cm");
</script>

<template>
  <div>
    <PageHeader title="Settings" pageIcon="mdi-arrow-left" @goBack="router.go(-1)" />
    <br />
    <div>
      <v-row row wrap>
        <v-col d-flex xs12 sm12 md6 class="mt-2">
          <v-card>
            <v-card-title
              class="text-left text-h7 font-weight-bold pb-0"
              style="color: #f58220"
            >
              Notification
            </v-card-title>
            <div class="d-flex justify-center">
              <v-card-title class="font-weight-medium card__title text-h7"
                >Push Notification</v-card-title
              >
              <v-spacer></v-spacer>
              <v-switch
                v-model="pushNotification"
                color="warning"
                value="warning"
                inset
              ></v-switch>
            </div>
            <v-col class="text-start pl-4 pr-4">
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna.
              </p>
            </v-col>
          </v-card>
        </v-col>

        <v-col d-flex xs12 sm12 md6 class="mt-2">
          <v-card>
            <v-card-title
              class="text-left text-h7 font-weight-bold pb-0"
              style="color: #f58220"
            >
              Data Setting
            </v-card-title>
            <v-card-title class="font-weight-medium card__title text-h7 pb-0"
              >Start of the week</v-card-title
            >
            <v-col class="text-start pl-4 pr-4">
              <p class="mb-0">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna.
              </p>
            </v-col>

            <v-radio-group v-model="radioDays" row class="ml-3 mt-1">
              <v-radio value="monday" color="warning">
                <template v-slot:label>
                  <div class="card__radio">Monday</div>
                </template>
              </v-radio>
              <v-radio value="saturday" color="warning">
                <template v-slot:label>
                  <div class="card__radio">Saturday</div>
                </template>
              </v-radio>
              <v-radio value="sunday" color="warning">
                <template v-slot:label>
                  <div class="card__radio">Sunday</div>
                </template>
              </v-radio>
            </v-radio-group>
          </v-card>
        </v-col>

        <v-col d-flex xs12 sm12 md6 class="mt-2 mb-4">
          <v-card>
            <v-card-title
              class="text-left text-h7 font-weight-bold pb-0"
              style="color: #f58220"
            >
              Units
            </v-card-title>
            <v-card-title class="font-weight-medium card__title text-h7 pb-0"
              >Measurements</v-card-title
            >
            <v-col class="text-start pl-4 pr-4">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, numquam!
              </p>
            </v-col>

            <div class="d-flex align-center">
              <v-card-title class="font-weight-bold card__title text-h6"
                >Weight</v-card-title
              >
              <v-spacer></v-spacer>
              <v-radio-group v-model="radioWeight" row>
                <v-radio value="kg" color="warning">
                  <template v-slot:label>
                    <div class="card__radio font-weight-regular text-h7">KG</div>
                  </template>
                </v-radio>
                <v-radio value="lbs" color="warning">
                  <template v-slot:label>
                    <div class="card__radio font-weight-regular text-h7">LBS</div>
                  </template>
                </v-radio>
              </v-radio-group>
            </div>

            <div class="d-flex align-center">
              <v-card-title class="font-weight-bold card__title text-h6"
                >Height</v-card-title
              >
              <v-spacer></v-spacer>
              <v-radio-group v-model="radioHeight" row>
                <v-radio value="cm" color="warning">
                  <template v-slot:label>
                    <div class="card__radio font-weight-regular text-h7">CM</div>
                  </template>
                </v-radio>
                <v-radio value="feet" color="warning">
                  <template v-slot:label>
                    <div class="card__radio font-weight-regular text-h7">FEET</div>
                  </template>
                </v-radio>
              </v-radio-group>
            </div>
          </v-card>
        </v-col>

        <v-col d-flex xs12 sm12 md6 class="mt-2 mb-4">
          <v-card>
            <v-card-title
              class="text-left text-h7 font-weight-bold pb-0"
              style="color: #f58220"
            >
              Reminders
            </v-card-title>
            <div class="d-flex justify-center">
              <v-card-title class="font-weight-bold card__title text-h6"
                >Daily Reminders</v-card-title
              >
              <v-spacer></v-spacer>
              <v-switch
                v-model="dailyReminders"
                color="warning"
                value="warning"
                inset
              ></v-switch>
            </div>

            <v-col class="text-start pl-4 pr-4">
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.
              </p>
            </v-col>

            <div class="d-flex justify-center">
              <v-card-title class="font-weight-bold card__title text-h6"
                >Upcoming Reminders</v-card-title
              >
              <v-spacer></v-spacer>
              <v-switch
                v-model="upcomingReminders"
                color="warning"
                inset
                value="warning"
              ></v-switch>
            </div>

            <v-col class="text-start pl-4 pr-4">
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.
              </p>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<style scoped>
h6 {
  font-size: 16px;
  margin-top: 5px;
}
.card__title {
  font-size: 24px;
  margin-top: 5px;
}
.card__text {
  font-size: 18px;
  font: normal normal 300 18px/30px Gilroy;
}
.card__radio {
  font: normal normal 600 20px/24px Lato;
}
.card__radio {
  font-family: "Gilroy";
  font-weight: 500;
  color: #212121;
  font-size: 18px;
}
.v-sheet.v-card {
  border-radius: 26px;
  width: 100%;
  margin-bottom: 20px;
  padding: 15px 10px;
}
.text-h7 {
  font-size: 18px;
}
.v-input--radio-group.v-input--radio-group--row .v-radio {
  min-width: 100px;
  margin-top: 10px;
  font-weight: 100;
}
@media only screen and (max-width: 600px) {
  .card__title {
    font-size: 20px;
  }
  .card__radio {
    font-size: 14px;
  }
  .v-input--radio-group.v-input--radio-group--row .v-radio {
    min-width: unset;
  }
}
</style>
