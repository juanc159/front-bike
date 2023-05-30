import axiosIns from "@/plugins/axios";
import { defineStore } from "pinia";

export const useDashboardStore = defineStore("useDashboardStore", {
  state: () => ({
    shoppings: 0 as number,
    sales: 0 as number,
    thirds: 0 as number,
    utilities: 0 as number,
  }),
  getters: {

  },
  actions: {
    async getData() {
      await axiosIns
        .get('/dashboard-index')
        .then(result => {
          this.shoppings = result.data.shoppings
          this.sales = result.data.sales
          this.thirds = result.data.thirds
          this.utilities = result.data.utilities
        })
    }
  },
});
