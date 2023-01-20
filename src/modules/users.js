// import axios from 'axios';
const instanceAxios = require("../services/axiosConfig");
import router from "../router"
export default {
  namespaced: true,
  state: {
    data: [],
    userlist: [],
    detailUser: [],
    platformList: [],
    logList: [],
    platformObjectList: [],
    // platformList: [],
    userProfileList: [],
    selectedplatformObjectList: [],
  },
  getters: {
    platformList: state => state.platformList,
    dataList: state => state.data,
    userList: state => state.userlist,
    detailUser: state => state.detailUser,
    platformObjectList: state => state.platformObjectList,
    logList: state => state.logList,
    userProfileList: state => state.userProfileList,
    selectedplatformObjectList: state => state.selectedplatformObjectList,
  },
  actions: {

    async saveUser({ commit }, objectBody) {
      const rep = await instanceAxios.instanceAxios.post("/users", objectBody, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        }
      });
      if (rep) {
        router.push("/Users");
      }
    },

    async deleteUser({ commit }, user) {
      console.log(user);
      let ask = true
      let r = true;
      if (ask)
        r = confirm(
          "Are you sure you want to delete the User, you can lost all config of this user!"
        );
      if (r === true) {
        if (user.name === "authAdmin") {
          alert("you cannot delete this item");
        } else {
          await instanceAxios.instanceAxios.delete(`/users/${user.id}`, {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": localStorage.getItem("token"),
            }
          });
          router.push("/Users");
        }
      }
    },


    async updateUser({ commit }, profile) {
      console.log(profile[1], profile[0]);
      console.log('////////////////////////////////////////////////////////////////');
      console.log("cccc");
      const rep = await instanceAxios.instanceAxios.put(
        `/users/${profile[1]}`,
        profile[0],
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        }
      );
      if (rep) {
        router.push("/Users");
      }
    },



    async getplatformList({ commit }) {
      const rep = await instanceAxios.instanceAxios.get(`/platforms`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        }
      });
      commit("setplatformList", rep.data);
    },

    async getUserProfileList({ commit }, id) {
      console.log(id);
      console.log('toto');
      const rep = await instanceAxios.instanceAxios.get(
        `/platforms/${id}/getUserProfileList`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        }
      );
      return rep.data
      // return [{
      //   name: 'lefinn',
      //   userProfileId: 'd88e-dceb-fa16-185c71c6854'
      // }]
    },

    async getUsers({ commit }) {
      const rep = await instanceAxios.instanceAxios.get("/users", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        }
      });
      commit("setUserList", rep.data);
    },

    async getUser({ commit, dispatch }, userId) {
      const rep = await instanceAxios.instanceAxios.get(`/users/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        }
      });
      await dispatch('getplatforms', rep.data);
      commit("setDetailUser", rep.data)
    },

    async getplatform(context, platformId) {

      const rep = await instanceAxios.instanceAxios.get(
        `/platforms/${platformId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        }
      );
      return rep.data;
    },

    async getplatforms({ commit, dispatch }, _user) {
      for (const platform of _user.platformList) {
        const _platform = await dispatch('getplatform', platform.platformId);
        let infoPlatform = {
          _platform: _platform,
          userProfile: {
            name: platform.userProfile.userProfileName,
            userProfileId: platform.userProfile.userProfileBosConfigId
          }
        };
        commit('ADD_PLATFORM_OBJECT', infoPlatform);
      }
    },

    async getUserLogs({ commit }, userId) {
      const rep = await instanceAxios.instanceAxios.get(
        `/users/${userId}/userLogs`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        }
      );
      commit("setUserLogList", rep.data)
    },

    displayDetail(store, perso) {
      this.$router.push({ name: "DetailUser", query: { id: perso.id } });
    },
    adduser() {
      this.$router.push("/AddUser");
    },
    lafonction({ commit }, tableau) {
      commit("SET_SELECTED_PLATFORM_OBJECT_LIST", tableau)
    }
  },
  mutations: {
    setUserList: (state, userlist) => (
      state.userlist = userlist
    ),
    setDetailUser: (state, detailUser) => (
      state.detailUser = detailUser
    ),
    ADD_PLATFORM_OBJECT(state, infoPlatform) {
      state.platformObjectList.push(infoPlatform);
    },
    setUserLogList: (state, logList) => (
      state.logList = logList
    ),
    setplatformList: (state, platformList) => (
      state.platformList = platformList
    ),
    setuserProfileList: (state, userProfileList) => (
      state.userProfileList = userProfileList
    ),
    SET_SELECTED_PLATFORM_OBJECT_LIST: (state, selectedplatformObjectList) => (
      state.selectedplatformObjectList = selectedplatformObjectList
    )
  }
}

