/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./worker/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./worker/index.js":
/*!*************************!*\
  !*** ./worker/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\nconst util = __webpack_require__(/*! ./util */ \"./worker/util.js\")\r\n\r\nutil()\r\n\r\n\r\n\r\nconst CACHE_STATIC_NAME = 'static-v27';\r\nconst CACHE_DYNAMIC_NAME = 'dynamic-v5';\r\nconst INDEXDB_DYNAMIC_NAME = \"linkup-db\";\r\nconst STATIC_FILES = [\r\n    '/',\r\n    // '/index.html',\r\n];\r\n\r\n\r\nself.addEventListener('install', function (event) {\r\n    console.log('[Service Worker] Installing Service Worker ...');\r\n    event.waitUntil(\r\n        caches.open(CACHE_STATIC_NAME)\r\n            .then(function (cache) {\r\n                console.log('[Service Worker] Precaching App Shell');\r\n                cache.addAll(STATIC_FILES);\r\n            }))\r\n\r\n});\r\n\r\n\r\nself.addEventListener('activate', function (event) {\r\n    console.log('[Service Worker] Activating Service Worker ....', event);\r\n\r\n    event.waitUntil(\r\n        caches.keys()\r\n            .then(function (keyList) {\r\n                return Promise.all(keyList.map(function (key) {\r\n                    if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {\r\n                        console.log('[Service Worker] Removing old cache.', key);\r\n                        return caches.delete(key);\r\n                    }\r\n                }));\r\n            })\r\n    );\r\n    return self.clients.claim();\r\n});\r\n\r\n\r\n\r\n\r\n// notification manage\r\nself.addEventListener('notificationclick', e => {\r\n    let notification = e.notification;\r\n    let action = e.action;\r\n\r\n    if (action === 'open') {\r\n        let url = location.origin;\r\n        clients.openWindow(url);\r\n        notification.close();\r\n    } else {\r\n        console.log(\"Notification _Rejected!\");\r\n\r\n        notification.close();\r\n    }\r\n\r\n})\r\n\r\nself.addEventListener('notificationclose', e => {\r\n    let notification = e.notification;\r\n    let action = e.action;\r\n\r\n    console.log(\"notification is closed\", notification);\r\n})\r\n\r\n\r\n\r\n// process all the request \r\nself.addEventListener('fetch', function (event) {\r\n\r\n    if (event.request.method === \"POST\") {\r\n        console.log(\"post request\");\r\n\r\n        event.respondWith(\r\n            fetch(event.request)\r\n                .then(res => {\r\n                    return res;\r\n                })\r\n                .catch(err => {\r\n                    return err;\r\n                    console.log(\"err to process post due to network/ stored in indexdb -- for feature try\");\r\n                }));\r\n\r\n\r\n    } else {\r\n\r\n        // recording all the req in cache\r\n        event.respondWith(\r\n            fetch(event.request)\r\n                .then(function (res) {\r\n                    return caches.open(CACHE_DYNAMIC_NAME)\r\n                        .then(function (cache) {\r\n                            cache.put(event.request.url, res.clone());\r\n                            return res;   // update the cache and return the network res;\r\n                        })\r\n                })\r\n                .catch(function (err) {\r\n                    console.log(\"offline req\")\r\n                    return caches.match(event.request)\r\n                        .then(res => {\r\n                            console.log(\"i got the res in cache\", res)\r\n                            if (res) {\r\n                                return res;\r\n                            } else {\r\n                                console.log(\"there is no resp for this req in cache!\")\r\n                                return JSON.stringify({ message: \"you are offline\" })\r\n                            }\r\n\r\n                        })\r\n                })\r\n        );\r\n\r\n    }\r\n});\r\n\r\n\r\n\r\n\r\n\r\n//  read the notification from the server \r\n\r\nself.addEventListener('push', function (e) {\r\n    console.log(\"someone push the notification !!\");\r\n\r\n    console.log(\"server notification data\", e.data);\r\n\r\n    // generate the notification from server data \r\n    let payload = e.data ? JSON.parse(e.data.text()) : {\r\n        title: \"default Title for noitification\",\r\n        body: \"default -server push notification body\",\r\n      //  icon: \"/images/icons/icon-96x96.png\",\r\n    };\r\n\r\n    var options = {\r\n        body: payload.body,\r\n      //  icon: \"/images/icons/icon-96x96.png\",\r\n       // badge: \"/images/icons/icon-96x96.png\",\r\n        vibrate: [100, 50, 100],\r\n        data: {\r\n            dateOfArrival: Date.now(),\r\n            primaryKey: '2'\r\n        },\r\n        actions: [\r\n            {\r\n                action: 'open', title: 'Explore this new world',\r\n             //      icon: \"/images/icons/icon-96x96.png\",\r\n            },\r\n            {\r\n                action: 'close', title: 'Close',\r\n            //icon: \"/images/icons/icon-96x96.png\",\r\n            },\r\n        ]\r\n    };\r\n    e.waitUntil(\r\n        self.registration.showNotification(payload.title, options)\r\n    );\r\n\r\n});\r\n\r\n\r\n\r\nself.addEventListener('sync', function (event) {\r\n    if (event.tag == 'sync-post') {\r\n        console.log(\"we have data to post online!!!\");\r\n\r\n        let data = {\r\n            project: \"OfflinePost\",\r\n            task: \"_OfflinePost_task\",\r\n            date: \"01 Apr 2020\",\r\n            description: \"post is onffline\",\r\n            hours: \"08:00\",\r\n            userid: \"001\",\r\n            status: \"pending\"\r\n        }\r\n        fetch('https://pwa-serv-notify.herokuapp.com/api/pwa/timesheets/add', {\r\n            method: 'post',\r\n            body: JSON.stringify(data)\r\n        }).then(function (response) {\r\n            return response.json();\r\n        }).then(function (data) {\r\n            console.log(\"posteted back to online\")\r\n        });\r\n\r\n\r\n    }\r\n});\r\n\r\n\n\n//# sourceURL=webpack:///./worker/index.js?");

/***/ }),

/***/ "./worker/util.js":
/*!************************!*\
  !*** ./worker/util.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\nmodule.exports = () => {\r\n    console.log('Hello from util.')\r\n}\n\n//# sourceURL=webpack:///./worker/util.js?");

/***/ })

/******/ });