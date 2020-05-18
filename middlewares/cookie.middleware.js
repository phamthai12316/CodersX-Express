var count = 0;
// module.exports.cookie = (req, res, next) => {
//   console.log("Cookie:" + count);
//   count++;
//   next();
// };
module.exports.cookie = (req, res, next) => {
  if(req.cookies){
    count= count + 1;
  }
  console.log(`<cookie>: ${count}`);
  next();
}
