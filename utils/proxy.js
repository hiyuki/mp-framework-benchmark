let count = 0
let size = 0
let proxyed = false
let options = {}
let currentPageContext
let appLaunchTime

function doProxy (context) {
  const setDataRaw = context.setData
  context._lastTime = 0
  context._lastCallback = null
  context._setting = false
  context.setData = function (...args) {
    context._setting = true
    options.count && count++
    const lastSetTime = +new Date()
    const data = args[0]
    if (data) {
      if (options.size) size += JSON.stringify(data).length
      if (options.console) {
        if (count) {
          console.log('累计setData次数:', count)
        }
        if (size) {
          console.log('累计setData大小:', size)
        }
        console.log('当次setData数据:', data)
      }
    }
    const callbackRaw = args[1]
    args[1] = function (...args) {
      context._setting = false
      if (context._lastTime && context._lastCallback) {
        const now = +new Date()
        context._lastCallback(null, {
          totalTime: now - context._lastTime,
          setTime: now - lastSetTime,
          diffTime: now - wx.lastPatchTime
        })
        context._lastTime = 0
        context._lastCallback = null
      }
      callbackRaw && callbackRaw.apply(this, args)
    }
    setDataRaw.apply(this, args)
  }
}


export function proxySetData (proxyOptions = {}) {
  if (proxyed) return
  proxyed = true
  options = proxyOptions

  const context = proxyOptions.context || {}

  // proxyApp
  const AppRaw = context.App || App

  const proxyApp = function (...args) {
    const options = args[0]
    const onLaunchRaw = options.onLaunch
    options.onLaunch = function (...args) {
      appLaunchTime = +new Date()
      onLaunchRaw && onLaunchRaw.apply(this, args)
    }
    return AppRaw.apply(this, args)
  }

  if (context.App) {
    context.App = proxyApp
  } else {
    App = proxyApp
  }

  // proxyPage
  const PageRaw = context.Page || Page

  const proxyPage = function (...args) {
    const options = args[0]
    const onLoadRaw = options.onLoad
    options.onLoad = function (...args) {
      doProxy(this)
      onLoadRaw && onLoadRaw.apply(this, args)
    }

    const onShowRaw = options.onShow

    options.onShow = function (...args) {
      currentPageContext = this
      onShowRaw && onShowRaw.apply(this, args)
    }

    return PageRaw.apply(this, args)
  }

  if (context.Page) {
    context.Page = proxyPage
  } else {
    Page = proxyPage
  }

  // proxyComponent
  const behaviors = (context.Behavior || Behavior)({
    created () {
      doProxy(this)
    }
  })

  const ComponentRaw = context.Component || Component

  const proxyComponent = function (...args) {
    const options = args[0]
    const behaviorsRaw = options.behaviors
    options.behaviors = behaviorsRaw ? [behaviors].concat(behaviorsRaw) : [behaviors]
    return ComponentRaw.apply(this, args)
  }

  if (context.Component) {
    context.Component = proxyComponent
  } else {
    Component = proxyComponent
  }
}

export function setAppLaunchTime (date) {
  appLaunchTime = date

}

export function getAppLaunchTime () {
  if (!appLaunchTime) throw new Error('App is not launched yet!')
  return appLaunchTime
}

export function getCurrentPageContext () {
  if (!currentPageContext) throw new Error('CurrentPageContext is not exist!')
  return currentPageContext
}

export function getCount () {
  if (!options.count) throw new Error('proxyOptions.count must be setted by true!')
  return count
}

export function getSize () {
  if (!options.size) throw new Error('proxyOptions.size must be setted by true!')
  return size
}

export function getTime (context, callback) {
  if (context) {
    if (context._setting) {
      callback && callback(new Error('Last setData is not finished, please try it later again!'))
    } else {
      context._lastTime = +new Date()
      context._lastCallback = callback
    }
  } else {
    throw new Error('Context must be passed in!')
  }
}

export function getTimeWithModal (context) {
  getTime(context, (err, result) => {
    if (!err) wx.showModal({
      content: `总耗时: ${result.totalTime}\n setData耗时: ${result.setTime}`
    })
  })
}
