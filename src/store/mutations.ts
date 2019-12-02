import State from "./types";
import { MutationTree } from "vuex";
import router from "@/router";

const mutations: MutationTree<any> = {
  INCREMEMT(state: State) {
    state.count++;
  },
  ADDS(state: State, payload: any) {
    console.log(state.token);
  }
};

export default mutations;
