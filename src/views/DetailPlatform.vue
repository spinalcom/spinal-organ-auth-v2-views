<template>
    <v-app>
        <v-main>
            <InformationBar v-on:btn2="displayEdit()" v-on:btn3="deletePlatformItem()" title="INFORMATION DU BOS"
                :title2="this.platform.name" :icon="require('../assets/image/BOS_icon.svg')">
                <div class="d-flex">
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">URL</span>
                        <span class=" bar-information">{{ this.platform.url }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">ADRESSE</span>
                        <span class="bar-information">{{ this.platform.address }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">STATUT</span>
                        <StatutButton v-if="this.platform.statusPlatform" :val="this.platform.statusPlatform"
                            title="ONLINE"></StatutButton>
                    </div>
                    <div style="max-width: 500px;" class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">TOKEN</span>
                        <span class="bar-information">{{ this.platform.TokenBosAdmin }}</span>
                    </div>
                </div>
            </InformationBar>

            <BackupInformation style="max-height: 70%; min-height: 70%;" title="INFORMATION DE LA PLATFORME">
                <Tabs :items="items">
                    <v-tab-item v-if="platformList[0]">
                        <v-card style="background-color: #F7F7F7;">
                            <div @click="affichage()"> 
                                <v-data-table fixed-header style="background-color: #F7F7F7;" :footer-props="{
                                    'items-per-page-options': [10, -1]
                                }" :items-per-page="30" height="45vh" :headers="headers" :items="organlist"
                                    :search="search">
                                </v-data-table>
                            </div>
                        </v-card>
                    </v-tab-item>
                    <!-- *****************************USER PROFILES******************************************** -->
                    <v-tab-item v-if="platformList[0]">
                        <div class="d-flex mt-2 mb-2">
                            <div class="sub-division">
                                <span class="subtitle-backbar">Nom</span>
                            </div>
                            <div class="sub-division">
                                <span class="subtitle-backbar">Id Profil Utilisateur</span>
                            </div>
                        </div>
                        <div v-for="item, index in platformList[0].userProfiles" :key="index" class="d-flex mt-2 mb-2">
                            <div class="sub-division">
                                <div class="information-backup-bar2">{{ item.name }}</div>
                            </div>
                            <div class="sub-division">
                                <div class="information-backup-bar2">{{ item.userProfileId }}</div>
                            </div>
                        </div>
                    </v-tab-item>
                    <!-- *****************************APP PROFILES******************************************** -->
                    <v-tab-item v-if="platformList[0]">
                        <div class="d-flex mt-2 mb-2">
                            <div class="sub-division">
                                <span class="subtitle-backbar">Nom</span>
                            </div>
                            <div class="sub-division">
                                <span class="subtitle-backbar">Id Profil D'application</span>
                            </div>
                        </div>
                        <div v-for="item, index in platformList[0].appProfiles" :key="index" class="d-flex mt-2 mb-2">
                            <div class="sub-division">
                                <div class="information-backup-bar2">{{ item.name }}</div>
                            </div>
                            <div class="sub-division">
                                <div class="information-backup-bar2">{{ item.appProfileId }}</div>
                            </div>
                        </div>
                    </v-tab-item>
                    <!-- *****************************USERS******************************************** -->
                    <v-tab-item v-if="platformList[0]">
                        <v-card style="background-color: #F7F7F7;">
                            <div @click="affichage()"> 
                                <v-data-table fixed-header style="background-color: #F7F7F7;" :footer-props="{
                                    'items-per-page-options': [10, -1]
                                }" :items-per-page="30" height="45vh" :headers="headers" :items="userListLinkPlatform"
                                    :search="search">
                                </v-data-table>
                            </div>
                        </v-card>
                    </v-tab-item>
                    <!-- *****************************APPS******************************************** -->
                    <v-tab-item v-if="platformList[0]">
                        <v-card style="background-color: #F7F7F7;">
                            <div @click="affichage()"> 
                                <v-data-table fixed-header style="background-color: #F7F7F7;" :footer-props="{
                                    'items-per-page-options': [10, -1]
                                }" :items-per-page="30" height="45vh" :headers="headers" :items="appListLinkPlatform"
                                    :search="search">
                                </v-data-table>
                            </div>
                        </v-card>
                    </v-tab-item>
                    <!-- *****************************LOGS******************************************** -->
                    <v-tab-item v-if="platformList[0]">
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
import StatutButton from "../Components/StatutButton.vue";
import Tabs from "../Components/Tabs.vue";
import BackupInformation from "../Components/BackupInformation.vue";
import FiltreBar from "../Components/FiltreBar.vue";
import { onMounted } from "vue";

