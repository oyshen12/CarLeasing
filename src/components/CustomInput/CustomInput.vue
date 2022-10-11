<template>
  <div class="input">
    <div class="input__title">{{ title }}</div>
    <div class="input__number">
      <input
        :value="inputNumber"
        @input="inputNumberChange"
        class="input__number__el"
        type="number"
      />
      <slot></slot>
    </div>
    <input
      class="input__range slider-progress"
      type="range"
      :min="min"
      :max="max"
      :style="{
        '--value': inputRange,
        '--min': min,
        '--max': max,
      }"
      :value="inputRange"
      @input="inputRangeChange"
    />
  </div>
</template>

<script>
export default {
  props: ["inputNumber", "inputRange", "min", "max", "title"],
  data() {
    return {};
  },
  methods: {
    inputNumberChange(val) {
      this.$emit("changeInputNumber", val.target.value);
    },
    inputRangeChange(val) {
      this.$emit("changeInputRange", val.target.value);
    },
  },
  watch: {},
  mounted() {},
};
</script>

<style lang="scss">
@import "@/components/CustomInput/CustomInput.scss";
</style>