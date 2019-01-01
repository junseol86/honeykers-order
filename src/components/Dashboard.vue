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
      filter: '',
      size: {
        winH: 0,
        leftW: 224,
        thH: 56,
      }
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
    }
  },
  mounted () {
    this.size.winH = window.innerHeight
  }
}
</script>

<style scoped lang="scss">
  .dashboard {
    .outer {
      width: 100%;
      tr {
        th {
          &:first-child {
            background-color: #333;
            border-bottom: 1px solid #333;
            .filter-n-btn {
              padding: 12px;
              table {
                width: 100%;
                * {
                  height: 32px;
                }
                input {
                  width: 100%;
                  margin: 0;
                  padding: 0 8px;
                  border: 0;
                  outline: 0;
                  font-size: 0.9em;
                }
                button {
                  width: 64px;
                  font-size: 0.8em;
                }
              }
            }
          }
          background-color: #eee;
          border-bottom: 1px solid #ccc;
          button {
            width: 100%;
          }
        }
        & > td {
          vertical-align: top;
          &:first-child {
            color: white;
            background-color: #444;
            font-size: 0.92em;
            table {
              width: 100%;
              tr {
                &:nth-child(even) {
                  td {
                    background-color: rgba(0, 0, 0, 0.1);
                  }
                }
                & > td {
                  padding-top: 6px;
                  padding-bottom: 6px;
                  &:first-child {
                    padding-left: 12px;
                  }
                }
              }
            }
          }
          .scroller {
            overflow-y: scroll;
          }
        }
      }
    }
  }
</style>