<template>
    <v-app>
        <v-main>
            <InformationBar v-on:btn1="deleteApp()" v-on:btn2="displayEditApp()" v-on:btn3="deletebtn()"
                title="INFORMATION DE L’APPLICATION" :title2="app.name" :icon="require('../assets/image/APP_icon.svg')">
                <div class="d-flex">
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">APP ID</span>
                        <span class=" bar-information">{{ app.id }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">CLIENT ID</span>
                        <span class="bar-information">{{ app.clientId }}</span>
                    </div>
                    <div class="d-flex flex-column mr-8">
                        <span class="bar-sub-title">TYPE</span>
                        <span class="bar-information">{{ app.type }}</span>
                    </div>
                    <div style="width:20% ;transform: translate(0,-8px);" class="d-flex flex-column ml-2">
                        <BlueButton :icon="'mdi-eye'" title="SECRET ID" :val="'blue'" />
                    </div>
                </div>
            </InformationBar>
            <BachupInformation style="max-height: 70%; min-height: 70%;" title="BACKUP PLATFORM APPLICATION TABLE">
                <Tabs :items="items">
                    <v-tab-item>
                        <v-card style="background-color: #F7F7F7;">
                            <div @click="affichage()">
                                <v-data-table fixed-header style="background-color: #F7F7F7;" :footer-props="{
                                    'items-per-page-options': [10, -1]
                                }" :items-per-page="30" height="45vh" :headers="headers2" :items="platformObjectList"
                                    :search="search">
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
            </BachupInformation>
        </v-main>
    </v-app>
</template>
  
<script>
import InformationBar from "../Components/InformationBar.vue";
import BachupInformation from "../Components/BackupInformation.vue";
import BlueButton from "../Components/BlueButton.vue";
import Tabs from "../Components/Tabs.vue";
import FiltreBar from "../Components/FiltreBar.vue";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "App",
    components: {
        InformationBar,
        BlueButton,
        BachupInformation,
        Tabs,
        FiltreBar,
    },
    data() {
        return {
            search: '',
            headers: [{ text: 'Nom', value: 'name' },
            { text: 'Date', value: 'date' },
            { text: 'Message', value: 'message' },
            { text: 'Acteur', value: 'actor.actorName' },
            { text: 'Id Acteur', value: 'actor.actorId' },
            ],
            headers2: [{ text: 'Nom de platforme ', value: '_platform.name' },
            { text: 'Statut', value: '_platform.statusPlatform' },
            { text: 'Nom Utilisateur', value: 'userProfile.name' },
            { text: 'Id Utilisateur', value: 'userProfile.userProfileId' },
            { text: 'Platforme', value: '_platform.name' },
            ],

            items: [
                'PLATFORMS', 'LOGS',
            ],
           
        };
    },
    methods: {

        ...mapActions({ deleteApp: 'applications/deleteApp' }),

        deletebtn() {
            this.deleteApp(this.$route.query.id);
        },

        updateApp() {
            this.$store.dispatch('applications/getApp', this.$route.query.id);
            this.$store.dispatch('applications/getApplicationLogs', this.$route.query.id);
        },
        getDate(date) {
            var acDate = new Date(date);
            return acDate;
        },
        displayEditApp() {
            this.$router.push({ name: "EditApp", query: { id: this.app.id } });
        },
        affichage() {
            var a = document.querySelector("#app > div.v-menu__content.theme--light.menuable__content__active");
            if (a != null) {
                a.style.position = "fixed";
            }
        },

        formattedLogList() {
            console.log("toto");
            console.log(this.logList);
            return this.logList.map(log => {
                log.date = new Date(log.date).toLocaleString();
                return log;
            });
        },
    },
    computed: {
        ...mapGetters({
            app: 'applications/detailApp',
            logList:'applications/appLogList',
            platformObjectList:'applications/platformObjectList',
        }),
    },
    created() {
        this.updateApp()
    }
}
</script>
  
<style scoped>
.v-application {
    background-color: #d6e2e600;
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

/* .titlelog {
    padding-top: 10px;
    padding-left: 10px;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 1.1px;
    font-size: 12px;
} */


.sub-division {
    display: flex;
    flex-direction: column;
    width: 20%;
}

.bar-sub-title {
    color: #949DA6;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 11px;
    margin-bottom: 10px;
}

.bar-information {
    margin-bottom: 10px;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 11px;
    letter-spacing: 1.1px;
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