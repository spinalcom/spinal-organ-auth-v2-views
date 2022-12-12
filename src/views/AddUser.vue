<template>
  <v-app>
    <v-main>
      <BachupInformation style="max-height: 87vh;" title="AJOUTER UN UTILISATEUR">
        <form class="formulaire" novalidate @submit.prevent="validateUser">
          <p style="margin: 0;">Rentrez les informations de l’utilisateur. </p>
          <p style="margin: 0;">Un e-mail lui sera envoyé pour confirmer son inscription.</p>
          <InputUser title="NOM DE L'UTILISATEUR" id="userName" v-model="formUser.userName" />
          <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formUser.userName.required">Un nom est
            requis</span>
          <span class="errors" :class="{ 'showspan': iserrors }" v-else-if="!$v.formUser.userName.minLength">Le nom est
            invalide</span>
          <InputPass title="MOT DE PASSE" id="password" v-model="formUser.password" />
          <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formUser.password.required">Le mot de passe
            est obligatoire.</span>
          <span class="errors" :class="{ 'showspan': iserrors }" v-else-if="!$v.formUser.password.minLength">Mot de
            passe invalide</span>
          <InputPass title="COMFIRMER MOT DE PASSE" id="confirmPassword" v-model="formUser.confirm_password" />
          <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formUser.confirm_password.required">La
            confirmation de mot de passe est obligatoire.</span>
          <span class="errors" :class="{ 'showspan': iserrors }" v-else-if="!$v.formUser.confirm_password.minLength">Mot
            de passe invalide</span>
          <InputUser title="EMAIL" id="Email" v-model="formUser.email" />
          <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formUser.email.required">Un Email est
            requis</span>
          <InputUser title="TELEPHONE" id="telephone" v-model="formUser.telephone" />
          <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formUser.telephone.required">Un numero de
            téléphone est requis</span>
          <span class="errors" :class="{ 'showspan': iserrors }" v-else-if="!$v.formUser.telephone.numeric">Le numéro de
            téléphone doit être composé uniquement de chiffre.</span>
          <span class="errors" :class="{ 'showspan': iserrors }" v-else-if="!$v.formUser.telephone.minLength">Le numero
            de telephone est invalide</span>
          <TextareaUser title="INFORMATION" id="information" v-model="formUser.info" />
          <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formUser.info.required">Une information est
            requise</span>
          <SelectUser title="TYPE D'UTILISATEUR" id="userType" :tab="userType" v-model="formUser.userType" />
          <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.formUser.userType.required">
            The user type is required
          </span>
          <div class="mt-6">
            <span> Sélectionner les accès de l'utilisateur</span>
          </div>
          <AddPlatform ref="refplatform" />
          <span style="position: absolute;margin-top:-45px;" class="errors" :class="{ 'showspan': !error_platform }">
            Les accès aux utilisateurs sont incorrects.
          </span>
          <div class="d-flex justify-end">
            <button class="btn-retour" @click="cancelAdd()">RETOUR</button>
            <button type="submit" class="btn-creer">CRÉER L'UTILISATEUR</button>
          </div>
        </form>
      </BachupInformation>
    </v-main>
  </v-app>
</template>

<script >
import InputUser from "../Components/InputUser";
import SelectUser from "../Components/SelectUser.vue";
import TextareaUser from "../Components/TextareaUser.vue";
import BachupInformation from "../Components/BackupInformation.vue";
import InputPass from "../Components/InputPassword";
import AddPlatform from "../Components/AddPlatform";
import { validationMixin } from "vuelidate";
import { required, email, minLength, numeric } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  components: {
    InputUser,
    SelectUser,
    TextareaUser,
    BachupInformation,
    InputPass,
    AddPlatform
  },

  data() {
    return {
      formUser: {
        userName: null,
        password: null,
        confirm_password: null,
        telephone: null,
        email: null,
        info: null,
        userType: null,
      },
      error_platform: false,
      iserrors: true,
      userType: [{
        name: 'salut'
      }],
    };
  },

  validations: {
    formUser: {
      userName: {
        required,
        minLength: minLength(3)
      },
      password: {
        required,
        minLength: minLength(8)
      },
      confirm_password: {
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
    },
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
    },
    ttoto() {

      console.log(this.error_platform);
    }
  },
}
</script>

<style scoped>
.errors {
  margin: 0;
  position: absolute;
  transform: translate(0, -10%);
  font-size: 10px;
  color: red;
  padding-left: 2px;
  letter-spacing: 1.1px;
}

.v-application {
  background-color: #d6e2e600;
}

.btn-retour {
  border: 1px solid #14202C;
  border-radius: 6px;
  opacity: 1;
  width: 120px;
  height: 40px;
  margin-right: 5px;
  margin-top: 20px;
  font-size: 10px;
  letter-spacing: 1.1px;
  transition: 0.1s;
}

.btn-retour:hover {
  background-color: #e2e2e2;
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
  font-size: 10px;
  letter-spacing: 1.1px;
  transition: 0.1s;
  border: 1px solid #14202C;
  transition: 0.1s;
}

.btn-creer:hover {
  background-color: #e2e2e2;
  color: #14202C;
}

.showspan {
  display: none;
}

.formulaire {
  padding-left: 25%;
  padding-right: 25%;
  padding-bottom: 20px;
  font-size: 14px;
}

.showspan {
  display: none;
}
</style>