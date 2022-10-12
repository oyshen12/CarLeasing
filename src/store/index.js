import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    costAuto: 3300000,
    initialPaymentPercent: 13,
    initialPaymentValue: 420000,
    leasingPeriod: 60,
    inputDisabled: false,
  },
  getters: {
    monthlyPayment(state) {
      const monthPay =
        (state.costAuto - state.initialPaymentValue) *
        ((0.035 * Math.pow(1 + 0.035, state.leasingPeriod)) /
          (Math.pow(1 + 0.035, state.leasingPeriod) - 1));
      return Math.round(monthPay);
    },
    contractSum(state, getters) {
      return (
        state.initialPaymentValue + state.leasingPeriod * getters.monthlyPayment
      );
    },
    minInitialPayment(state) {
      return Math.round(state.costAuto * 0.1);
    },
    maxInitialPayment(state) {
      return Math.round(state.costAuto * 0.6);
    },
  },
  mutations: {
    setCostAuto(state, payload) {
      state.costAuto = payload;
      state.initialPaymentValue = Math.round(
        (payload * state.initialPaymentPercent) / 100
      );
    },
    setInitialPaymentPercent(state, payload) {
      state.initialPaymentPercent = payload;
      state.initialPaymentValue = Math.round((state.costAuto * payload) / 100);
    },
    setInitialPaymentValue(state, payload) {
      if (typeof payload === "string") {
        payload = Number.parseInt(payload);
      }
      state.initialPaymentValue = payload;
      state.initialPaymentPercent = Math.round(
        (payload * 100) / state.costAuto
      );
    },
    setLeasingPeriod(state, payload) {
      state.leasingPeriod = payload;
    },
    setInputDisabled(state, payload) {
      state.inputDisabled = payload;
    },
  },
  actions: {
    async sendRequest({ state, commit, getters }, payload) {
      commit("setInputDisabled", true);
      const link = "https://hookb.in/eK160jgYJ6UlaRPldJ1P";
      try {
        const resp = await axios.post(link, {
          car_coast: state.costAuto,
          initail_payment: state.initialPaymentValue,
          initail_payment_percent: state.initialPaymentPercent,
          lease_term: state.leasingPeriod,
          total_sum: getters.contractSum,
          monthly_payment_from: getters.monthlyPayment,
        });
      } catch (e) {
        console.log("Error ", e);
      }
      setTimeout(() => {
        commit("setInputDisabled", false);
      }, 3000);
    },
  },
  modules: {},
});
