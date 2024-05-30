<template>
    <div id="app">
        <v-app id="inspire">
            <v-progress-circular v-if="loaderIsActive" id="loader" :size="100" :width="10" color="gray" indeterminate></v-progress-circular>
            <v-overlay :value="loaderIsActive"></v-overlay>
            <v-navigation-drawer v-model="drawer" app clipped>
                <v-list dense>
                    <v-list-item  to="/products">
                        <v-list-item-action >
                            <v-icon>mdi-package-variant-closed</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Products</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item  to="/stocks">
                        <v-list-item-action >
                            <v-icon>mdi-history</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Stock History</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item  @click="logoutAction()">
                        <v-list-item-action>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-app-bar app>
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title>Welcome on Stock Manager</v-toolbar-title>
                <FlashMessage style="z-index: 1000" :position="'right top'"/>
                <v-spacer></v-spacer>
                <v-btn class="float-right" @click="logoutAction()"> Se déconnecter</v-btn>
            </v-app-bar>
            <v-main>
                <v-container fluid>
                    <router-view></router-view>
                </v-container>
            </v-main>
            <v-footer absolute :padless=true>
                <v-card flat tile width="100%" class="black lighten-1 text-center">
                    <v-card-text class="white--text">
                        <strong>{{ new Date().getFullYear() }} — Stock Manager — Made with <v-icon color="red">mdi-cards-heart</v-icon> by Arnaud Ponel</strong>
                    </v-card-text>
                </v-card>
            </v-footer>
        </v-app>
    </div>

</template>

<style lang="scss">

</style>

<script>
    import {mapActions} from "vuex";

    export default {
        name: 'App',
        data() {
            return {
                drawer : false,
            }
        },
        methods: {
            ...mapActions({
                logout: 'security/logout',
            }),
            logoutAction() {
                this.logout()
            }
        },
        created () {
        },
        computed: {
            loggedIn () { return this.$store.state.security.user !== null },
            loaderIsActive () { return this.$store.state.loader.isActive },
        },
    }
</script>
