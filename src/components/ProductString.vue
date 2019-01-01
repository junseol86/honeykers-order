<template>
  <div class="product-string">
    <div class="string-con">
      {{prodStr}}
    </div>
    <div class="button-con">
      <button class="copy-btn" type="button" @click="copyToClipboard(prodStr)">
        {{buttonMsg}}
      </button>
    </div>
  </div>
</template>

<script>
import prod_str from '../data/product-map'
export default {
  name: 'ProductString',
  data: () => {
    return {
      buttonMsg: "클립보드에 복사"
    }
  },
  methods: {
    copyToClipboard (str) {
      const el = document.createElement('textarea');
      el.value = str;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
  },
  computed: {
    prodStr () {
      let result = ''
      Object.keys(prod_str).map((key, idx) => {
        result += `${key} ${prod_str[key]}${idx >= Object.keys(prod_str).length - 1 ? '' : ', '}`
      })
      return result
    }
  }
}
</script>

<style>

.product-string {
  padding : 20px;
}

.product-string .string-con {
  padding: 24px;
  line-height: 1.5em;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.product-string .button-con {
  text-align: center;
}

.product-string .button-con .copy-btn {
  margin-top: 16px;
  padding: 12px 16px;
  font-size: 1.1em;
}

</style>