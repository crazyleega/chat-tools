import { WebApp } from 'meteor/webapp';

//设置CORS
WebApp.connectHandlers.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});

Meteor.startup(() => {
  // code to run on server at startup
});
