<template>
  <div id="app" class="app">
    <div class="app__margin">
      <div class="app__title">Рассчитайте стоимость автомобиля в лизинг</div>
      <div class="app__inputs">
        <custom-input
          :inputNumber="costAuto"
          @changeInputNumber="setCostAuto"
          :minNumber="1000000"
          :maxNumber="6000000"
          :inputRange="costAuto"
          :minRange="1000000"
          :maxRange="6000000"
          @changeInputRange="setCostAuto"
          :disabled="inputDisabled"
          title="Стоимость автомобиля"
          ><div class="input__append-text">₽</div></custom-input
        >
        <custom-input
          :inputNumber="initialPaymentValue"
          @changeInputNumber="setInitialPaymentValue"
          :minNumber="minInitialPayment"
          :maxNumber="maxInitialPayment"
          :inputRange="initialPaymentPercent"
          @changeInputRange="setInitialPaymentPercent"
          :minRange="10"
          :maxRange="60"
          :disabled="inputDisabled"
          title="Первоначальный взнос"
          ><div class="input__append-el">
            {{ initialPaymentPercent }}%
          </div></custom-input
        >
        <custom-input
          :inputNumber="leasingPeriod"
          @changeInputNumber="setLeasingPeriod"
          :minNumber="1"
          :maxNumber="60"
          :inputRange="leasingPeriod"
          @changeInputRange="setLeasingPeriod"
          :minRange="1"
          :maxRange="60"
          :disabled="inputDisabled"
          title="Срок лизинга"
          ><div class="input__append-text">мес.</div></custom-input
        >
      </div>
      <div class="app__info">
        <div class="app__info-item">
          <div class="app__info-title">Сумма договора лизинга</div>
          <div class="app__info-value">{{ contractSum }} ₽</div>
        </div>
        <div class="app__info-item">
          <div class="app__info-title">Ежемесячный платеж от</div>
          <div class="app__info-value">{{ monthlyPayment }} ₽</div>
        </div>
        <button
          :disabled="inputDisabled"
          class="app__info-btn"
          :class="{
            disabledBtn: inputDisabled,
          }"
          @click="btnClick"
        >
          <div v-if="!inputDisabled">Оставить заявку</div>
          <vue-ellipse-progress
            v-else
            color="#C4C4C4"
            emptyColor="#ff9514"
            :size="36"
            :thickness="4"
            animation="default 700 400"
            fontColor="white"
            :loading="true"
          >
          </vue-ellipse-progress>
        </button>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomInput from "@/components/CustomInput/CustomInput.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "App",
  components: {
    CustomInput,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState([
      "costAuto",
      "initialPaymentPercent",
      "initialPaymentValue",
      "leasingPeriod",
      "inputDisabled",
    ]),
    ...mapGetters([
      "monthlyPayment",
      "contractSum",
      "minInitialPayment",
      "maxInitialPayment",
    ]),
  },
  methods: {
    ...mapMutations([
      "setCostAuto",
      "setInitialPaymentPercent",
      "setInitialPaymentValue",
      "setLeasingPeriod",
    ]),
    ...mapActions(["sendRequest"]),

    btnClick() {
      this.sendRequest();
    },
  },
  watch: {},
};
</script>


<style lang="scss" scoped>
@import "@/App.scss";
</style>
