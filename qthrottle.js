var q = require('q');

module.exports = function(limit, name) {

	
	function QThrottle(limit, name) {


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


		var run = function() {
			console.log(name + ' [' + running + '/' + queue.length + ']');
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


	return new QThrottle(limit, name);


};