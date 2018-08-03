import PouchDB from 'pouchDB';

PouchDB.plugin(require('pouchdb-authentication'));

const CHAT_HOST_URL = 'http://localhost:5984';
const CHAT_HOST_USERNAME = 'admin';
const CHAT_HOST_PASSWORD= 'admin';

app.factory('dbService',['$rootScope',function($rootScope){
  return {
    getLocalDB:function(dbName){
      //,{adapter:'websql'}

      if(!$rootScope.localDB){
        $rootScope.localDB = new PouchDB(dbName,{adapter:'idb'});
      }
      return $rootScope.localDB
    },
    getRemoteDB:function(dbName){
      if(!$rootScope.remoteDB){
        $rootScope.remoteDB = new PouchDB(CHAT_HOST_URL + '/'+dbName,{
          auth:{
            username:CHAT_HOST_USERNAME,
            password:CHAT_HOST_PASSWORD
          }
        })
      }
      return $rootScope.remoteDB;
    },
    insertMessage:function(message,success,fail){
      var _this = this;
      _this.getLocalDB(message.dbName).post({
        //_id: message.time.toString(),
        nickname:message.nickname,
        type:message.type,
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
    },
    syncToServer:function(dbName){
      var _this = this;

      _this.getLocalDB(dbName).sync(this.getRemoteDB(dbName),{
        live:true,
        retry:true
      }).on('complete', function(info) {
        console.log('complete');
      }).on('error', function(err) {
        console.log(err)
      });

    },
    getMessageFromServer:function(dbName,callback){
      this.getRemoteDB(dbName).allDocs({
        skip:0,
        limit:10,
        descending:true,
        include_docs: true
      },function(err,response){
        if(callback && (typeof(callback) === 'function')) {
          callback(err,response);
        }
      })


    }
  }
}])