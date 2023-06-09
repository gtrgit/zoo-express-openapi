import express from "express";
/**
 * Combine multiple middleware together.
 *
 * @param {Function[]} mids functions of form:
 *   function(req, res, next) { ... }
 * @return {Function} single combined middleware
 */
export default function combineMiddleware(mids: express.RequestHandler[]) {
	return mids.reduce(function (a, b) {
		return function (req, res, next) {
			a(req, res, function (err) {
				if (err) {
					return next(err);
				}
				b(req, res, next);
			});
		};
	});
}
