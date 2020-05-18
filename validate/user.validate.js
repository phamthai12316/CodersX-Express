module.exports.postCreate = (req, res, next) => {
  var errors = [];
  if(!req.body.name){
    errors.push('Please enter name');
  }
  if(req.body.name.length > 30){
    errors.push('Character limit 30');
  } 
  if(errors.length){
    res.render('users/create',{
      errors:errors,
      values: req.body
    });
    return;
  }
  next();
}