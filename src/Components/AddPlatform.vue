<template>
    <div>
        <div v-if="types == 'user'">
            <div v-for="(item, index) in nbPlatform" :key="item" class="ajout-platform"
                :style="disableobjet[index].plat == true ? 'background : #e6f3ed' : ''" :id="index">
                <div class="selector">
                    <SelectUser :id=index class="platform" @change.native="getuserfromplatform()" :tab="platformList"
                        v-model="formPlatformObject.platform" title="PLATFORM"
                        :disabled="disableobjet[index] ? disableobjet[index].plat == true ? true : false : false" />
                    <SelectUser @change.native="" :id=index class="profilut"
                        :disabled="disableobjet[index] ? disableobjet[index].plat == true ? true : false : false"
                        :tab="userProfileList" v-model="formPlatformObject.userProfileValue"
                        title="PROFIL UTILISATEUR" />
                </div>
                <button @click="deletePlatformObjectitem(index)" type="button" class="red-cross">X</button>
            </div>
            <div class="d-flex justify-end">
                <button @click="addplatform()" type="button" class="btn-ajout-platform">+ AJOUT D'UNE
                    PLATFORME</button>
            </div>
        </div>
        <div v-if="types == 'app'">
            <div v-for="(item, index) in nbPlatform" :key="item" class="ajout-platform"
                :style="disableobjet[index].plat == true ? 'background : #e6f3ed' : ''" :id="index">
                <div class="selector">
                    <SelectUser :id=index class="platform" @change.native="getAppProfileList()" :tab="platformList"
                        v-model="formPlatformObjectapp.platform" title="PLATFORM"
                        :disabled="disableobjet[index] ? disableobjet[index].plat == true ? true : false : false" />
                    <SelectUser @change.native="" :id=index class="profilut"
                        :disabled="disableobjet[index] ? disableobjet[index].plat == true ? true : false : false"
                        :tab="userProfileList" v-model="formPlatformObjectapp.userProfileValue"
                        title="PROFIL UTILISATEUR" />
                </div>
                <button @click="deletePlatformObjectitemapp(index)" type="button" class="red-cross">X</button>
            </div>
            <div class="d-flex justify-end">
                <button @click="addplatformapp()" type="button" class="btn-ajout-platform">+ AJOUT D'UNE
                    PLATFORME</button>
            </div>
        </div>
    </div>

</template>

