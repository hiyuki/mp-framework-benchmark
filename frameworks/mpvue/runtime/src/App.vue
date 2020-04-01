<script>
  import { proxySetData, setReadyStart } from '../../../../utils/proxy'


  proxySetData({
    console: true,
    context: global
  })

  setReadyStart()

  export default {
    onLaunch () {
      console.log('launch')
    }
  }
</script>

<style>
</style>
