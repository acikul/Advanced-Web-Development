import { createStore } from "vuex";

export default createStore({
  state: {
    msg: null,
  },
  mutations: {
    setMsg(store, newMsg) {
      store.msg = newMsg;
    }
  },
  getters: {
    msg(store) {
      return `${store.msg}`;
    },
    isMsgSet(store) {
      return !!store.msg;
    }
  }
});
