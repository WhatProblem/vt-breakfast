import Vue from "vue";
import axios, { AxiosInstance } from "axios";

declare module 'vue/types/vue' {
    interface Vue {
        $axios: AxiosInstance
    }

    interface VueConstructor {
        $axios: AxiosInstance
    }
}