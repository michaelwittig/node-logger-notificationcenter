var endpoint = require("../index");

describe("notificationcenter", function(){
	describe("debug()", function() {
		it("should work with level and message", function(done) {
			var log = {
				date: new Date(),
				pid: process.pid,
				level: "debug",
				origin: "origin",
				message: "message"
			};
			endpoint(true, true, true, true).log(log, function(err) {
				if (err) {
					throw err;
				}
				done();
			});
		});
	});
});
