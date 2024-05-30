<template>
    <v-container>
        <v-card v-if="product" class="ma-3"  width="100%">
            <h1>{{product.title}}</h1>
            <v-form>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="product.title" :rules="textRules" label="Title" hide-details required></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-textarea v-model="product.description" label="Description" hide-details></v-textarea>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="product.price" type="number" label="Price" min="0"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-select v-model="product.vat" label="VAT" :items="[20.0,10.0,5.5]"></v-select>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-btn @click="create()" class="background-orange">Save</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-card>
    </v-container>
</template>
<script>
    import { mapActions } from "vuex";

    export default {
        name: "CreateProductView",
        data: () => ({
            product: {
                title: null,
                description: null,
                price: null,
                vat: null
            },
            textRules: [
                value => {
                    if (value) return true
                    return 'You must complete this field.'
                },
            ],
        }),
        methods: {
            ...mapActions({
                createProduct: 'products/create',
            }),
            create() {
                let data = this.product
                data.price = this.product.price * 100
                this.createProduct(data)
            },
        },
    }
</script>

