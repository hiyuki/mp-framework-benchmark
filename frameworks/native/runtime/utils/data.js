function random (max) {
  return Math.round(Math.random() * 1000) % max
}

let id = 0

function buildData (count = 1000, invalid) {
  const types = ['快车', '专车', '出租车', '拼车', '豪华车']
  const cities = ['北京', '上海', '广州', '深圳', '成都', '南京', '西安', '昆明']
  const limits = ['早高峰', '晚高峰', '平峰']
  const data = []
  for (let i = 0; i < count; i++) {
    data.push({
      id: ++id,
      type: types[random(types.length)],
      city: cities[random(cities.length)],
      limit: limits[random(limits.length)],
      amount: random(30) + 1,
      valid: !invalid,
      date: `2020-${random(13)}-${random(31)}`
    })
  }
  return data
}

module.exports = {
  random,
  buildData
}
