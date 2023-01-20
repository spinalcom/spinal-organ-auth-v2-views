/*
 * Copyright 2023 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */
import { tokenGen } from "@/router/genToken.js";
const instanceAxios = require("../services/axiosConfig");
import router from "../router"
export default {
    namespaced: true,
    state: {
        data: []
    },
    getters: {
        dataList: state => state.data
    },
    actions: {
        async login(context,formuser) {
            try {
                console.log(formuser.userName);
                await tokenGen(formuser.userName, formuser.password);
                router.push("/");
                console.log("la fonction login est lancé ici " + formuser.userName + " et le mdp : " + formuser.password);
            } catch (error) {
                console.log(error);
            }
        },
        async getUsers() {
            const rep = await instanceAxios.instanceAxios.get("/users", {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("token"),
                }
            });
            console.log(rep.data);
        }
    },
    mutations: {
        setData: (state, data) => (
            state.data = data
        )
    }
}