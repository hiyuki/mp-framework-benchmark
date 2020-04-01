let count = 0
let size = 0
let proxyed = false
let options = {}
let currentPageContext
let readyStart
let readyEnd
let readyTimer

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
      if (options.size) size += byteLength(JSON.stringify(data))
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
      const now = +new Date()
      if (readyStart) {
        readyEnd = now
      }
      if (context._lastTime && context._lastCallback) {
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

function byteLength (str) {
  let s = str.length
  for (let i = str.length - 1; i >= 0; i--) {
    let code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}


function proxySetData (proxyOptions = {}) {
  if (proxyed) return
  proxyed = true
  options = proxyOptions

  const context = proxyOptions.context || {}

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

    if (proxyOptions.ready) {
      const onReadyRaw = options.onReady

      options.onReady = function (...args) {
        getReadyTimeWithModal()
        onReadyRaw && onReadyRaw.apply(this, args)
      }
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

function getCurrentPageContext () {
  if (!currentPageContext) throw new Error('CurrentPageContext is not exist!')
  return currentPageContext
}

function getCount () {
  if (!options.count) throw new Error('proxyOptions.count must be setted by true!')
  return count
}

function getSize () {
  if (!options.size) throw new Error('proxyOptions.size must be setted by true!')
  return size
}

function getTime (context, callback) {
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

function setReadyStart () {
  readyStart = +new Date()
}

function getReadyTimeWithModal (delay = 1000) {
  readyEnd = +new Date()
  clearTimeout(readyTimer)
  readyTimer = setTimeout(() => {
    if (readyStart && readyEnd) {
      console.log('Ready!!')
      wx.showModal({
        content: `Ready耗时: ${readyEnd - readyStart}`
      })
    }
    readyStart = readyEnd = undefined
  }, delay)
}

function getTimeWithModal (context) {
  getTime(context, (err, result) => {
    if (!err) wx.showModal({
      content: `总耗时: ${result.totalTime}\n setData耗时: ${result.setTime}`
    })
  })
}

module.exports = {
  proxySetData,
  setReadyStart,
  getReadyTimeWithModal,
  getCurrentPageContext,
  getCount,
  getSize,
  getTime,
  getTimeWithModal
}
