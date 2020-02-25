<template>
  <div>
    <div>
      <h1 v-model="requestRes.title">{{requestRes.title}}</h1>
      <h3 v-model="requestRes.company">{{requestRes.company}}</h3>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'MessageDetail',
    data () {
      return {
        requestRes: {
          id: null,
          title: '大司马的饭堂',
          company: 'fordeal',
          province: null,
          city: null,
          address: null,
          publishTime: null,
          publishTimeStr: null,
          detail: null,
          user: null,
        },
      }
    },
    methods: {
      requestData (id) {
        this.axios.get('user-cooperation/cooperation/commonMsg',
          {
            params: {
              id: id,
            }
          })
          .then(function (response) {
            console.log(response.data.status)
            if (response.data.status == 1001) {
              _ts.requestRes = response.data.data
            } else {
              alert(response.data.message)
            }
          })
          .catch(function (error) {
            console.log('出错啦')
            console.log(error)
            // 根据返回error打的，有点乱
            alert(error.data.errors[0].defaultMessage)
          })
      }
    },
    created () {
      this.requestData(this.$route.query.id)
    }
  }
</script>

<style scoped>

</style>
