<template>
    <v-app>
        <v-main>
            <BachupInformation title="EDIT APP">
                <form class="formulaire" novalidate @submit.prevent="validateApp">
                    <InputUser title="NOM DE L'APPLICATION" id="telephone" v-model="formApp.appName" />
                    <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formApp.appName.minLength">Nom
                        invalide</span>
                    <span class="errors" :class="{ 'showspan': iserrors }" v-else-if="!$v.formApp.appName.required">Un
                        nom d'application est requis</span>
                    <InputPass title="ID DU CLIENT" id="clientId" v-model="formApp.clientId" />
                    <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formApp.clientId.required">un id
                        client est requis</span>
                    <InputPass title="SECRET CLIENT" id="clientSecret" v-model="formApp.clientSecret" />
                    <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formApp.clientSecret.required">Le
                        mot de passe est nécessaire</span>
                    <InputUser title="TYPE D'APPLICATION" id="type" v-model="formApp.appType" />
                    <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formApp.appType.required">Le Type
                        d'appication est nécessaire</span>
                    <AddPlatform :types="'app'" ref="refplatform"/>
                    <span style="position: absolute;margin-top:-45px;" class="errors" :class="{ 'showspan': !error_platform }">
                        Les accès aux utilisateurs sont incorrects.
                    </span>
                    <div class="d-flex justify-end">
                        <div class="btn-retour" @click="cancelAdd()">RETOUR</div>
                        <button type="submit" class="btn-creer">MODIFIER L'UTILISATEUR</button>
                    </div>
                </form>
            </BachupInformation>
        </v-main>
    </v-app>
</template>

<script>
import BachupInformation from "../Components/BackupInformation.vue";
import InputUser from "../Components/InputUser";
import InputPass from "../Components/InputPassword";
import AddPlatform from "../Components/AddPlatform";
import { validationMixin } from "vuelidate";
import { required, email, minLength, numeric } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "App",
    components: {
        BachupInformation,
        InputUser,
        InputPass,
        AddPlatform,
    },
    data() {
        return {
            formApp: {
                appName: null,
                clientId: 'this.generateRegisterKey()',
                clientSecret: 'this.generateRegisterKey()',
                appType: null
            },
            iserrors: true,
            error_platform: false,
        };

    },
    validations: {
        formApp: {
            appName: {
                required,
                minLength: minLength(3)
            },
            clientId: {
                required,
            },
            clientSecret: {
                required,
            },
            appType: {
                required,
            },
        }
    },
    methods: {
        cancelAdd() {
            this.$router.push("/Users");
        },

        async updateAppForm() {
           await this.$store.dispatch('applications/getApp', this.$route.query.id);
            console.log(this.detailApp);
            this.formApp.appName = this.detailApp.name;
            this.formApp.clientId = this.detailApp.clientId;
            this.formApp.clientSecret = this.detailApp.clientSecret;
            this.formApp.appType = this.detailApp.appType;
        },

        ...mapActions({ updateApp: 'applications/updateApp' }),


        async validateApp() {
            await this.$refs.refplatform.maFonction();
            this.$v.$touch();

            if (!this.$v.$invalid ) {
                console.log('valid form');
                var objectBody = {
                    name: this.formApp.appName,
                    clientId: this.formApp.clientId,
                    clientSecret: this.formApp.clientSecret,
                    appType: this.formApp.appType,
                    platformList: this.platformObjectList.map(el => {
                        return {
                            platformId: el.platformId,
                            appProfile: {
                                name: el.appProfile.name,
                                appProfileId: el.appProfile.appProfileId
                            }
                        };
                    })
                }
                var profile = [objectBody,this.$route.query.id];
                this.updateApp(profile);
            } else {
                this.iserrors = false;
            }
        }
    },
    computed: {
        ...mapGetters({
            detailApp: 'applications/detailApp',
            platformObjectList: 'applications/selectedplatformObjectList',
        }),
    },
    created() {
        this.updateAppForm()
    }
}
</script>
  
<style scoped>
.v-application {
    background-color: #d6e2e600;
}

.formulaire {
    padding-left: 25%;
    padding-right: 25%;
    padding-bottom: 20px;
}

.btn-retour {
    border: 1px solid #14202C;
    border-radius: 6px;
    width: 120px;
    height: 40px;
    margin-right: 5px;
    margin-top: 20px;
    font: normal normal normal 11px/13px Charlevoix Pro;
    letter-spacing: 1.1px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.btn-creer {
    border: 0px;
    padding-left: 30px;
    padding-right: 30px;
    background: #14202C;
    border-radius: 6px;
    color: white;
    margin-left: 5px;
    margin-top: 20px;
    font: normal normal normal 11px/13px Charlevoix Pro;
    letter-spacing: 1.1px;
}

.errors {
    position: absolute;
    color: rgb(255, 0, 0);
    font: normal normal normal 11px/13px Charlevoix Pro;
}

.showspan {
    display: none;
}
</style>