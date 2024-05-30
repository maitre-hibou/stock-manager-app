<template>
    <v-container>
        <v-card class="ma-3" v-if="stocks" width="100%">
            <v-simple-table dense >
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-center">Product</th>
                            <th class="text-center">Date</th>
                            <th class="text-center">Action</th>
                            <th class="text-center">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="stock in stocks" :key="stock.id">
                            <td><p>{{ stock.product.title }}</p></td>
                            <td><p>{{ stock.created_at | formatDate }}</p></td>
                            <td>
                                <v-chip outlined v-if="stock.direction === 'out'" color="red">Out</v-chip>
                                <v-chip outlined v-if="stock.direction === 'in'" color="green">In</v-chip></td>
                            <td>{{ stock.quantity }}</td>
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

    export default {
        name: "StocksView",
        data: () => ({
            page: 1
        }),
        computed: {
            stocks () { return this.$store.state.stocks.all },
            total () { return this.$store.state.stocks.pagination.total }
        },
        methods: {
            ...mapActions({
                getAllStocks: 'stocks/getAll',
            }),
            next (page) {
                this.page = page
                this.getAllStocks(page)
            }
        },
        created() {
            this.getAllStocks(this.page)
        }
    }
</script>
