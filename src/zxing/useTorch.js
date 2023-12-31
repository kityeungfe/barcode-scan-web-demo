var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useCallback, useEffect, useRef, useState } from "react";
export var useTorch = function (_a) {
    var resetStream = _a.resetStream;
    var _b = useState(false), isOn = _b[0], setIsOn = _b[1];
    var _c = useState(null), isAvailable = _c[0], setIsAvailable = _c[1];
    var videoTrackRef = useRef(null);
    var resetStreamRef = useRef(resetStream);
    var init = useCallback(function (videoTrack) {
        videoTrackRef.current = videoTrack;
        setIsAvailable(typeof videoTrack.getCapabilities === "function"
            ? videoTrack.getCapabilities().torch !== undefined
            : false);
    }, []);
    var on = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!videoTrackRef.current || !isAvailable)
                        return [2 /*return*/];
                    return [4 /*yield*/, videoTrackRef.current.applyConstraints({
                            advanced: [{ torch: true }],
                        })];
                case 1:
                    _a.sent();
                    setIsOn(true);
                    return [2 /*return*/];
            }
        });
    }); }, [isAvailable]);
    var off = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!videoTrackRef.current || !isAvailable)
                        return [2 /*return*/];
                    // applyConstraints with torch: false does not work to turn the flashlight off, as a stream's torch stays
                    // continuously on, see https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints#torch. Therefore,
                    // we have to stop the stream to turn the flashlight off.
                    videoTrackRef.current = null;
                    setIsAvailable(null);
                    setIsOn(false);
                    return [4 /*yield*/, resetStreamRef.current()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [isAvailable]);
    useEffect(function () {
        resetStreamRef.current = resetStream;
    }, [resetStream]);
    return { init: init, isOn: isOn, isAvailable: isAvailable, on: on, off: off };
};
