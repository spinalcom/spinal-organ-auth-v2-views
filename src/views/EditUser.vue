<template>
    <v-app>
        <v-main>
            <BachupInformation title="EDIT USER">
                <form class="formulaire" novalidate @submit.prevent="validateUser">
                    <InputUser title="NOM D'UTILISATEUR" id="telephone" v-model="formUser.userName" />
                    <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formUser.userName.required">Un nom
                        est
                        requis</span>
                    <span class="errors" :class="{ 'showspan': iserrors }"
                        v-else-if="!$v.formUser.userName.minLength">Le nom est
                        invalide</span>
                    <InputPass title="ANCIEN MOT DE PASSE" id="password" v-model="formUser.oldPassword" />
                    <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formUser.oldPassword.required">Le
                        mot
                        de passe
                        est obligatoire.</span>
                    <span class="errors" :class="{ 'showspan': iserrors }"
                        v-else-if="!$v.formUser.oldPassword.minLength">Mot de
                        passe invalide</span>
                    <InputPass title="NOUVEAU MOT DE PASSE" id="password" v-model="formUser.password" />
                    <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formUser.password.required">La
                        confirmation de mot de passe est obligatoire.</span>
                    <span class="errors" :class="{ 'showspan': iserrors }"
                        v-else-if="!$v.formUser.password.minLength">Mot
                        de passe invalide</span>
                    <InputUser title="EMAIL" id="email" v-model="formUser.email" />
                    <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formUser.email.required">Un Email
                        est
                        requis</span>
                    <InputUser title="TELEPHONE" id="telephone" v-model="formUser.telephone" />
                    <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formUser.telephone.required">Un
                        numero de
                        téléphone est requis</span>
                    <span class="errors" :class="{ 'showspan': iserrors }" v-else-if="!$v.formUser.telephone.numeric">Le
                        numéro de
                        téléphone doit être composé uniquement de chiffre.</span>
                    <span class="errors" :class="{ 'showspan': iserrors }"
                        v-else-if="!$v.formUser.telephone.minLength">Le numero
                        de telephone est invalide</span>
                    <InputUser title="INFO" id="info" v-model="formUser.info" />
                    <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formUser.info.required">Une
                        information est
                        requise</span>
                    <SelectUser title="TYPE D'UTILISATEUR" id="userType" :tab="userType" v-model="formUser.userType" />
                    <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formUser.userType.required">
                        The user type is required
                    </span>
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
import SelectUser from "../Components/SelectUser.vue";
import AddPlatform from "../Components/AddPlatform";
import { validationMixin } from "vuelidate";
import { required, email, minLength, numeric } from "vuelidate/lib/validators";

export default {
    components: {
        BachupInformation,
        InputUser,
        InputPass,
        SelectUser,
        AddPlatform
    },
    data() {
        return {
            formUser: {
                userName: null,
                oldPassword: null,
                password: null,
                telephone: null,
                email: null,
                info: null,
                userType: null
            },
            userType: [],
            iserrors: true,
            error_platform: false,
        };
    },
    validations: {
        formUser: {
            userName: {
                required,
                minLength: minLength(3)
            },
            oldPassword: {
                required,
                minLength: minLength(8)
            },
            password: {
                required,
                minLength: minLength(8)
            },
            email: {
                required,
                email
            },
            info: {
                required,
            },
            telephone: {
                required,
                numeric,
                minLength: minLength(8)
            },
            userType: {
                required
            }
        }
    },
    methods: {
        cancelAdd() {
            this.$router.push("/Users");
        },

        validateUser() {
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