export default {
    name: "App",
    components: {
        InformationBar,
        BackupInformation,
        StatutButton,
        Tabs,
        FiltreBar
    },
    data() {
        return {
            search: '',
            headers: [{ text: 'Nom', value: 'name' },
            { text: 'Date', value: 'date' },
            { text: 'Message', value: 'message' },
            { text: 'Acteur', value: 'actor.actorName' },
            { text: 'Id Acteur', value: 'actor.actorId' },],
            mounted: false,
            platformId: null,
            platform: {
                name: 'nom du BOS',
                url: 'url test',
                address: 'adress test',
                statusPlatform: 'online',
                TokenBosAdmin: '00000'
            },
            platformList: [
                {
                    appProfiles: {
                        appProfiles: {
                            name: "le nom de l'app profile",
                            appProfileId: ' id profil app'
                        },
                    },
                    userProfiles: {
                        userProfiles: {
                            name: 'test nm',
                            userProfileId: 'profil id'
                        }
                    }
                }
            ],
            userList: [],
            userListLinkPlatform: [
                {
                    name: "salut",
                    date: "18 nov 2022",
                    message: "le message important",
                    actor: {
                        actorId: "222",
                        actorName: "je suis la",
                    }
                },
            ],
            organlist: [
                {
                    name: "salut",
                    date: "18 nov 2022",
                    message: "le message important",
                    actor: {
                        actorId: "222",
                        actorName: "je suis la",
                    }
                },
            ],
            itemSelected: null,
            appList: [],
            appListLinkPlatform: [
                {
                    name: "la partie1",
                    date: "18 nov 2022",
                    message: "le message important",
                    actor: {
                        actorId: "22",
                        actorName: "je suis la",
                    }
                },
                {
                    name: "salut",
                    date: "18 nov 2022",
                    message: "le message important",
                    actor: {
                        actorId: "25482",
                        actorName: "je suis la",
                    }
                }
            ],
            logList: [
                {
                    name: "le test 01",
                    date: "18 nov 2022",
                    message: "le message important",
                    actor: {
                        actorId: "22",
                        actorName: "je suis la",
                    }
                },
                {
                    name: "le nom",
                    date: "14 nov 2022",
                    message: "le message important",
                    actor: {
                        actorId: "21842",
                        actorName: "je suis la",
                    }
                },
                {
                    name: "le nom",
                    date: "13 nov 2022",
                    message: "le message important",
                    actor: {
                        actorId: "218422",
                        actorName: "je suis la",
                    }
                },
                {
                    name: "ledeux",
                    date: "11 nov 2022",
                    message: "le message important",
                    actor: {
                        actorId: "218422",
                        actorName: "je suis la",
                    }
                },
                {
                    name: "ledeux",
                    date: "11 nov 2022",
                    message: "le message important",
                    actor: {
                        actorId: "218422",
                        actorName: "je suis la",
                    }
                },
                {
                    name: "ledeux",
                    date: "11 nov 2022",
                    message: "le message important",
                    actor: {
                        actorId: "218422",
                        actorName: "je suis la",
                    }
                },
            ],
            tab: null,
            items: [
                'ORGANES', "PROFILS D'UTILISATEURS", "PROFILS D'APPLICATIONS", 'UTILISATEURS', 'APPLICATIONS', 'LOGS',
            ],
        };
    },
    methods: {
        affichage() {
            var a = document.querySelector("#app > div.v-menu__content.theme--light.menuable__content__active");
            a.style.position = "fixed";
        },
    },
    mounted() {
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

#content > div > main > div > div.d-flex.flex-column.rounded-lg.backup-bar.v-card.v-sheet.theme--light.elevation-2 > div.v-tabs.v-tabs--grow.theme--light > div.v-window.v-item-group.theme--light.v-tabs-items > div > div.v-window-item.v-window-item--active > div > div > div.v-card__title > div{
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
    font-family: Arial, Helvetica, sans-serif;
    font-size: 11px;
    margin-bottom: 10px;
}

.bar-information {
    margin-bottom: 10px;
    font-size: 11px;
    letter-spacing: 1.1px;
    min-width: 80px;
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