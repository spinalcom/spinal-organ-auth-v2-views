<!--
Copyright 2023 SpinalCom - www.spinalcom.com

This file is part of SpinalCore.

Please read all of the following terms and conditions
of the Free Software license Agreement ("Agreement")
carefully.

This Agreement is a legally binding contract between
the Licensee (as defined below) and SpinalCom that
sets forth the terms and conditions that govern your
use of the Program. By installing and/or using the
Program, you agree to abide by all the terms and
conditions stated or referenced herein.

If you do not agree to abide by these terms and
conditions, do not demonstrate your acceptance and do
not install or use the Program.
You should have received a copy of the license along
with this file. If not, see
<http://resources.spinalcom.com/licenses.pdf>.
-->

<template>
  <v-app class="app">
    <!-- <ul class="list-group mt-5">
      <li
        class="list-group-item list-group-item-action"
        v-for="data in dataList"
        :key="data.dynamicId"
      >
        <h3>{{ data.name }}</h3>
      </li>
    </ul> -->

    <div class="d-flex justify-end" style="width: 100%; min-width: 980px">
      <v-card
        class="
          d-flex
          flex-column
          ml-2
          pl-1
          pt-1
          pb-1
          pr-1
          justify-center
          rounded-lg
        "
        elevation="2"
      >
        <BlueButton
          @click.native="adduser()"
          :icon="'mdi-plus'"
          title="AJOUTER UN UTILISATEUR"
          :val="'blue'"
        />
      </v-card>
    </div>
    <BackupInformation title="TABLES DES UTILISATEURS">
      <div class="d-flex mb-2 mt-4">
        <div style="width: 22%">Nom d'utilisateur</div>
        <div style="width: 78%">État</div>
      </div>
      <div v-for="item in userList" :key="item.id">
        <div class="d-flex mb-2">
          <div style="width: 22%" class="content-list rounded-l-lg pl-10">
            {{ item.userName }}
          </div>
          <div style="width: 78%" class="content-list">
            <div class="stateButton-container">
              <StateButton
                :obj="'bos'"
                :content1="'BOS 1'"
                :content2="'ÉTAGE 24'"
                :icon="'mdi-chip'"
              />
              <StateButton
                :obj="'app'"
                :content1="'APPLICATION'"
                :content2="'PROFIL 10'"
                :icon="'mdi-apps'"
              />
            </div>
            <div class="stateButton-container">
              <StateButton
                :obj="'bos'"
                :content1="'BOS 1'"
                :content2="'ÉTAGE 24'"
                :icon="'mdi-chip'"
              />
              <StateButton
                :obj="'app'"
                :content1="'APPLICATION'"
                :content2="'PROFIL 10'"
                :icon="'mdi-apps'"
              />
            </div>
          </div>
          <div class="content-list rounded-r-lg hover">
            <button
              class="pr-2"
              style="height: 100%"
              @click="displayDetail(item)"
            >
              <v-icon>mdi-arrow-right</v-icon>
            </button>
          </div>
        </div>
      </div>
    </BackupInformation>
  </v-app>
</template>

<script>
import BlueButton from "../Components/BlueButton.vue";
import BackupInformation from "../Components/BackupInformation.vue";
import StateButton from "../Components/StateButton.vue";
import { mapActions, mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    BlueButton,
    BackupInformation,
    StateButton
  },
  data: () => ({
    display: false,
    token: "",
    userList: [
      {
        id: 1,
        userName: "gab du bour"
      }
    ]
  }),

  methods: {
    getData() {
      this.$store.dispatch("module/fetchData");
      console.log(this.$store.dispatch("module/fetchData"));
    },
    displayDetail(item) {
      this.$router.push("/DetailUser");
    },
    adduser(item) {
      this.$router.push("/AddUser");
    }
  },
  computed: {
    ...mapState(["module"])
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
.app {
  font: normal normal normal 10px/12px Charlevoix Pro;
  letter-spacing: 1px;
  background: #eeeeee00;
}

.content-list {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  min-height: 50px;
  padding-left: 10px;
  font: normal normal normal 12px/14px Charlevoix Pro;
  letter-spacing: 1.2px;
  margin: 1px;
  flex-wrap: wrap;
}

.hover:hover {
  background: rgb(228, 228, 228);
  transition: 0.3s;
}

.stateButton-container {
  width: 100%;
  display: flex;
}
</style>
