var util = require("util"),
	notifier = require("osx-notifier"),
	lib = require("cinovo-logger-lib");

function toType(level) {
	"use strict";
	if (level === "error" || level === "critical") {
		return "fail";
	}
	if (level === "info") {
		return "pass";
	}
	return "info";
}

function NotificationCenterEndpoint(debug, info, error, critial) {
	"use strict";
	lib.Endpoint.call(this, debug, info, error, critial, "notificationcenter");
}
util.inherits(NotificationCenterEndpoint, lib.Endpoint);
NotificationCenterEndpoint.prototype._log = function(log, callback) {
	"use strict";
	notifier({
		type: toType(log.level),
		title: log.level,
		subtitle: log.origin,
		message: log.message,
		group: "cinovo-logger"
	});
	callback();
};
NotificationCenterEndpoint.prototype._stop = function(callback) {
	"use strict";
	callback();
};

module.exports = function(debug, info, error, critical) {
	"use strict";
	return new NotificationCenterEndpoint(debug, info, error, critical);
};
