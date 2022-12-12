<template>
  <v-app>
    <v-main>
      <div class="navBarItem">
        <div class="navBarDropMenu">
          <div class="list"></div>
          <div class="list"></div>
          <div class="list"></div>
        </div>
        <a href="https://www.spinalcom.com">
          <div class="navBarIcon">
            <img width="100" src="../assets/logo.svg" alt="">
          </div>
        </a>
        <div v-on:mouseleave="menuIsOpen = false" @click="menuIsOpen ? menuIsOpen = false : menuIsOpen = true"
          :style="menuIsOpen ? 'border : 1px solid black' : ''" class="navBarSelector">
          <span class="mt-1">
            <v-icon class="mr-2" color="black">{{ iconList[selectionMenu] }}</v-icon>
            {{ menuList[selectionMenu] }}
          </span>
          <div class="navBarSelectorTitle">APPLICATION</div>
          <div v-if="menuIsOpen" class="navBarItemSelection">
            <div @click="gotoView(index)" v-for="(item, index) in menuList" :key="item.menuList"
              class="navBarItemElement">
              <v-icon class="mr-2" color="black">{{ iconList[index] }}</v-icon>
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>
<script>


export default {
  data() {
    return {
      menuList: ['TOUTE L’ADMINISTRATION', 'GESTION UTILISATEUR', 'GESTION APPLICATION', 'GESTION PLATFORME', 'LOGS'],
      iconList: ['mdi-chart-tree', 'mdi-cog', 'mdi-cog', 'mdi-cog', 'mdi-chart-timeline-variant-shimmer'],
      routeList: ['', 'users', 'Application', 'platforms', 'Logs'],
      menuIsOpen: false,
      selectionMenu: false,
    };
  },
  components: {

  },
  methods: {
    gotoView(page) {
      this.$router.push("/" + this.routeList[page]);
      this.selectionMenu = page;
    }
  }

}
</script>

<style scoped >
.v-application {
  position: fixed;
  z-index: 99;
  top: 0px;
}

.navBarItem {
  position: fixed;
  width: 432px;
  height: 65px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 10px #49545C29;
  border: 1px solid #F7F7F7;
  border-radius: 0px 10px 10px 0px;
  opacity: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  user-select: none;
  margin-top: 10px;
}

.navBarDropMenu {
  width: 40px;
  height: 40px;
  border: 1px solid #EDF0F2;
  border-radius: 6px;
  opacity: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: 0.2s;
}

.navBarDropMenu:hover {
  background-color: #14202C;
}

.list {
  border-bottom: 1px solid rgb(197, 197, 197);
  width: 40%;
  margin-bottom: 2px;
  margin-top: 2px;
}

.navBarIcon {
  width: 92px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navBarSelector {
  width: 242px;
  height: 40px;
  border: 1px solid #EDF0F2;
  border-radius: 6px;
  opacity: 1;
  cursor: pointer;
  display: flex;
  padding-left: 10px;
font-size: 12px;
  align-items: center;
}

.navBarSelectorTitle {
  position: absolute;
  top: 6px;
  transform: translate(50%);
  text-align: left;
  font-size: 8px;
  letter-spacing: 0.7px;
  color: #000000;
  opacity: 1;
  background: white;
}

.navBarItemSelection {
  display: flex;
  width: 242px;
  position: absolute;
  top: 49px;
  right: 9px;
  background-color: white;
  border: solid black 1px;
  border-top: 0px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  flex-direction: column;
  user-select: none;
  transition: 0.3s;
}

.navBarItemElement {
  height: 40px;
  border: 1px solid #EDF0F2;
  align-items: center;
  display: flex;
  padding-left: 10px;
  border-radius: 6px;
  font-size: 12px;
  color: #000000;
}

.navBarItemElement:hover {
  background-color: rgb(238, 238, 238);
}
</style>