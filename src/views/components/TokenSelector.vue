<style scoped src="../../assets/components.css"></style>

<template>
    <article>

        <div class="row" style="margin-bottom: 50px" >
            <div style="width:20%" v-for="(token, i) in selectedTokens" :key="i">
                <div class="d-flex justify-content-center">
                    <div v-if="!token" class="sm-chunk rounded-circle" ref="holder"></div>
                    <div v-if="token" style="cursor: pointer" @click="removeToken(token)">
                        <div class="token-chunk rounded-circle">
                            <img :src="token.img" style="width:100%"></div>
                        <p class="text-center mt-2">{{token.name}}</p>
                    </div>
                </div>
            </div>
        </div>

            
        <!-- </div> -->

        <div class="mb-3">
            <span>Select Your Tokens</span>
        </div>

        
        <div class="row">
            <div style="width: 20%" v-for="(token, i) in tokens" :key="i">
                <div class="d-flex justify-content-center">
                    <div style="cursor: pointer" @click="manageToken(token)">
                        <div :class="{'disabled-bg': token.selected}" class="token-chunk rounded-circle">
                            <img :src="token.img" style="width:100%"></div>
                        <p :class="{'disabled-color': token.selected}" class="text-center mt-2">{{token.name}}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-5 d-flex justify-content-center">
            <button class="btn btn-primary" style="width: 80%" @click="submitTokenForm">
                <span class="text-uppercase fw-bold" style="letter-spacing: 1px; font-size: 1rem">Create Allocation</span>
            </button>
        </div>

</article>
</template>

<script>
export default {
    data() {
        return {
            tokens: [
                {name: "ETH", img: "https://www.vauld.com/assets/coins/eth.svg"},
                {name: "BTC", img: "https://www.vauld.com/assets/coins/btc.svg"},
                {name: "MATIC", img: "https://www.vauld.com/assets/coins/matic.svg"},
                {name: "FTT", img: "https://www.vauld.com/assets/coins/ftt.svg"},
                {name: "USDC", img: "https://www.vauld.com/assets/coins/usdc.svg"},
                {name: "AAVE", img: "https://www.vauld.com/assets/coins/aave.svg"},
                {name: "LINK", img: "https://www.vauld.com/assets/coins/link.svg"},
                {name: "MANA", img: "https://www.vauld.com/assets/coins/mana.svg"},
                {name: "GRT", img: "https://www.vauld.com/assets/coins/grt.svg"},
                {name: "DOT", img: "https://www.vauld.com/assets/coins/dot.svg"},
            ]
        }
    },
    created() {
        this.tokens = this.tokens.map((el) => {
            return { name: el.name, img: el.img, selected: false}
        })

        if(!this.selectedTokens.length) {
          for(let i = 0; i < 5; i++) {
            this.selectedTokens.push(false)
          }
        }
        
    },
    computed: {
      selectedTokens: {
        get: function() {
            return this.$store.state.selectedTokens
        },
        set: function(value) {
            this.$store.state.selectedTokens = value
        }
      }
    },
    methods: {
        addToken(token) {
            let repeated = false
            let selectedTokens = this.selectedTokens
            let tokens = this.tokens
            
            selectedTokens.forEach((el, i) => {
                if(el.name === token.name) repeated = true
            })
            if(repeated) return;

            let newToken = {}
            for (const key in token) {
                newToken[key] = token[key]
            }

            let emptyIndex = selectedTokens.indexOf(false)
            if(emptyIndex !== -1) {
                selectedTokens.splice(emptyIndex, 1, newToken)
                const index = tokens.indexOf(token)
                tokens[index].selected = true
            }

            
        },
        removeToken(token) {
            let tokenIndex = null
            let tokens = this.tokens
            let selectedTokens = this.selectedTokens

            // [i, i, i, i, f]

            selectedTokens.forEach((el, i) => {
                if(el.name === token.name) tokenIndex = i
            })

            selectedTokens.splice(tokenIndex, 1)
            selectedTokens.push(false)

            let index = null
            tokens.forEach((el, i) => {
                if(el.name === token.name) index = i
            })
            if(index !== null) this.tokens[index].selected = false
        },
        manageToken(token) {
            if(!token.selected) this.addToken(token)
            else this.removeToken(token) 
        },
        submitTokenForm() {
            const selectedTokens = this.selectedTokens
            const newSetTokens = []
            selectedTokens.forEach(token => {
                if(token === false) return;
                if(token.name) {
                    delete token["selected"]
                    newSetTokens.push(token)
                }
            })

            let tokenLength = newSetTokens.length
            let allocatePercentage = Math.floor(100 / tokenLength)
            let leftAmount = 100 - (tokenLength * allocatePercentage)

            newSetTokens.forEach((token, i) => {
                let percentage = allocatePercentage
                if(i === tokenLength - 1) percentage += leftAmount
                token.percentage = percentage
            })

            this.$store.state.tokenList = newSetTokens
            let tokenList = this.$store.state.tokenList
            if(tokenList.length) {
                this.$store.state.actions.tokenSelected = true
            }
        }
    }
}
</script>