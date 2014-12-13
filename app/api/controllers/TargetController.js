/**
 * TargetController
 *
 * @description :: Server-side logic for managing targets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `TargetController.all()`
   */
  all: function (req, res) {

    Targets.find()
      .exec(function(err,results){
            if(err){
              console.log('Error searching for all targets');
            }
            return res.json(
              results
            );
      });

  },


  /**
   * `TargetController.pep()`
   */
  peps: function (req, res) {

    Targets.find()
      .where({listType: "PEP"})
      .exec(function(err,results){
            if(err){
              console.log('Error searching for PEPs');
            }
            return res.json(
              results
            );
      });
  },


  /**
   * `TargetController.watchlist()`
   */
  watchlists: function (req, res) {

    Targets.find()
      .where({listType: "Watchlist"})
      .exec(function(err,results){
            if(err){
              console.log('Error searching the Watchlist');
            }
            return res.json(
              results
            );
      });

  }
};

