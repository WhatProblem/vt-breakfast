import State from "./types";
import { MutationTree } from "vuex";
import router from "@/router";
import tool from "../utils/tool";

const mutations: MutationTree<any> = {
  INCREMEMT(state: State) {
    state.count++;
  },
  ADDS(state: State, payload: any) {
    console.log(state.token);
  },

  SET_SORTLIST(state: State, payload: Array<object>) {
    state.sortList = payload;
    tool.setStorage('sortList', payload);
  }
};

export default mutations;
