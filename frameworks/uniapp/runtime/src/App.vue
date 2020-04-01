<script>
  import { proxySetData, setReadyStart } from '../../../../utils/proxy'

  proxySetData({
    console: true
  })

  setReadyStart()

  export default {
    onLaunch: function () {
    }
  }
</script>

