<template>
    <v-container>
        <ConfirmDialog ref="confirm"></ConfirmDialog>
        <v-card class="ma-3 text-right" style="background-color: transparent; border:none; box-shadow: none" width="100%">
            <v-btn class="background-orange ma-3" to="/product/new">Nouveau produit</v-btn>
        </v-card>
        <v-card class="ma-3" v-if="products" width="100%">
            <v-simple-table dense >
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-center">Title</th>
                            <th class="text-center">Price</th>
                            <th class="text-center">VAT</th>
                            <th class="text-center">Stock</th>
                            <th class="text-center">Update</th>
                            <th class="text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product.id">
                            <td>{{ product.title }}</td>
                            <td>{{ product.price|formatPrice }}</td>
                            <td>{{ product.vat }}</td>
                            <td>{{ product.quantity }}</td>
                            <td>
                                <router-link v-bind:to='"/product/" + product.id'><v-icon>mdi-square-edit-outline</v-icon></router-link>
                            </td>
                            <td>
                                <a @click="deleteProduct(product)"><v-icon>mdi-delete</v-icon></a>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card>
        <v-container>
            <v-row justify="center">
                <v-col  cols="8">
                    <v-container class="max-width">
                        <v-pagination color="#ff9922" :total-visible="7" @input="next" v-model="page" class="my-4" :length="total"></v-pagination>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>
<script>
    import { mapActions } from "vuex";
    import ConfirmDialog from "../components/ConfirmDialog";

    export default {
        name: "ProductsView",
        components: {ConfirmDialog},
        data: () => ({
            page: 1
        }),
        computed: {
            total () { return this.$store.state.products.pagination.total },
            products () { return this.$store.state.products.all },
            paginationData () { return this.$store.state.products.pagination }
        },
        filters: {
            formatPrice(value) {
                return (value / 100).toLocaleString("fr-FR", {style:"currency", currency:"EUR"})
            }
        },
        methods: {
            ...mapActions({
                getAllProducts: 'products/getAll',
                removeProduct: 'products/remove',
            }),
            next (page) {
                this.page = page
                this.getAllProducts(this.page)
            },
            seeProducts() {
            },
            async deleteProduct(product) {
                if (await this.$refs.confirm.open("Deleting a product", "Are you sure you want to delete the product " + product.title + " ? ")) {
                    this.removeProduct(product.id)
                }
            },
        },
        created() {
            this.getAllProducts(this.page)
        }
    }
</script>
