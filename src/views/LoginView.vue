<template>
    <v-container class="login">
        <v-card class="pa-8">
            <v-text-field
                    v-model="user.email"
                    :rules="[rules.required]"
                    label="Email"
            ></v-text-field>
            <v-text-field
                    v-model="user.password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required]"
                    :type="show ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    counter
                    @click:append="show = !show"
            ></v-text-field>
            <v-btn class="background-orange" @click="login()" :disabled="this.user.email == null || this.user.password == null">
                Log In
            </v-btn>
        </v-card>

    </v-container>
</template>
<script>
    import { mapActions } from "vuex";

    export default {
        name: "LoginView",
        components: {},
        data: () => ({
            user: {
                email: null,
                password: null,
            },
            show: false,
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters'
            },
        }),
        methods: {
            ...mapActions({
                loginAction: 'security/login'
            }),
            login() {
                this.loginAction(this.user)
            }
        }
    }
</script>
