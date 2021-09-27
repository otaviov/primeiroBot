// middleware pattern (hain of responsibility)
const exec = (ctx, ...middleware) => {
    function run(index) {
        middleware && index < middleware.length && middleware[index](ctx, () => run(index + 1))
    }
    run (0)
}

const mid1 = (ctx, next) => {
    ctx.info1 = 'mid1'
    next()
}
const mid2 = (ctx, next) => {
    ctx.info2 = 'mid2'
    next()
}

const mid3 = ctx => ctx.info3 = 'mid3'

const ctx = {} 
exec (ctx, mid1, mid2, mid3)
console.log(ctx)