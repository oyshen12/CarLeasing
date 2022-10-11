<template>
  <div id="app">
    <div style="display: flex; justify-content: space-between">
      <custom-input
        :inputNumber="costAuto"
        :inputRange="costAuto"
        @changeInputNumber="setCostAuto"
        @changeInputRange="setCostAuto"
        :min="1000000"
        :max="6000000"
        title="Стоимость автомобиля"
        ><div class="input__append-text">₽</div></custom-input
      >
      <custom-input
        :inputNumber="initialPaymentValue"
        @changeInputNumber="setInitialPaymentValue"
        :inputRange="initialPaymentPercent"
        @changeInputRange="setInitialPaymentPercent"
        :min="10"
        :max="60"
        title="Первоначальный взнос"
        ><div class="input__append-el">
          {{ initialPaymentPercent }}%
        </div></custom-input
      >
      <custom-input
        :inputNumber="leasingPeriod"
        @changeInputNumber="setLeasingPeriod"
        :inputRange="leasingPeriod"
        @changeInputRange="setLeasingPeriod"
        :min="1"
        :max="60"
        title="Срок лизинга"
        ><div class="input__append-text">мес.</div></custom-input
      >
    </div>
    <div>Сумма договора лизинга: {{ contractSum }}</div>
    <div>Ежемесячный платеж от: {{ monthlyPayment }}</div>
  </div>
</template>

<script>
import CustomInput from "@/components/CustomInput/CustomInput.vue";
import { mapGetters, mapMutations, mapState } from "vuex";

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
    ]),
    ...mapGetters(["monthlyPayment", "contractSum"]),
  },
  methods: {
    ...mapMutations([
      "setCostAuto",
      "setInitialPaymentPercent",
      "setInitialPaymentValue",
      "setLeasingPeriod",
    ]),
  },
  watch: {},
};
</script>


<style>
#app {
  font-family: "Nekst-Black", "Gilroy-Regular";
  color: black;
}
.input__append-text {
  font-family: "Nekst-Black";
  font-style: normal;
  font-weight: 900;
  font-size: 30px;
  line-height: 36px;
  color: #575757;
  margin-right: 24px;
}
.input__append-el {
  padding: 15px 17px;
  background: #ebebec;
  border-radius: 16px;
  font-family: "Nekst-Black";
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 120%;
  color: #575757;
  margin-right: 7px;
}
</style>
