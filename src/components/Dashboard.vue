<template>
  <div class="dashboard">
    <table class="outer">
      <tr :style="`height: ${size.thH}px;`">
        <th :width="size.leftW">
          <div class="filter-n-btn">
            <table>
              <tr>
                <td>
                  <input type="text" placeholder="필터" v-model="filter"/>
                </td>
                <td>
                  <button @click="toProdStr()">문자열</button>
                </td>
              </tr>
            </table>
          </div>
        </th>
        <th>
          <table>
            <tr>
              <td width="100">
                <input type="text" placeholder="주문자명" v-model="orderToAdd.recipient">
              </td>
              <td>
                <input type="text" v-model="orderToAdd.rawStr" @keypress.enter="addOrder()">
              </td>
            </tr>
          </table>
        </th>
      </tr>
      <tr>
        <td>
          <div class="scroller" :style="`height: ${size.winH - size.thH}px`">
            <table>
              <tr v-for="(prod, idx) in prod_list" :key="idx">
                <td width="44">
                  {{prod[0]}}
                </td>
                <td>
                  {{prod[1]}}
                </td>
              </tr>
            </table>
          </div>
        </td>
        <td :style="`height: ${size.winH - size.thH}px`">
          <div class="scroller" :style="`height: ${size.winH - size.thH}px`">
            <div class="order" v-for="(order, idx) in orders" :key="idx">
              <span class="title">
                주문 {{idx + 1}}
              </span>
              <span class="xbtn" @click="deleteOrder(idx)">
                ✕
              </span>
              <div class="recipient">
                <input v-model="order.recipient"/>
              </div>
              <div class="rawStrExtra">
                <input v-model="order.rawStrExtra" @keypress.enter="addExtra(idx)"/>
              </div>
              <div class="product">
                <table>
                  <tr v-for="(prod, idx) in order.prodList" :key="idx" :class="(idx) % 5 == 0 ? 'fifth' : ''">
                    <td width="30">
                      {{idx + 1}}
                    </td>
                    <td width="36" class="key">
                      {{prod.key}}
                    </td>
                    <td>
                      {{prod.name}}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import prod_str from '../data/product-map'
export default {
  name: 'Dashboard',
  data: () => {
    return {
      size: {
        winH: 0,
        leftW: 224,
        thH: 56,
      },
      filter: '',
      orderToAdd: {
        recipient: '',
        rawStr: ''
      },
      orders: []
    }
  },
  computed: {
    prod_list () {
      let result = []
      Object.keys(prod_str).map((key, idx) => {
        if (prod_str[key].toUpperCase().includes(this.filter.toUpperCase())) {
          result.push([key, prod_str[key]])
        }
      })
      return result
    }
  },
  methods: {
    toProdStr () {
      this.$router.push('prod-str')
    },
    addOrder () {
      let recipient = this.orderToAdd.recipient
      let rawStr = this.orderToAdd.rawStr
      this.orderToAdd.recipient = ''
      this.orderToAdd.rawStr = ''
      let prods = []
      rawStr.match(/\w{1}\d{1,2}/gi).map((matched) => {
        if (prod_str[matched.toUpperCase()] != undefined) {
          prods.push({
            key: matched.toUpperCase(),
            name: prod_str[matched.toUpperCase()]
          })
        }
      })
      this.orders.push ({
        recipient: recipient,
        rawStrExtra: '',
        prodList: prods
      })
    },
    addExtra (idx) {
      let prods = []
      this.orders[idx].rawStrExtra.match(/\w{1}\d{1,2}/gi).map((matched) => {
        if (prod_str[matched.toUpperCase()] != undefined) {
          prods.push({
            key: matched.toUpperCase(),
            name: prod_str[matched.toUpperCase()]
          })
        }
      })
      this.orders[idx].prodList = this.orders[idx].prodList.concat(prods)
      this.orders[idx].rawStrExtra = ''
    },
    deleteOrder (idx) {
      this.orders.splice(idx, 1)
    }
  },
  mounted () {
    this.size.winH = window.innerHeight
  }
}
</script>

<style scoped lang="scss" src="../assets/scss/dashboard.scss">
</style>