var settingsController = function(options){

    var middleware = function(req, res, next){
      next();
    };

    var getIndex = function(req, res){

    };

    return {
      middleware: middleware,
      getIndex: getIndex
    }

};

module.exports = settingsController;
