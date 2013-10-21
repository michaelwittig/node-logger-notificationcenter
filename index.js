var util = require("util"),
	notifier = require("osx-notifier"),
	lib = require("cinovo-logger-lib");

function toType(level) {
	if (level === "error" || level === "critical") {
		return "fail";
	} else if (level === "info") {
		return "pass";
	}
	return "info";
}

function NotificationCenterEndpoint(debug, info, error, critial) {
	lib.Endpoint.call(this, debug, info, error, critial, "notificationcenter");
}
util.inherits(NotificationCenterEndpoint, lib.Endpoint);
NotificationCenterEndpoint.prototype._log = function(log, callback) {
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
	callback();
};

module.exports = function(debug, info, error, critical) {
	return new NotificationCenterEndpoint(debug, info, error, critical);
};
