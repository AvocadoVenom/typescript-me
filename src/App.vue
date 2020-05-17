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

<script>
import CustomSelect from "@/components/CustomSelect.vue";
import NotificationBanner from "@/components/NotificationBanner.vue";

export default {
  name: "App",
  components: {
    CustomSelect,
    NotificationBanner
  },
  data: () => ({
    dare: null,
    notification: null,
    opportunities: [
      "I want to improve my skills",
      "I love toppings... Typings I mean!",
      "I'm always ready for new challenges",
      "You need a clear and concise code right now"
    ],
    selectedReason: ""
  }),
  watch: {
    dare: function(accept) {
      if (accept) {
        this.notification = null;
      } else {
        this.notification = {
          type: "danger",
          message:
            "How dare you! This is an awesome opportunity to increase your skills and make me cleaner and robust!",
          duration: 5000
        };
      }
    },
    selectedReason: function(reason) {
      if ("I love toppings... Typings I mean!" === reason) {
        this.notification = {
          type: "danger",
          message:
            "This challenge is not a joke, take it seriously!!! [Try again]",
          duration: 5000
        };
        setTimeout(() => (this.selectedReason = null), 5000);
      } else if (
        [
          "I want to improve my skills",
          "I'm always ready for new challenges"
        ].includes(reason)
      ) {
        this.notification = {
          type: "warning",
          message:
            "How selfish you are! Don't you even care about my code!? [Try again]",
          duration: 5000
        };
        setTimeout(() => (this.selectedReason = null), 5000);
      } else if ("You need a clear and concise code right now" === reason) {
        this.notification = {
          type: "success",
          message: "I'm glad to hear it! Let's get to work",
          duration: 5000
        };
      } else {
        this.notification = null;
      }
    }
  }
};
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
