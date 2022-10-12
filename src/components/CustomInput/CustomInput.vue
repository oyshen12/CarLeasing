<template>
  <div class="input" :class="{ disabled: disabled }">
    <div class="input__title">{{ title }}</div>
    <div
      class="input__number"
      :class="{
        focused: focused,
      }"
    >
      <input
        :value="inputNumber"
        @input="inputNumberChange"
        @focus="focused = true"
        @blur="focused = false"
        class="input__number-el"
        type="number"
        ref="inputEl"
        @keypress="filterWithoutE"
        :key="inputController"
        :disabled="disabled"
      />
      <slot></slot>
    </div>
    <input
      class="input__range slider-progress"
      type="range"
      :min="minRange"
      :max="maxRange"
      :style="{
        '--value': inputRange,
        '--min': minRange,
        '--max': maxRange,
      }"
      :value="inputRange"
      @input="inputRangeChange"
      :disabled="disabled"
    />
  </div>
</template>

<script>
export default {
  props: [
    "inputNumber",
    "inputRange",
    "minNumber",
    "maxNumber",
    "minRange",
    "maxRange",
    "title",
    "disabled",
  ],
  data() {
    return {
      focused: false,
      inputController: 0,
    };
  },
  methods: {
    inputNumberChange(val) {
      const { value } = val.target;
      let valueInt = Number.parseInt(value);
      let changed = false;
      if (valueInt > this.maxNumber) {
        valueInt = this.maxNumber;
        changed = true;
      } else if (valueInt < this.minNumber) {
        valueInt = this.minNumber;
        changed = true;
      }
      this.$emit("changeInputNumber", valueInt);
      if (changed) {
        this.inputController++;
        this.$nextTick(() => {
          this.$refs.inputEl.focus();
        });
      }
    },
    inputRangeChange(val) {
      this.$emit("changeInputRange", val.target.value);
    },
    filterWithoutE(evt) {
      let expect = evt.target.value.toString() + evt.key.toString();
      if (
        !/^[-+]?[0-9]*\.?[0-9]*$/.test(expect) ||
        evt.key.toString() === "."
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
  watch: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "@/components/CustomInput/CustomInput.scss";
</style>