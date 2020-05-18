<template>
  <div class="select-container">
    <label for="reason" v-if="label" style="margin-right: 10px;">{{
      label
    }}</label>
    <select
      name="reason-challenge"
      id="reason-challenge"
      @change="$emit('change', $event.target.value)"
    >
      <option :value="null" :selected="value === null"
        >No selected reason</option
      >
      <option
        v-for="(v, i) in reasons"
        :key="i"
        :value="v"
        :selected="value === v"
        >{{ v }}</option
      >
    </select>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CustomSelect",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    label: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    },
    reasons: {
      type: (Array as unknown) as () => string[],
      required: true
    }
  }
});
</script>

<style scoped>
.select-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 90px;
}
</style>
