客户端相关注释在 public/js/index.js 中

// 定义和用法
// download 属性规定被下载的超链接目标。

// 在 <a> 标签中必须设置 href 属性。

// 该属性也可以设置一个值来规定下载文件的名称。所允许的值没有限制，浏览器将自动检测正确的文件扩展名并添加到文件 (.img, .pdf, .txt, .html, 等等)

{/_ <a download="filename"></a>
filename 规定作为文件名来使用的文本。 _/}

// URL.createObjectURL() 做了什么？
// 问题看起来是解决了，但是有人可能会问：URL.createObjectURL() 方法到底做了什么，为什么我们能通过它来获取到文件下载的地址？

// 这里简单说一下，每次调用 URL.createObjectURL() 方法都会生成一个地址，这个地址代表着根据 blob 对象生成的资源入口，而这个资源入口存放于浏览器维护的一个 blob URL store 中。生成的 URL 由四部分组成：

// ‘blob: ’
// origin
// ‘/’
// UUID
// 生成的 URL 大概都长这样：

// blob:https://www.example.com/7914f88e-cac5-4af5-96a1-287584d518b5
// 这里要注意两个地方：

// 即使是同一个 blob 对象，每次调用都会生成不同的 URL。
// URL 不再用的时候，需要调用 URL.revokeObjectURL() 来撤销这个入口。（如果不撤销，URL 会一直被保留，直到当前 document 对象 unload）

// res.blob() 到底做了什么？

// 每次调用 res.blob() 方法都会执行 “consume body” 动作，“consume body” 的流程大概是这样的：

// 获取字节流的读取器
// 通过读取器读取所有的数据
// 把数据包装成 blob 对象并返回
// fetch('example.zip').then(res => {
// // 获取读取器
// const reader = res.body.getReader()
// const type = res.headers.get('Content-Type')
// const data = []

// return new Promise(resolve => {
// // 读取所有数据
// function push() {
// reader.read().then(({ done, value }) => {
// data.push(value)
// if (done) {
// // 包装成 blob 对象并返回
// resolve(new Blob(data, { type }))
// } else {
// push()
// }
// })
// }
// push()
// })
// })
