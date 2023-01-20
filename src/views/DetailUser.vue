<template>
    <v-app>
        <v-main>
            <InformationBar @click.native="toto()" v-on:btn2="displayEditUser()" v-on:btn3="deletebtn()"
                title="INFORMATION DE L'UTILISATEUR" :title2="this.detailUser.userName"
                :icon="require('../assets/image/USE_icon.svg')">
                <div class="d-flex">
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">USER ID</span>
                        <span class=" bar-information">{{ this.detailUser.id }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">EMAIL</span>
                        <span class="bar-information">{{ this.detailUser.email }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">TYPE</span>
                        <span class="bar-information">{{ this.detailUser.type }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">TELEPHONE</span>
                        <span class="bar-information">{{ this.detailUser.telephone }}</span>
                    </div>
                </div>
                <div class="d-flex flex-column mr-16">
                    <span class="bar-sub-title">INFO</span>
                    <span class="bar-information">{{ this.detailUser.info }}</span>
                </div>
            </InformationBar>

            <BackupInformation style="max-height: 70%; min-height: 70%;" title="DÉTAIL PROFIL D'UTILISATEUR">
                <Tabs :items="items">
                    <v-tab-item>
                        <v-card style="background-color: #F7F7F7;">
                            <div @click="affichage()">
                                <v-data-table fixed-header style="background-color: #F7F7F7;" :footer-props="{
                                    'items-per-page-options': [10, -1]
                                }" :items-per-page="30" height="45vh" :headers="headers1"
                                    :items="this.platformObjectList" :search="search">
                                </v-data-table>
                            </div>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card style="background-color: #F7F7F7;">
                            <div @click="affichage()">
                                <v-card-title>
                                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher"
                                        single-line hide-details>
                                    </v-text-field>
                                </v-card-title>
                                <v-data-table fixed-header style="background-color: #F7F7F7;" :footer-props="{
                                    'items-per-page-options': [10, -1]
                                }" :items-per-page="30" height="45vh" :headers="headers" :items="logList"
                                    :search="search">
                                </v-data-table>
                            </div>
                        </v-card>
                    </v-tab-item>
                </Tabs>
            </BackupInformation>
        </v-main>
    </v-app>
</template>
  
<script>
import InformationBar from "../Components/InformationBar.vue";
import BackupInformation from "../Components/BackupInformation.vue";
import Tabs from "../Components/Tabs.vue";
import FiltreBar from "../Components/FiltreBar.vue";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "App",
    components: {
        InformationBar,
        BackupInformation,
        Tabs,
        FiltreBar
    },
    data() {
        return {
            search: '',
            headers1: [
                { text: 'Nom', value: '_platform.name' },
                { text: 'Statut', value: '_platform.statusPlatform' },
                { text: 'Message', value: 'userProfile.name' },
                { text: 'Id Acteur', value: 'userProfile.userProfileId' },
                { text: 'Nom Acteur', value: '_platform.name' },
            ],
            headers: [
                { text: 'Nom', value: 'name' },
                { text: 'Date', value: 'date' },
                { text: 'Message', value: 'message' },
                { text: 'Acteur', value: 'actor.actorName' },
                { text: 'Id Acteur', value: 'actor.actorId' },],
            items: [
                'PLATFORME', 'LOGS',
            ],
        };

    },
    methods: {

        // toto(){
        //     console.log(this.platformObjectList);
        // },
        ...mapActions({ deleteUser: 'users/deleteUser' }),

        deletebtn() {
            var user = {
                id: this.$route.query.id,
                name: this.detailUser.userName
            }
            this.deleteUser(user);
        },

        updateUser() {
            this.$store.dispatch('users/getUser', this.$route.query.id);
            this.$store.dispatch('users/getUserLogs', this.$route.query.id);
        },

        displayEditUser() {
            this.$router.push({ name: 'EditUser', query: { id: this.$route.query.id } });
        },
        affichage() {
            var a = document.querySelector("#app > div.v-menu__content.theme--light.menuable__content__active");
            if (a != null) {
                a.style.position = "fixed";
            }
        },
        formattedLogList() {
            return this.logList.map(log => {
                log.date = new Date(log.date).toLocaleString();
                return log;
            });
        },

    },
    computed: {
        ...mapGetters({
            detailUser: 'users/detailUser',
            platformObjectList: 'users/platformObjectList',
            logList: 'users/logList'
        }),
    },

    created() {
        this.updateUser()
    }
}
</script>
  
<style scoped >
.v-application {
    background: #eeeeee00;
}

.v-data-table>>>td {
    background-color: white;
    border-top: 10px solid #F7F7F7;
    border-bottom: solid 0px black !important;
    height: 60px !important;
    font-size: 11px !important;
}

#content>div>main>div>div.d-flex.flex-column.rounded-lg.backup-bar.v-card.v-sheet.theme--light.elevation-2>div.v-tabs.v-tabs--grow.theme--light>div.v-window.v-item-group.theme--light.v-tabs-items>div>div.v-window-item.v-window-item--active>div>div>div.v-card__title>div {
    margin-top: 0;
    padding-top: 0;
}

.v-data-table>>>th {
    background: #F7F7F7 !important;
}

#content>div>main>div>div.d-flex.flex-column.rounded-lg.backup-bar.v-card.v-sheet.theme--light.elevation-2>div.v-tabs.v-tabs--grow.theme--light>div.v-window.v-item-group.theme--light.v-tabs-items>div>div.v-window-item.v-window-item--active>div>div>div.v-card__title {
    padding: 10px;
    background-color: white;
    border: 1px solid #E3E7E8;
    border-radius: 6px;
}

.sub-division {
    display: flex;
    flex-direction: column;
    width: 20%;
}

.bar-sub-title {
    color: #949DA6;
    margin-bottom: 6px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 11px;
    letter-spacing: 1.1px;
}

.bar-information {
    margin-bottom: 10px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    letter-spacing: 1.3px;
    font-size: 11px;
    color: #14202C;

}

.information-backup-bar2 {
    background: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 9px;
    letter-spacing: 0.9px;
    height: 50px;
    margin-bottom: 3px;
    margin-top: 2px;
    margin-left: 1px;
    padding-left: 8px;
}
</style>