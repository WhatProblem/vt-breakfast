import State from "./types";
import { GetterTree } from "vuex";
import tool from "../utils/tool";

const getters: GetterTree<any, any> = {
  token: (state: State) => state.token,
  sortList: (state: State) => state.sortList || tool.getStorage("sortList")
};
export default getters;
