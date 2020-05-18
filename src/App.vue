<template>
  <div id="app">
    <div class="container">
      <h1>Would you dare to include Typescript in this project!?</h1>
      <div class="dare-challenge">
        <div class="radio-btn">
          <input type="radio" v-model="dare" name="challenge" :value="true" />
          <label class="radio-label" for="challenge">Yes, I would</label>
        </div>
        <div class="radio-btn">
          <input type="radio" v-model="dare" name="challenge" :value="false" />
          <label class="radio-label" for="challenge">No, I would not</label>
        </div>
      </div>
      <custom-select
        v-if="dare"
        label="What is your reason?"
        v-model="selectedReason"
        :reasons="opportunities"
      />
    </div>
    <notification-banner v-if="notification" :data="notification" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import CustomSelect from "@/components/CustomSelect.vue";
import NotificationBanner from "@/components/NotificationBanner.vue";
import { Notification, NotificationType } from "./models/notification-models";

export enum Reason {
  IMPROVE_SKILLS = "I want to improve my skills",
  TOPPINGS = "I love toppings... Typings I mean!",
  READY_FOR_CHALLENGES = "I'm always ready for new challenges",
  YOU_NEED_CLEAR_CODE = "You need a clear and concise code right now"
}

export enum ProjectAnswer {
  ANGRY_NO = "How dare you! This is an awesome opportunity to increase your skills and make me cleaner and robust!",
  ANGRY_SELFISH = "How selfish you are! Don't you even care about my code!? [Try again]",
  ANSWER_TOPPINGS = "This challenge is not a joke, take it seriously!!! [Try again]",
  GO_TO_WORK = "I'm glad to hear it! Let's get to work"
}

export default Vue.extend({
  name: "App",
  components: {
    CustomSelect,
    NotificationBanner
  },
  data: () => ({
    dare: (null as unknown) as () => boolean | null,
    notification: null as Notification | null,
    opportunities: Object.values(Reason),
    selectedReason: ""
  }),
  watch: {
    dare: function(accept: boolean) {
      if (accept) {
        this.notification = null;
      } else {
        this.notification = {
          type: NotificationType.DANGER,
          message: ProjectAnswer.ANGRY_NO,
          duration: 5000
        } as Notification;
      }
    },
    selectedReason: function(reason: Reason) {
      if (Reason.TOPPINGS === reason) {
        this.notification = {
          type: NotificationType.DANGER,
          message: ProjectAnswer.ANSWER_TOPPINGS,
          duration: 5000
        } as Notification;
        setTimeout(() => (this.selectedReason = ""), 5000);
      } else if (
        [Reason.IMPROVE_SKILLS, Reason.READY_FOR_CHALLENGES].includes(reason)
      ) {
        this.notification = {
          type: NotificationType.WARNING,
          message: ProjectAnswer.ANGRY_SELFISH,
          duration: 5000
        };
        setTimeout(() => (this.selectedReason = ""), 5000);
      } else if (Reason.YOU_NEED_CLEAR_CODE === reason) {
        this.notification = {
          type: NotificationType.SUCCESS,
          message: ProjectAnswer.GO_TO_WORK,
          duration: 5000
        } as Notification;
      } else {
        this.notification = null;
      }
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  display: flex;
  flex-direction: column;
  align-content: stretch;
}

.dare-challenge {
  display: flex;
  align-items: center;
  justify-content: center;
}

.radio-btn {
  margin: 0 10px;
}

.radio-label {
  margin-left: 4px;
}
</style>
