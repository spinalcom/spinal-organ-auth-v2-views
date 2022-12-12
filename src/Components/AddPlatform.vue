<template>
    <div>
        <div @click="testplat()" v-for="(item, index) in nbPlatform" :key="item" class="ajout-platform">
            <div class="selector">
                <SelectUser class="platform" :tab="platformList" v-model="formPlatformObject.plat[index]" title="PLATFORM" />
                <SelectUser class="profilut" :tab="userList" v-model="formPlatformObject.user[index]" title="PROFIL UTILISATEUR" />
            </div>
            <button @click="delplatform()" type="button" class="red-cross">X</button>
        </div>
        <div class="d-flex justify-end">
            <button @click="addplatform()" type="button" class="btn-ajout-platform">+ AJOUT D'UNE PLATFORME</button>
        </div>
    </div>
</template>

<script>
import SelectUser from "../Components/SelectUser.vue";
export default {
    name: "add-platform",
    components: {
        SelectUser,
    },
    data() {
        return {
            nbPlatform: 1,
            input: '',
            formPlatformObject: {
                platform: [],
                userProfileValue: null,
                plat : [],
                user : []
            },
            platformList: [
                {
                    name: 'platform1',
                },
                {
                    name: 'platform2',
                }
            ],
            userList: [
                {
                    name: 'jean',
                },
                {
                    name: 'lucas',
                }
            ],
        };
    },
    methods: {
        addplatform() {
            this.nbPlatform++;
            this.formPlatformObject.plat.push([]);
            this.formPlatformObject.user.push([]);
        },
        delplatform() {
            this.nbPlatform--;
            this.formPlatformObject.plat.pop();
            this.formPlatformObject.user.pop();
        },
        testplat() {
            // console.log(this.formPlatformObject.plat);
            // var listplatform = document.getElementsByClassName('platform')
            // var listprofil = document.getElementsByClassName('profilut')
            // let array = []
            // for (let i = 0; i < listplatform.length; i++) {
            //     array.push([listplatform[i].children[1].value, listprofil[i].children[1].value])
            // }
            // for (let j = 0; j < array.length; j++) {
            //     var platform_copie = 0;
            //     var platform_el = array[j][0];
            //     for (let y = 0; y < array.length; y++) {
            //         if (platform_el == array[y][0]) {
            //             platform_copie++;
            //         }
            //     }
            // }
            // if (platform_copie > 1) {
            //     alert('platform non unique')
            //     platform_copie = 0;
            //     this.nbPlatform--;
            //     this.formPlatformObject.plat.pop();
            //     this.formPlatformObject.user.pop();
            // }
        }
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
    background: #EAEEF0;
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