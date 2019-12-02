import State from "./types";
import { GetterTree } from "vuex";

const getters: GetterTree<any, any> = {
  token: (state: State) => state.token
};
export default getters;
