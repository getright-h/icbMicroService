const Koa = require("koa");
const staticServe = require("koa-static");
const app = new Koa();
// const wxFallbackList = [
//   "/fchPreferentialRefuel/loginLanding.html"
// ]
// const getPlatform = (ua) => {
//   const isAndroid = ua.match(/android/i);
//   const isIos = ua.match(/(iPhone|iPod|iPad);?/i);
//   const isWx = ua.toLowerCase().match(/MicroMessenger/i);
//   return {
//     plantform:isAndroid ? "Android" : isIos ? "IOS" : "Unknown",
//     isWx
//   }
// }
// app.use(async (ctx,next) => {
//   const { path } = ctx;
//   const hit = wxFallbackList.find(item => path.endsWith(item))
//   const ua = ctx.headers["user-agent"];
//   const plantform = getPlatform(ua);
//   if(hit && plantform.plantform === "Android" && plantform.isWx){
//     ctx.set({
//       "Content-disposition":"attachment;filename=open.apk",
//       "Content-type":"text/plain; charset=utf-8"
//     });
//     ctx.remove("If-None-Match")
//     ctx.remove("If-Modified-Since")
//     ctx.status = 206
//   }
//   await next()
// })

app.use(staticServe(__dirname));
app.listen(9527,() => {
  console.log("Server started at 9527.");
});