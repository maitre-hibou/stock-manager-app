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
                            <v-text-field   :value="product.price/100" v-model="product.price" type="number" label="Price" min="0"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-select v-model="product.vat" label="VAT" :items="[20.0,10.0,5.5]"></v-select>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-btn @click="update()" class="background-orange">Save</v-btn>
                            <v-btn class="ma-4" to="/products">Return</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-card>
        <v-card v-if="product" class="ma-3 pa-4"  width="100%">
            <h1>Stock</h1>
            <h2>Current stock : {{ product.quantity }}</h2>
            <v-card class="ma-8 pa-6">
                <v-row>
                    <v-col cols="4" md="4">
                        <v-select v-model="newStock.direction" label="Direction" :items="['out', 'in']"></v-select>
                    </v-col>
                    <v-col cols="4" md="4">
                        <v-text-field v-model="newStock.quantity" type="number" label="Quantity" min="1"></v-text-field>
                    </v-col>
                    <v-col cols="4" md="4">
                        <v-btn @click="record()" class="background-orange">Record movement</v-btn>
                    </v-col>
                </v-row>
            </v-card>

            <v-simple-table dense >
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-center">Date</th>
                            <th class="text-center">Action</th>
                            <th class="text-center">Quantity</th>
                        </tr>
                    </thead>
                    <tbody v-if="stocks">
                        <tr v-for="stock in stocks" :key="stock.id">
                            <td><p>{{ stock.created_at | formatDate }}</p></td>
                            <td>
                                <v-chip outlined v-if="stock.direction === 'out'" color="red">Out</v-chip>
                                <v-chip outlined v-if="stock.direction === 'in'" color="green">In</v-chip></td>
                            <td>{{ stock.quantity }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <v-container>
                <v-row justify="center">
                    <v-col  cols="8">
                        <v-container class="max-width">
                            <v-pagination color="#ff9922" :total-visible="7" @input="next" v-model="page" class="my-4" :length="total"></v-pagination>
                        </v-container>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-container>
</template>
<script>
    import { mapActions } from "vuex";

    export default {
        name: "UpdateProductView",
        data: () => ({
            page: 1,
            newStock: {
                direction:null,
                quantity: null
            },
            textRules: [
                value => {
                    if (value) return true
                    return 'You must complete this field.'
                },
            ],
        }),
        filters: {
            formatDate(value) {
                return new Date(value).toLocaleString();
            }
        },
        computed: {
            product () {
                return this.$store.state.products.product
            },
            stocks () { return this.$store.state.productStocks.all },
            total () { return this.$store.state.productStocks.pagination.total }
        },
        methods: {
            ...mapActions({
                getProduct: 'products/getOne',
                updateProduct: 'products/update',
                getStocks: 'productStocks/getAllForOneProduct',
                recordMvt: 'productStocks/create'
            }),
            update() {
                this.updateProduct(this.product)
            },
            record() {
                this.recordMvt({stock: this.newStock, id: this.product.id})
            },
            next (page) {
                this.page = page
                this.getStocks({id: this.product.id, page: this.page})
            },
        },
        created() {
            this.getProduct(this.$route.params.id)
            this.getStocks({id: this.$route.params.id, page: this.page})
        }
    }
</script>
