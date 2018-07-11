import PouchDB from 'pouchDB';
app.factory('dbService',['$rootScope',function($rootScope){
  return {
    getDB:function(nickname){
      //,{adapter:'websql'}
      return new PouchDB(nickname,{adapter:'idb'})
    },
    insertMessage:function(message,success,fail){
      var _this = this;
      _this.getDB(message.nickname).put({
        _id: message.time.toString(),
        time: message.time,
        content: message.content
      }).then(function (response) {
        if(success && (typeof(success) === 'function')) {
          success(response);
        }
      }).catch(function (err) {
        if(fail && (typeof(fail) === 'function')) {
          fail(err);
        }
      });
    }
  }
}])