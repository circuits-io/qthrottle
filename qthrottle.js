var q = require('q');

module.exports = function(limit) {


	function QThrottle(limit) {


		var queue = [];


		var running = 0;


		this.fapply = function(fn, thisArg, args) {
			var deferred = q.defer();

			queue.push({
				deferred: deferred,
				fn: fn,
				thisArg: thisArg,
				args: args
			});

			run();

			return deferred.promise;
		};


		this.fcall = function(fn, thisArg) {
			var deferred = q.defer();

			queue.push({
				deferred: deferred,
				fn: fn,
				thisArg: thisArg,
				args: Array.prototype.slice.call(arguments, 2)
			});

			run();

			return deferred.promise;
		};


		/**
		 * Soft rescale.
		 * Will add jobs when limit increases.
		 * Will not kill jobs when limit decreases, but will not allow new jobs to be created until limit is sattisfied again.
		 * @param  {int} new_limit New maximum number of parallel jobs
		 */
		this.rescale = function(new_limit) {
			limit = new_limit;
			run();
		};


		this.getLimit = function() {
			return limit;
		};


		var run = function() {
			if (running < limit && queue.length > 0) {
				running++;
				var job = queue.pop();
				job.fn.apply(job.thisArg, job.args).then(function(value) {
					running--;
					job.deferred.resolve(value);
					run();
				}).fail(function(error) {
					running--;
					job.deferred.reject(error);
					run();
				});
			}
		};


	}


	return new QThrottle(limit);


};