<script>
import SelectUser from "../Components/SelectUser.vue";
import { mapActions, mapGetters } from "vuex";
export default {
    name: "add-platform",
    components: {
        SelectUser,
    },
    props: ['types','tab'],
    data() {
        return {
            nbPlatform: 1,
            formPlatformObject: {
                platform: [],
                userProfileValue: null,
                plat: [],
            },
            formPlatformObjectapp: {
                platform: [],
                appProfileValue: null
            },
            userProfileList: [],
            appProfileList: [],

            disableobjet: [
                {
                    plat: false,
                }
            ],
            userList: [],
            platformObjectList: [],
        };
    },
    methods: {
        detailPlatform(tab){
            // console.log(tab);
            if(this.types == 'user'){
                this.nbPlatform = tab.length
            }else{

            }
        },

        async maFonction() {
            if (this.types == "user") {
                if (this.formPlatformObject.platform.name != undefined && this.formPlatformObject.userProfileValue.name != undefined) {
                    this.addplatform();
                }
            }else if(this.types == "app"){
                if (this.formPlatformObjectapp.platform.name != undefined && this.formPlatformObjectapp.appProfileValue.name != undefined) {
                    this.addplatformapp();
                }
            }
        },
        ...mapActions({
            lafonction: 'users/lafonction',
            lafonctionapp: 'applications/lafonctionapp'
        }),


        addplatform() {
            var test = true;
            var plat = true;
            for (const platformObject of this.platformObjectList) {
                if (platformObject.platformId === this.formPlatformObject.platform.id) {
                    alert("you cannot select platform even twice");
                    this.formPlatformObject.platform = [];
                    this.formPlatformObject.userProfileValue = null;
                    test = false;
                    plat = false;
                    this.nbPlatform--;
                    this.disableobjet.splice(-1, 1);
                }
            }
            if (test === true && this.formPlatformObject.platform.name != undefined) {
                this.platformObjectList.push({
                    platformId: this.formPlatformObject.platform.id,
                    platformName: this.formPlatformObject.platform.name,
                    userProfile: {
                        name: this.formPlatformObject.userProfileValue.name,
                        userProfileId: this.formPlatformObject.userProfileValue
                            .userProfileId
                    }
                });
                this.formPlatformObject.platform = [];
                this.formPlatformObject.userProfileValue = null;
            }
            if (plat == true) {
                this.nbPlatform++;
                this.disableobjet[this.disableobjet.length - 1].plat = true;
                this.disableobjet.push({
                    plat: false,
                })
            }
            this.lafonction(this.platformObjectList);
        },


        addplatformapp() {
            var test = true;
            var plat = true;
            for (const platformObject of this.platformObjectList) {
                if (platformObject.platformId === this.formPlatformObjectapp.platform.id) {
                    alert("you cannot select platform even twice");
                    this.formPlatformObjectapp.platform = [];
                    this.formPlatformObjectapp.appProfileValue = null;
                    test = false;
                    plat = false;
                    this.nbPlatform--;
                    this.disableobjet.splice(-1, 1);
                }
            }
            if (test === true && this.formPlatformObjectapp.platform.name != undefined) {
                this.platformObjectList.push({
                    platformId: this.formPlatformObjectapp.platform.id,
                    platformName: this.formPlatformObjectapp.platform.name,
                    appProfile: {
                        name: this.formPlatformObjectapp.appProfileValue.name,
                        appProfileId: this.formPlatformObjectapp.appProfileValue.appProfileId
                    }
                });
                this.formPlatformObjectapp.platform = [];
                this.formPlatformObjectapp.appProfileValue = null;
            }
            if (plat == true) {
                this.nbPlatform++;
                this.disableobjet[this.disableobjet.length - 1].plat = true;
                this.disableobjet.push({
                    plat: false,
                })
            }
            this.lafonctionapp(this.platformObjectList);
        },

        deletePlatformObjectitem(index) {
            document.getElementById(index).style.display = "none";
            this.platformObjectList.splice(index, 1);
            this.disableobjet[index].plat = false;
            this.formPlatformObject.platform = [];
            this.formPlatformObject.userProfileValue = null;
        },

        deletePlatformObjectitemapp(index) {
            document.getElementById(index).style.display = "none";
            this.platformObjectList.splice(index, 1);
            this.disableobjet[index].plat = false;
            this.formPlatformObjectapp.platform = [];
            this.formPlatformObjectapp.userProfileValue = null;
        },

        async getuserfromplatform() {
            var id = this.formPlatformObject.platform.id
            this.userProfileList = await this.$store.dispatch('users/getUserProfileList', id);
        },

        async getAppProfileList() {
            var id = this.formPlatformObjectapp.platform.id
            this.appProfileList = await this.$store.dispatch('applications/getAppProfileList', id);
        },

        getDataFromStore() {
            this.$store.dispatch('users/getplatformList');
        }

    },
    computed: {
        ...mapGetters({
            platformList: 'users/platformList',

        }),
    },
    created() {
        this.getDataFromStore();
    },
    

};
</script>
  
<style>
.ajout-platform {
    margin-top: 20px;
    background: #EAEEF0;
    border-radius: 10px;
    display: flex;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    -webkit-animation: slide-in-fwd-center 0.7s cubic-beplatform_copieier(0.250, 0.460, 0.450, 0.940) both;
    animation: slide-in-fwd-center 0.7s cubic-beplatform_copieier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes slide-in-fwd-center {
    0% {
        -webkit-transform: translateplatform_copie(-1400px);
        transform: translateplatform_copie(-1400px);
        opacity: 0;
    }

    100% {
        -webkit-transform: translateplatform_copie(0);
        transform: translateplatform_copie(0);
        opacity: 1;
    }
}

@keyframes slide-in-fwd-center {
    0% {
        -webkit-transform: translateplatform_copie(-1400px);
        transform: translateplatform_copie(-1400px);
        opacity: 0;
    }

    100% {
        -webkit-transform: translateplatform_copie(0);
        transform: translateplatform_copie(0);
        opacity: 1;
    }
}

.btn-ajout-platform {
    border: 0px;
    height: 40px;
    margin-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 6px;
    background: #EAEEF0;
    font: normal normal normal 11px/13px Charlevoix Pro;
    letter-spacing: 1.1px;
}

.red-cross {
    margin-top: 22px;
    margin-left: 10px;
    border-radius: 10px;
    height: 42px;
    width: 45px;
    color: orangered;
    border: 1px solid orangered;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-siplatform_copiee: 15px;
    padding-top: 2px;
    transition: 0.2s;
}

.red-cross:hover {
    background: #EF5F32;
    color: #ffffff;
    border: 1px solid #ffffff;
}

.selector {
    position: relative;
    width: 100%;
}

.btn-ajout-platform {
    border: 0px;
    height: 40px;
    margin-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 6px;
    background: #ebf0ea;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 1.3px;
    font-siplatform_copiee: 10px;
    transition: 0.2s;
}

.btn-ajout-platform:hover {
    background-color: rgb(189, 189, 189);
    /* color: white; */
}
</style>