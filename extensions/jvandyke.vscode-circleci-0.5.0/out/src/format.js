"use strict";
var moment = require('moment');
var _ = require('lodash');
// These should match the keys exposed in the APi response for
// status on a build.
var statusFormatters = {
    success: buildDetailsForSuccess,
    failure: buildDetailsForFailure,
};
function timeAgo(date) {
    return moment(date).fromNow();
}
exports.timeAgo = timeAgo;
function timeElapsed(startTime, stopTime) {
    return moment(startTime).diff(moment(stopTime), "minutes");
}
exports.timeElapsed = timeElapsed;
function buildLabel(build) {
    return [
        "#" + build.build_num,
        build.subject
    ].join(' - ');
}
exports.buildLabel = buildLabel;
function buildDescription(build) {
    return "";
}
exports.buildDescription = buildDescription;
function buildDetails(build) {
    return (statusFormatters[build.status] || buildDetailsForGeneric)(build);
}
exports.buildDetails = buildDetails;
function buildDetailsForGeneric(build) {
    return [
        _.startCase(build.status),
    ].join(' ');
}
exports.buildDetailsForGeneric = buildDetailsForGeneric;
function buildDetailsForRunning(build) {
    return [
        _.startCase(build.status),
        '-',
        'started',
        timeAgo(build.start_time),
        'by',
        build.committer_email
    ].join(' ');
}
exports.buildDetailsForRunning = buildDetailsForRunning;
function buildDetailsForSuccess(build) {
    return [
        _.startCase(build.status),
        '-',
        timeAgo(build.stop_time),
        'by',
        build.committer_email
    ].join(' ');
}
exports.buildDetailsForSuccess = buildDetailsForSuccess;
function buildDetailsForFailure(build) {
    return [
        _.startCase(build.status),
        '-',
        timeAgo(build.stop_time),
        'by',
        build.committer_email
    ].join(' ');
}
exports.buildDetailsForFailure = buildDetailsForFailure;
function quickPickItemFromBuild(build) {
    return {
        label: buildLabel(build),
        description: '',
        detail: buildDetails(build),
        build: build
    };
}
exports.quickPickItemFromBuild = quickPickItemFromBuild;
//# sourceMappingURL=format.js.map