"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyPaths = void 0;
var fs_extra_1 = require("fs-extra");
var gulp_1 = __importDefault(require("gulp"));
var gulplog_1 = __importDefault(require("gulplog"));
var utils_1 = require("./lib/utils");
function copyPaths(destination) {
    gulplog_1.default.info('copyPaths with dependencies');
    gulplog_1.default.info({ dependencies: utils_1.dependencies });
    for (var _i = 0, dependencies_1 = utils_1.dependencies; _i < dependencies_1.length; _i++) {
        var dep = dependencies_1[_i];
        var srcPath = (0, utils_1.path)('node_modules', dep);
        var destPath = (0, utils_1.path)(destination, dep);
        gulplog_1.default.info("Copying " + dep + " to " + destPath);
        (0, fs_extra_1.copySync)(srcPath, destPath, { recursive: true });
    }
}
exports.copyPaths = copyPaths;
gulp_1.default.task('vendor', function (done) {
    copyPaths('dist/chrome/vendor');
    copyPaths('app/vendor');
    done();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVuZG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmVuZG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFDQUFvQztBQUNwQyw4Q0FBd0I7QUFDeEIsb0RBQTBCO0FBQzFCLHFDQUFpRDtBQUVqRCxTQUFnQixTQUFTLENBQUMsV0FBVztJQUNqQyxpQkFBRyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3hDLGlCQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsWUFBWSxzQkFBQSxFQUFFLENBQUMsQ0FBQztJQUMzQixLQUFtQixVQUFZLEVBQVosaUJBQUEsb0JBQVksRUFBWiwwQkFBWSxFQUFaLElBQVksRUFBRztRQUE1QixJQUFNLEdBQUcscUJBQUE7UUFFWCxJQUFNLE9BQU8sR0FBSSxJQUFBLFlBQUksRUFBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0MsSUFBTSxRQUFRLEdBQUcsSUFBQSxZQUFJLEVBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLGlCQUFHLENBQUMsSUFBSSxDQUFDLGFBQVcsR0FBRyxZQUFPLFFBQVUsQ0FBQyxDQUFDO1FBQzFDLElBQUEsbUJBQVEsRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7S0FDcEQ7QUFFTCxDQUFDO0FBWEQsOEJBV0M7QUFFRCxjQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFBLElBQUk7SUFDcEIsU0FBUyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDaEMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hCLElBQUksRUFBRSxDQUFDO0FBQ1gsQ0FBQyxDQUFDLENBQUMifQ==