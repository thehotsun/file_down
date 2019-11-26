const router = require('koa-router')()
const path = require('path')
const fs = require('fs')

let downPath = 'C:\\Users\\Administrator\\Downloads'
router.get('/', async (ctx, next) => {
  let arr = fs.readdirSync(downPath).slice(1)
  console.log(arr, arr.slice(1))
  await ctx.render('index', {
    arr
  })
})

router.get('/down/:name', async (ctx, next) => {
  // console.log(ctx.params.name) 
  let filename = downPath + '\\' + ctx.params.name
  // ctx.body = 'koa2 string'
  ctx.set('Access-Control-Allow-Origin', '*')
  // ctx.set('Content-disposition', 'attachment;filename=' + 'filename')
  var chunks = []
  var size = 0
  let stream = fs.createReadStream(filename)
  stream.on('data', data => {
    chunks.push(data)
    size += data.length
  })
  await new Promise((resolve, reject) => {
    // console.log('????')
    stream.on('end', () => {
      try {
        var buf = Buffer.concat(chunks, size)
        // console.log('???', size)
        ctx.body = buf
        resolve()
      } catch (e) {
        // console.log('??')
        reject()
      }
    })
  })
  // stream.pipe(ctx.res.body)
})

module.exports = router
