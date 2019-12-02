import { ActionTree, Commit } from "vuex";

const actions: ActionTree<any, any> = {
  ADD({ commit }: { commit: Commit }, params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(123);
    });
  }
};

export default actions;
