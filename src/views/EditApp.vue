<template>
    <v-app>
        <v-main>
            <BachupInformation title="EDIT APP">
                <form class="formulaire" novalidate @submit.prevent="validateApp">
                    <InputUser title="NOM DE L'APPLICATION" id="telephone" v-model="formApp.name" />
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
                    <AddPlatform ref="refplatform"/>
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
                name: null,
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

        validateApp() {

            this.$v.$touch();

            this.error_platform = false;
            var tab_platform = this.$refs.refplatform.$data.formPlatformObject.plat;
            for (let y = 0; y < tab_platform.length; y++) {
                for (let z = y + 1; z < tab_platform.length; z++) {
                    if (tab_platform[y] == tab_platform[z]) {
                        this.error_platform = true;
                    }
                }
            }

            if (!this.$v.$invalid && this.error_platform == false) {
                console.log('valid form');
            } else {
                this.iserrors = false;
            }
        }
    },
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