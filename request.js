"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = require("mithril");
/**
 * Mithril request wrapper that doesn't throw on error status codes.
 * Errors are thrown only on parse errors or network errors.
 */
function request(options) {
    var xhr;
    function extract(x) {
        xhr = x;
        var text = xhr.responseText;
        var data;
        if (options.extract) {
            data = options.extract(xhr, options);
        }
        else {
            if (options.deserialize) {
                data = options.deserialize(text);
            }
            else {
                try {
                    data = text !== '' ? JSON.parse(text) : null;
                }
                catch (err) {
                    throw new Error(text);
                }
            }
        }
        if (xhr.status >= 400 || xhr.status < 200) {
            var err = new Error('HTTP error code');
            err.httpStatus = xhr.status;
            err.data = data;
            // When mithril encounters these error codes it will *always* throw.
            // We pre-empt that throw here so we can recognize our own error object.
            throw err;
        }
        return data;
    }
    return mithril_1.request(__assign({}, options, { extract: extract })).then(function (result) { return ({
        errorCode: undefined, xhr: xhr, data: result
    }); }).catch(function (err) {
        if (err.httpStatus == null) {
            // Actual error - re-throw
            throw err;
        }
        // Check for status = 0 when doing file:// requests
        return (err.httpStatus === 0 && err.data)
            ? {
                errorCode: undefined, xhr: xhr, data: err.data
            }
            : {
                errorCode: err.httpStatus, xhr: xhr, error: err.data
            };
    });
}
exports.default = request;
