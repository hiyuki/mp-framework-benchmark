<script>
  import { proxySetData } from '../../../../utils/proxy'


  proxySetData({
    console: true,
    context: global
  })

  export default {
    onLaunch () {
      console.log('launch')
    }
  }
</script>

<style>
</style>
