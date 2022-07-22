<style scoped src="../assets/components.css"></style>

<template>
      <div class="big-con">
          <div class="container py-4" style="min-height:100vh">
              <div class="row defi-con rounded" >
                  <div class="col">

                    <code>
                      {{this.$store.state.finalResult}}
                    </code>
                      <!-- <ul>
                        <li v-for="(token, i) in tokenList" :key="i">{{token.name}} - {{token.percentage}}</li>
                      </ul> -->
                  </div>
                  <div class="col-4 px-4 py-4 sm-defi-box">
                      <TokenSelector v-if="!this.$store.state.actions.tokenSelected"/>
                      <AllocateAmount v-if="this.$store.state.actions.tokenSelected"/>
                  </div>
              </div>
          </div>
      </div>
</template>

<script>
import TokenSelector from "./components/TokenSelector.vue"
import AllocateAmount from "./components/AllocateAmount.vue"
export default {
    components: {
      TokenSelector,
      AllocateAmount
    },
    computed: {
      selectedTokens: function() {return this.$store.state.selectedTokens},
      tokenList: function() {return this.$store.state.tokenList},
    }
}
</script>

