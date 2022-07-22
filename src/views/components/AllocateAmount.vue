<template>
    <article class="p-3">
        <div class="row" style="margin-bottom: 50px" >
            <div class="col" v-for="(token, i) in tokenList" :key="i">
                <div class="d-flex justify-content-center">
                    <div v-if="token" class="text-center">
                        <div class="token-chunk rounded-circle">
                            <img :src="token.img" style="width:100%">
                        </div>
                        <span class="text-center mt-3" style="font-size:0.9rem">{{token.name}}</span>
                        <p class="text-center" style="font-size:0.75rem">{{token.percentage}}%</p>
                    </div>
                </div>

            </div>
        </div>

        <form @submit.prevent="submitForm" id="amount">
            <div class="row">
                <div class="col">
                    <div class="cmn-style py-2 px-3" :class="{'disabled': investmentType === 'duration'}" @click="switchInvestType('dip')"> Buy the Dip </div>
                </div>
                <div class="col">
                    <select v-model="durationType" class="cmn-style py-2 px-3" :class="{'disabled': investmentType === 'dip'}"
                     type="text" @click="switchInvestType('duration')"> 
                        <option value="daily" selected>Daily</option>
                        <option value="weekly" selected>Weekly</option>
                        <option value="monthly" selected>Monthly</option>
                    </select>
                </div>
            </div>

            <div class="mt-5" v-if="investmentType === 'dip'">
                <div class="row gx-3">
                    <div class="col">
                        <label style="font-size: 0.95rem">When the price drops below</label>
                    </div>
                    <div class="col-4">
                        <select class="cmn-style px-3" v-model="dipPercentage">
                            <option value="2">2%</option>
                            <option value="5">5%</option>
                            <option value="10">10%</option>
                        </select> 
                    </div>
                </div>
                <div class="mt-2">
                    <select class="cmn-style mt-3 px-3" v-model="dipFrequency">
                        <option value="1" selected>Once a day</option>
                        <option value="2">Twice a day</option>
                        <option value="2">Thrice a day</option>
                    </select>
                </div>
            </div>

            <div class="mt-5" v-if="investmentType === 'duration'">
                <div>
                    <label style="font-size: 1rem">Duration</label>
                    <select v-model="durationLength" class="cmn-style mt-3 px-3">
                        <option value="1" selected>1 Month</option>
                        <option value="3">3 Months</option>
                        <option value="6">6 Months</option>
                    </select>
                </div>
            </div>
<!--  ./assets/coins/inr.svg -->
            <div class="mt-5">
                <div>
                    <label style="font-size: 1rem">Amount</label>
                    <div class="d-flex cmn-style py-3 align-items-center">
                        <div class="me-3 d-flex align-items-center" style="user-select:none">
                            <img style="width: 25px" src="https://www.vauld.com/assets/coins/inr.svg">
                            <p>INR</p>
                        </div>
                        <div>
                            <input v-model="amount" type="number" style="height: 100%" >
                        </div>
                    </div>
                </div>
            </div>

            <span> {{durationLength}} {{durationType}}</span>

            <div class="mt-4 d-flex justify-content-center">
                <button type="submit" class="btn btn-primary" style="width: 80%; font-size: 1.2rem">
                    <span class="fw-bold" style="letter-spacing: 1px;">Create AIP</span>
                </button>
            </div>
        </form>
    </article>
</template>

<script>
export default {
    data() {
        return {
            investmentType: "dip",
            dipPercentage: 2,
            dipFrequency: 1,
            durationType: "weekly",
            durationLength: 1,
            amount: null
        }
    },
    computed: {
        tokenList: function() {return this.$store.state.tokenList}
    },
    methods: {
        switchInvestType(type) {this.investmentType = type},
        submitForm() {
            
            let tokens = this.tokenList.map(el => {
                return {name: el.name, percentage: el.percentage}
            })
            let response = {investmentType: this.investmentType, tokens}

            if(this.investmentType === "dip") {
                response.dipFrequency = Number(this.dipFrequency)
                response.dipPercentage = Number(this.dipPercentage)
            }

            if(this.investmentType === "duration") {
                response.durationType = this.durationType
                response.durationLength = Number(this.durationLength)
            }

            if(this.amount !== null) {
                response.amount = Number(this.amount)
                this.$store.state.finalResult = response
            }

            console.log(this.$store.state.finalResult)
        }
    }
}
</script>

<style scoped src="../../assets/components.css"></style>