<template>
    <v-app>
        <v-main>
            <BackupInformation title="AJOUTER UNE APPLICATION">
                <form class="formulaire" novalidate @submit.prevent="validateApp">
                    <p>Rentrez les informations de l’application.</p>
                    <InputUser title="NOM DE L'APPLICATION" id="appName" v-model="formApp.appName" />
                    <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formApp.appName.minLength">Nom
                        invalide</span>
                    <span class="errors" :class="{ 'showspan': iserrors }" v-else-if="!$v.formApp.appName.required">Un
                        nom d'application est requis</span>
                    <InputPass title="CLIENT ID" id="clientId" v-model="formApp.clientId" />
                    <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formApp.clientId.required">un id
                        client est requis</span>
                    <InputPass title="CLIENT SECRET" id="clientSecret" v-model="formApp.clientSecret" />
                    <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formApp.clientSecret.required">Le
                        mot de passe est nécessaire</span>
                    <InputUser title="TYPE D’APPLICATION" id="appType" v-model="formApp.appType" />
                    <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formApp.appType.required">Le type
                        d'application est nécessaire</span>
                    <p class="mt-6">Sélectionnez les accès de plateformes.</p>
                    <AddPlatform ref="refplatform" />
                    <span style="position: absolute;margin-top:-45px;" class="errors" :class="{ 'showspan': !error_platform }">
                        Les accès aux utilisateurs sont incorrects.
                    </span>
                    <div class="d-flex justify-end">
                        <button class="btn-retour" @click="cancelAdd()">RETOUR</button>
                        <button type="submit" class="btn-creer">CRÉER L’APPLICATION</button>
                    </div>
                </form>
            </BackupInformation>
        </v-main>
    </v-app>
</template>
  
<script>
import InputUser from "../Components/InputUser";
import InputPass from "../Components/InputPassword";
import AddPlatform from "../Components/AddPlatform.vue";
import BackupInformation from "../Components/BackupInformation.vue";
import { validationMixin } from "vuelidate";
import { required, email, minLength, numeric } from "vuelidate/lib/validators";

export default {
    mixins: [validationMixin],
    components: {
        InputUser,
        InputPass,
        AddPlatform,
        BackupInformation
    },
    data() {
        return {
            formApp: {
                appName: null,
                clientId: 'this.generateRegisterKey()',
                clientSecret: 'this.generateRegisterKey()',
                appType: null,
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
.btn-retour {
    border: 1px solid #14202C;
    border-radius: 6px;
    opacity: 1;
    width: 120px;
    height: 40px;
    margin-right: 5px;
    margin-top: 20px;
    font: normal normal normal 11px/13px Charlevoix Pro;
    letter-spacing: 1.1px;
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
    margin: 0;
    position: absolute;
    /* background-color: red; */
    /* position: absolute; */
    transform: translate(0, -10%);
    font-size: 10px;
    color: red;
    padding-left: 2px;
    letter-spacing: 1.1px;
}

.error {
    position: absolute;
    color: rgb(255, 0, 0);
    font: normal normal normal 11px/13px Charlevoix Pro;
}

.showspan {
    display: none;
}

.v-application {
    background-color: #21435300;
}

.formulaire {
    padding-left: 25%;
    padding-right: 25%;
    padding-bottom: 20px;
    font-size: 14px;
}
</style>