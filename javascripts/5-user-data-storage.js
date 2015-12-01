define(function(require) {
  var uid = null;
  var uKey = null; 

  return {
    getUid: function () {
      return uid;
    },
    setUid: function (newId) {
      uid = newId.uid;
    },
    getKey: function () {
      return uKey;
    },
    setKey: function (newKey) {
      uKey = newKey;
    }
  };
});