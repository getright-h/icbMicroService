(window["webpackJsonp_test"] = window["webpackJsonp_test"] || []).push([[10],{

/***/ "./src/solution/pages/login/login.module.tsx":
/*!***************************************************!*\
  !*** ./src/solution/pages/login/login.module.tsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _framework_util_routes_routes_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/framework/util/routes/routes.service */ \"./src/framework/util/routes/routes.service.tsx\");\n/* harmony import */ var _login_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.routes */ \"./src/solution/pages/login/login.routes.ts\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/esm/react-router-dom.js\");\n\n\n\n\nvar LoginModule = function () {\n    return (react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](react__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], null, _framework_util_routes_routes_service__WEBPACK_IMPORTED_MODULE_1__[\"RoutesService\"].renderRoutes(_login_routes__WEBPACK_IMPORTED_MODULE_2__[\"loginRoutes\"], false, react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](react_router_dom__WEBPACK_IMPORTED_MODULE_3__[\"Redirect\"], { from: \"/\", exact: true, to: \"/login\", key: \"redirect\" }))));\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (LoginModule);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc29sdXRpb24vcGFnZXMvbG9naW4vbG9naW4ubW9kdWxlLnRzeC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL3Rlc3QvLi9zcmMvc29sdXRpb24vcGFnZXMvbG9naW4vbG9naW4ubW9kdWxlLnRzeD9kZjJmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFJvdXRlc1NlcnZpY2UgfSBmcm9tICd+L2ZyYW1ld29yay91dGlsL3JvdXRlcy9yb3V0ZXMuc2VydmljZSc7XG5pbXBvcnQgeyBsb2dpblJvdXRlcyB9IGZyb20gJy4vbG9naW4ucm91dGVzJztcbmltcG9ydCB7IFJlZGlyZWN0IH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmNvbnN0IExvZ2luTW9kdWxlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgIHtSb3V0ZXNTZXJ2aWNlLnJlbmRlclJvdXRlcyhsb2dpblJvdXRlcywgZmFsc2UsIDxSZWRpcmVjdCBmcm9tPVwiL1wiIGV4YWN0IHRvPVwiL2xvZ2luXCIga2V5PVwicmVkaXJlY3RcIj48L1JlZGlyZWN0Pil9XG4gICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExvZ2luTW9kdWxlO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFLQTtBQUVBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/solution/pages/login/login.module.tsx\n");

/***/ }),

/***/ "./src/solution/pages/login/login.routes.ts":
/*!**************************************************!*\
  !*** ./src/solution/pages/login/login.routes.ts ***!
  \**************************************************/
/*! exports provided: loginRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loginRoutes\", function() { return loginRoutes; });\nvar MODULE_PATH = 'login';\nvar loginRoutes = [\n    {\n        path: \"\" + MODULE_PATH,\n        component: function () { return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, /*! ./login-component/login.component */ \"./src/solution/pages/login/login-component/login.component.tsx\")); },\n        lazyload: true,\n        exact: true\n    }\n];\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc29sdXRpb24vcGFnZXMvbG9naW4vbG9naW4ucm91dGVzLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGVzdC8uL3NyYy9zb2x1dGlvbi9wYWdlcy9sb2dpbi9sb2dpbi5yb3V0ZXMudHM/MzNiYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUm91dGUgfSBmcm9tICd+ZnJhbWV3b3JrL2ludGVyZmFjZXMvSVJvdXRlJztcblxuY29uc3QgTU9EVUxFX1BBVEggPSAnbG9naW4nO1xuZXhwb3J0IGNvbnN0IGxvZ2luUm91dGVzOiBJUm91dGVbXSA9IFtcbiAge1xuICAgIHBhdGg6IGAke01PRFVMRV9QQVRIfWAsXG4gICAgY29tcG9uZW50OiAoKSA9PiBpbXBvcnQoJy4vbG9naW4tY29tcG9uZW50L2xvZ2luLmNvbXBvbmVudCcpLFxuICAgIGxhenlsb2FkOiB0cnVlLFxuICAgIGV4YWN0OiB0cnVlXG4gIH1cbl07XG4iXSwibWFwcGluZ3MiOiJBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/solution/pages/login/login.routes.ts\n");

/***/ })

}]);