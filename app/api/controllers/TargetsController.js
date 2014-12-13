/**
 * TargetsController
 *
 * @description :: Server-side logic for managing Targets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

/**
   * `TargetsController.all()`
   */
  all: function (req, res) {

    Target.find()
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
   * `TargetsController.pep()`
   */
  peps: function (req, res) {

    Target.find()
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
   * `TargetsController.watchlist()`
   */
  watchlists: function (req, res) {

    Target.find()
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

