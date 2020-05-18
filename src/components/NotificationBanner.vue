<template>
  <transition name="slide-in">
    <div
      v-if="displayed"
      class="notification"
      :class="{
        'notification-danger': data.type === NotificationType.DANGER,
        'notification-warning': data.type === NotificationType.WARNING,
        'notification-success': data.type === NotificationType.SUCCESS
      }"
    >
      <div class="notification-message">
        {{ data.message }}
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";

import { Notification, NotificationType } from "@/models/notification-models";

export default Vue.extend({
  name: "NotificationBanner",
  props: {
    data: {
      type: (Object as unknown) as () => Notification,
      required: true
    }
  },
  data: () => ({
    displayed: false,
    NotificationType
  }),
  mounted() {
    this.displayNotification(this.data);
  },
  watch: {
    data: function(newData: Notification) {
      this.displayNotification(newData);
    }
  },
  methods: {
    displayNotification(n: Notification) {
      this.displayed = true;
      if (n.duration) {
        setTimeout(() => {
          this.displayed = false;
        }, n.duration);
      }
    }
  }
});
</script>

<style scoped>
.notification {
  display: flex;
  padding: 20px;
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  background-color: rgb(182, 171, 171);
  color: black;
}

.notification.notification-success {
  background-color: rgb(89, 143, 89);
  color: white;
}

.notification.notification-danger {
  background-color: rgb(184, 72, 72);
  color: white;
}

.notification.notification-warning {
  background-color: rgb(209, 121, 20);
  color: white;
}

.notification-message {
  font-weight: bold;
}

.slide-in-enter-active {
  transition: all 0.3s ease;
}
.slide-in-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-in-enter,
.slide-in-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
</style>
