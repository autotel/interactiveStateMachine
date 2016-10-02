(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/*
repository of this module is at
https://github.com/autotel/on
*/

exports.onHandlers = function () {
  var eventVerbose = false;
  if (!this.ons) {
    this.ons = [];
  }
  this.on = function (name, callback) {
    var name = name.split(".");
    if (typeof callback === 'function') {
      if (name.length == 0) {
        throw "sorry, you gave an invalid event name";
      } else if (name.length > 0) {
        if (!this.ons[name[0]]) this.ons[name[0]] = [];
        this.ons[name[0]].push([false, callback]);
      }
      // console.log(this.ons);
    } else {
      throw "error at mouse.on, provided callback that is not a function";
    }
  };
  this.off = function (name) {
    var name = name.split(".");
    if (name.length > 1) {
      if (!this.ons[name[0]]) this.ons[name[0]] = [];
      // console.log("prev",this.ons[name[0]]);
      this.ons[name[0]].splice(this.ons[name[0]].indexOf(name[1]), 1);
      // console.log("then",this.ons[name[0]]);
    } else {
      throw "sorry, you gave an invalid event name" + name;
    }
  };
  this.handle = function (fname, params) {
    if (eventVerbose) console.log("Event " + fname + ":", { caller: this, params: params });
    if (this.ons[fname]) {
      for (var n in this.ons[fname]) {
        // console.log(this.ons[fname][n][1]);
        this.ons[fname][n][1](params);
      }
    }
  };
};

},{}],2:[function(require,module,exports){
"use strict";

var a = require('./OnHandlers');
var states = [];
exports.Create = function (config) {
  for (var a in config) {
    if (config[a].type = "state") {
      new State(config[a].properties);
    } else if (config[a].type = "transition") {
      new Transition(config[a].properties);
    }
  }
};
var Transition = function Transition(properties) {};
var State = function State(properties) {
  var parent = this;
  var properties = properties || {};
  console.log("c", properties);
  states.push(this);

  a.onHandlers.call(this);
  this.properties = {
    color: properties.color || "transparent",
    position: properties.position || {
      x: 0,
      y: 0
    },
    width: properties.width || 32,
    height: properties.height || 32
  };
  var props = this.properties;
  var myDom = document.createElement('div');
  this.dom = myDom;
  myDom.style.cssText = 'position:absolute;width:' + props.width + 'px;height:' + props.height + 'px;opacity:1;z-index:100;background:' + props.color + ';';
  myDom.innerHTML = '<img src="fly1.png" style="width:100%; height:100%;"/>';
  document.body.appendChild(myDom);
  myDom.addEventListener("mousedown", function (e) {
    e.preventDefault();
    parent.mousePressed = true;
    myDom.style.background = "red";
    parent.handle("mousedown", e);
  });
  myDom.addEventListener("mouseup", function (e) {
    e.preventDefault();
    parent.mousePressed = false;
    myDom.style.background = props.color;
    parent.handle("mouseup", e);
  });

  myDom.addEventListener("mouseleave", function (e) {
    e.preventDefault();
    if (parent.mousePressed) {
      myDom.style.background = props.color;
      parent.handle("mouseup", e);
    }
  });
};

},{"./OnHandlers":1}],3:[function(require,module,exports){
'use strict';

var machine = require('./StateMachine');
var stateGraph = require('./stateGraph');
document.addEventListener('DOMContentLoaded', function () {
  // on dom ready
  machine.create();
  // var state=(function(){
  //   var currentNode;
  //   function set(to){
  //     currentNode=to;
  //   }
  //   function getPossible(){
  //
  //   }
  //   return this;
  // })();
}); // on dom ready

},{"./StateMachine":2,"./stateGraph":4}],4:[function(require,module,exports){
"use strict";

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnRcXE9uSGFuZGxlcnMuanMiLCJjbGllbnRcXFN0YXRlTWFjaGluZS5qcyIsImNsaWVudFxcaW5kZXguanMiLCJjbGllbnQvc3RhdGVHcmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7O0FBSUEsUUFBQSxBQUFRLGFBQVcsWUFBVSxBQUMzQjtNQUFJLGVBQUosQUFBaUIsQUFDakI7TUFBSSxDQUFDLEtBQUwsQUFBVSxLQUFLLEFBQ2I7U0FBQSxBQUFLLE1BQUwsQUFBVyxBQUNaO0FBQ0Q7T0FBQSxBQUFLLEtBQUssVUFBQSxBQUFTLE1BQVQsQUFBZSxVQUFVLEFBQ2pDO1FBQUksT0FBTyxLQUFBLEFBQUssTUFBaEIsQUFBVyxBQUFXLEFBQ3RCO1FBQUksT0FBQSxBQUFPLGFBQVgsQUFBd0IsWUFBWSxBQUNsQztVQUFJLEtBQUEsQUFBSyxVQUFULEFBQW1CLEdBQUcsQUFDcEI7Y0FBQSxBQUFPLEFBQ1I7QUFGRCxhQUVPLElBQUksS0FBQSxBQUFLLFNBQVQsQUFBa0IsR0FBRyxBQUMxQjtZQUFJLENBQUMsS0FBQSxBQUFLLElBQUksS0FBZCxBQUFLLEFBQVMsQUFBSyxLQUFLLEtBQUEsQUFBSyxJQUFJLEtBQVQsQUFBUyxBQUFLLE1BQWQsQUFBb0IsQUFDNUM7YUFBQSxBQUFLLElBQUksS0FBVCxBQUFTLEFBQUssSUFBZCxBQUFrQixLQUFLLENBQUEsQUFBQyxPQUF4QixBQUF1QixBQUFRLEFBQ2hDO0FBQ0Q7QUFDRDtBQVJELFdBUU8sQUFDTDtZQUFBLEFBQU8sQUFDUjtBQUNGO0FBYkQsQUFjQTtPQUFBLEFBQUssTUFBTSxVQUFBLEFBQVMsTUFBTSxBQUN4QjtRQUFJLE9BQU8sS0FBQSxBQUFLLE1BQWhCLEFBQVcsQUFBVyxBQUN0QjtRQUFJLEtBQUEsQUFBSyxTQUFULEFBQWtCLEdBQUcsQUFDbkI7VUFBSSxDQUFDLEtBQUEsQUFBSyxJQUFJLEtBQWQsQUFBSyxBQUFTLEFBQUssS0FBSyxLQUFBLEFBQUssSUFBSSxLQUFULEFBQVMsQUFBSyxNQUFkLEFBQW9CLEFBQzVDO0FBQ0E7V0FBQSxBQUFLLElBQUksS0FBVCxBQUFTLEFBQUssSUFBZCxBQUFrQixPQUFPLEtBQUEsQUFBSyxJQUFJLEtBQVQsQUFBUyxBQUFLLElBQWQsQUFBa0IsUUFBUSxLQUFuRCxBQUF5QixBQUEwQixBQUFLLEtBQXhELEFBQTZELEFBQzdEO0FBQ0Q7QUFMRCxXQUtPLEFBQ0w7WUFBTywwQ0FBUCxBQUFpRCxBQUNsRDtBQUNGO0FBVkQsQUFXQTtPQUFBLEFBQUssU0FBUyxVQUFBLEFBQVMsT0FBVCxBQUFnQixRQUFRLEFBQ3BDO1FBQUEsQUFBRyxjQUFjLFFBQUEsQUFBUSxJQUFJLFdBQUEsQUFBUyxRQUFyQixBQUEyQixLQUFJLEVBQUMsUUFBRCxBQUFRLE1BQUssUUFBNUMsQUFBK0IsQUFBb0IsQUFDcEU7UUFBSSxLQUFBLEFBQUssSUFBVCxBQUFJLEFBQVMsUUFBUSxBQUNuQjtXQUFLLElBQUwsQUFBUyxLQUFLLEtBQUEsQUFBSyxJQUFuQixBQUFjLEFBQVMsUUFBUSxBQUM3QjtBQUNBO2FBQUEsQUFBSyxJQUFMLEFBQVMsT0FBVCxBQUFnQixHQUFoQixBQUFtQixHQUFuQixBQUFzQixBQUN2QjtBQUNGO0FBQ0Y7QUFSRCxBQVVEO0FBeENEOzs7OztBQ0pBLElBQUksSUFBSSxRQUFSLEFBQVEsQUFBUTtBQUNoQixJQUFJLFNBQUosQUFBVztBQUNYLFFBQUEsQUFBUSxTQUFPLFVBQUEsQUFBUyxRQUFPLEFBQzdCO09BQUksSUFBSixBQUFRLEtBQVIsQUFBYSxRQUFPLEFBQ2xCO1FBQUcsT0FBQSxBQUFPLEdBQVAsQUFBVSxPQUFiLEFBQWtCLFNBQVEsQUFDeEI7VUFBQSxBQUFJLE1BQU0sT0FBQSxBQUFPLEdBQWpCLEFBQW9CLEFBQ3JCO0FBRkQsV0FFTSxJQUFHLE9BQUEsQUFBTyxHQUFQLEFBQVUsT0FBYixBQUFrQixjQUFhLEFBQ25DO1VBQUEsQUFBSSxXQUFXLE9BQUEsQUFBTyxHQUF0QixBQUF5QixBQUUxQjtBQUNGO0FBQ0Y7QUFURDtBQVVBLElBQUksYUFBVyxTQUFYLEFBQVcsV0FBQSxBQUFTLFlBQVcsQUFFbEMsQ0FGRDtBQUdBLElBQUksUUFBUSxTQUFSLEFBQVEsTUFBQSxBQUFTLFlBQVksQUFDL0I7TUFBSSxTQUFKLEFBQWEsQUFDYjtNQUFJLGFBQWEsY0FBakIsQUFBK0IsQUFDL0I7VUFBQSxBQUFRLElBQVIsQUFBWSxLQUFaLEFBQWdCLEFBQ2hCO1NBQUEsQUFBTyxLQUFQLEFBQVksQUFFWjs7SUFBQSxBQUFFLFdBQUYsQUFBYSxLQUFiLEFBQWtCLEFBQ2xCO09BQUEsQUFBSztXQUNJLFdBQUEsQUFBVyxTQURGLEFBQ1csQUFDM0I7Y0FBVSxXQUFBLEFBQVc7U0FBWSxBQUM1QixBQUNIO1NBSmMsQUFFaUIsQUFFNUIsQUFFTDtBQUppQyxBQUMvQjtXQUdLLFdBQUEsQUFBVyxTQU5GLEFBTVcsQUFDM0I7WUFBUSxXQUFBLEFBQVcsVUFQckIsQUFBa0IsQUFPYSxBQUUvQjtBQVRrQixBQUNoQjtNQVFFLFFBQVEsS0FBWixBQUFpQixBQUNqQjtNQUFJLFFBQVEsU0FBQSxBQUFTLGNBQXJCLEFBQVksQUFBdUIsQUFDbkM7T0FBQSxBQUFLLE1BQUwsQUFBVyxBQUNYO1FBQUEsQUFBTSxNQUFOLEFBQVksVUFBVSw2QkFBNkIsTUFBN0IsQUFBbUMsUUFBbkMsQUFBMkMsZUFBZSxNQUExRCxBQUFnRSxTQUFoRSxBQUF5RSx5Q0FBeUMsTUFBbEgsQUFBd0gsUUFBOUksQUFBc0osQUFDdEo7UUFBQSxBQUFNLFlBQU4sQUFBa0IsQUFDaEI7V0FBQSxBQUFTLEtBQVQsQUFBYyxZQUFkLEFBQTBCLEFBQzVCO1FBQUEsQUFBTSxpQkFBTixBQUF1QixhQUFhLFVBQUEsQUFBUyxHQUFHLEFBQzlDO01BQUEsQUFBRSxBQUNGO1dBQUEsQUFBTyxlQUFQLEFBQXNCLEFBQ3RCO1VBQUEsQUFBTSxNQUFOLEFBQVksYUFBWixBQUF5QixBQUN6QjtXQUFBLEFBQU8sT0FBUCxBQUFjLGFBQWQsQUFBMkIsQUFDNUI7QUFMRCxBQU1BO1FBQUEsQUFBTSxpQkFBTixBQUF1QixXQUFXLFVBQUEsQUFBUyxHQUFHLEFBQzVDO01BQUEsQUFBRSxBQUNGO1dBQUEsQUFBTyxlQUFQLEFBQXNCLEFBQ3RCO1VBQUEsQUFBTSxNQUFOLEFBQVksYUFBYSxNQUF6QixBQUErQixBQUMvQjtXQUFBLEFBQU8sT0FBUCxBQUFjLFdBQWQsQUFBeUIsQUFDMUI7QUFMRCxBQU9BOztRQUFBLEFBQU0saUJBQU4sQUFBdUIsY0FBYyxVQUFBLEFBQVMsR0FBRyxBQUMvQztNQUFBLEFBQUUsQUFDRjtRQUFJLE9BQUosQUFBVyxjQUFjLEFBQ3ZCO1lBQUEsQUFBTSxNQUFOLEFBQVksYUFBYSxNQUF6QixBQUErQixBQUMvQjthQUFBLEFBQU8sT0FBUCxBQUFjLFdBQWQsQUFBeUIsQUFDMUI7QUFDRjtBQU5ELEFBUUQ7QUEzQ0Q7Ozs7O0FDZkEsSUFBSSxVQUFRLFFBQVosQUFBWSxBQUFRO0FBQ3BCLElBQUksYUFBVyxRQUFmLEFBQWUsQUFBUTtBQUN2QixTQUFBLEFBQVMsaUJBQVQsQUFBMEIsb0JBQW9CLFlBQVUsQUFBRTtBQUN4RDtVQUFBLEFBQVEsQUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNDO0EsQUFaRCxJQVlJOzs7QUNkSjtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXHJcbnJlcG9zaXRvcnkgb2YgdGhpcyBtb2R1bGUgaXMgYXRcclxuaHR0cHM6Ly9naXRodWIuY29tL2F1dG90ZWwvb25cclxuKi9cclxuZXhwb3J0cy5vbkhhbmRsZXJzPWZ1bmN0aW9uKCl7XHJcbiAgdmFyIGV2ZW50VmVyYm9zZT1mYWxzZTtcclxuICBpZiAoIXRoaXMub25zKSB7XHJcbiAgICB0aGlzLm9ucyA9IFtdO1xyXG4gIH1cclxuICB0aGlzLm9uID0gZnVuY3Rpb24obmFtZSwgY2FsbGJhY2spIHtcclxuICAgIHZhciBuYW1lID0gbmFtZS5zcGxpdChcIi5cIik7XHJcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIGlmIChuYW1lLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgdGhyb3cgKFwic29ycnksIHlvdSBnYXZlIGFuIGludmFsaWQgZXZlbnQgbmFtZVwiKTtcclxuICAgICAgfSBlbHNlIGlmIChuYW1lLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBpZiAoIXRoaXMub25zW25hbWVbMF1dKSB0aGlzLm9uc1tuYW1lWzBdXSA9IFtdO1xyXG4gICAgICAgIHRoaXMub25zW25hbWVbMF1dLnB1c2goW2ZhbHNlLCBjYWxsYmFja10pO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMub25zKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IChcImVycm9yIGF0IG1vdXNlLm9uLCBwcm92aWRlZCBjYWxsYmFjayB0aGF0IGlzIG5vdCBhIGZ1bmN0aW9uXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuICB0aGlzLm9mZiA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgIHZhciBuYW1lID0gbmFtZS5zcGxpdChcIi5cIik7XHJcbiAgICBpZiAobmFtZS5sZW5ndGggPiAxKSB7XHJcbiAgICAgIGlmICghdGhpcy5vbnNbbmFtZVswXV0pIHRoaXMub25zW25hbWVbMF1dID0gW107XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwicHJldlwiLHRoaXMub25zW25hbWVbMF1dKTtcclxuICAgICAgdGhpcy5vbnNbbmFtZVswXV0uc3BsaWNlKHRoaXMub25zW25hbWVbMF1dLmluZGV4T2YobmFtZVsxXSksIDEpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhcInRoZW5cIix0aGlzLm9uc1tuYW1lWzBdXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyAoXCJzb3JyeSwgeW91IGdhdmUgYW4gaW52YWxpZCBldmVudCBuYW1lXCIgKyBuYW1lKTtcclxuICAgIH1cclxuICB9XHJcbiAgdGhpcy5oYW5kbGUgPSBmdW5jdGlvbihmbmFtZSwgcGFyYW1zKSB7XHJcbiAgICBpZihldmVudFZlcmJvc2UpIGNvbnNvbGUubG9nKFwiRXZlbnQgXCIrZm5hbWUrXCI6XCIse2NhbGxlcjp0aGlzLHBhcmFtczpwYXJhbXN9KTtcclxuICAgIGlmICh0aGlzLm9uc1tmbmFtZV0pIHtcclxuICAgICAgZm9yICh2YXIgbiBpbiB0aGlzLm9uc1tmbmFtZV0pIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm9uc1tmbmFtZV1bbl1bMV0pO1xyXG4gICAgICAgIHRoaXMub25zW2ZuYW1lXVtuXVsxXShwYXJhbXMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufTsiLCJ2YXIgYSA9IHJlcXVpcmUoJy4vT25IYW5kbGVycycpO1xyXG52YXIgc3RhdGVzPVtdO1xyXG5leHBvcnRzLkNyZWF0ZT1mdW5jdGlvbihjb25maWcpe1xyXG4gIGZvcih2YXIgYSBpbiBjb25maWcpe1xyXG4gICAgaWYoY29uZmlnW2FdLnR5cGU9XCJzdGF0ZVwiKXtcclxuICAgICAgbmV3IFN0YXRlKGNvbmZpZ1thXS5wcm9wZXJ0aWVzKTtcclxuICAgIH1lbHNlIGlmKGNvbmZpZ1thXS50eXBlPVwidHJhbnNpdGlvblwiKXtcclxuICAgICAgbmV3IFRyYW5zaXRpb24oY29uZmlnW2FdLnByb3BlcnRpZXMpO1xyXG5cclxuICAgIH1cclxuICB9XHJcbn1cclxudmFyIFRyYW5zaXRpb249ZnVuY3Rpb24ocHJvcGVydGllcyl7XHJcblxyXG59XHJcbnZhciBTdGF0ZSA9IGZ1bmN0aW9uKHByb3BlcnRpZXMpIHtcclxuICB2YXIgcGFyZW50ID0gdGhpcztcclxuICB2YXIgcHJvcGVydGllcyA9IHByb3BlcnRpZXMgfHwge307XHJcbiAgY29uc29sZS5sb2coXCJjXCIscHJvcGVydGllcyk7XHJcbiAgc3RhdGVzLnB1c2godGhpcyk7XHJcblxyXG4gIGEub25IYW5kbGVycy5jYWxsKHRoaXMpO1xyXG4gIHRoaXMucHJvcGVydGllcyA9IHtcclxuICAgIGNvbG9yOiBwcm9wZXJ0aWVzLmNvbG9yIHx8IFwidHJhbnNwYXJlbnRcIixcclxuICAgIHBvc2l0aW9uOiBwcm9wZXJ0aWVzLnBvc2l0aW9uIHx8IHtcclxuICAgICAgeDogMCxcclxuICAgICAgeTogMFxyXG4gICAgfSxcclxuICAgIHdpZHRoOiBwcm9wZXJ0aWVzLndpZHRoIHx8IDMyLFxyXG4gICAgaGVpZ2h0OiBwcm9wZXJ0aWVzLmhlaWdodCB8fCAzMlxyXG4gIH07XHJcbiAgdmFyIHByb3BzID0gdGhpcy5wcm9wZXJ0aWVzO1xyXG4gIHZhciBteURvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIHRoaXMuZG9tID0gbXlEb207XHJcbiAgbXlEb20uc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDonICsgcHJvcHMud2lkdGggKyAncHg7aGVpZ2h0OicgKyBwcm9wcy5oZWlnaHQgKyAncHg7b3BhY2l0eToxO3otaW5kZXg6MTAwO2JhY2tncm91bmQ6JyArIHByb3BzLmNvbG9yICsgJzsnO1xyXG4gIG15RG9tLmlubmVySFRNTCA9ICc8aW1nIHNyYz1cImZseTEucG5nXCIgc3R5bGU9XCJ3aWR0aDoxMDAlOyBoZWlnaHQ6MTAwJTtcIi8+JztcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobXlEb20pO1xyXG4gIG15RG9tLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBwYXJlbnQubW91c2VQcmVzc2VkID0gdHJ1ZTtcclxuICAgIG15RG9tLnN0eWxlLmJhY2tncm91bmQgPSBcInJlZFwiO1xyXG4gICAgcGFyZW50LmhhbmRsZShcIm1vdXNlZG93blwiLCBlKTtcclxuICB9KTtcclxuICBteURvbS5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIHBhcmVudC5tb3VzZVByZXNzZWQgPSBmYWxzZTtcclxuICAgIG15RG9tLnN0eWxlLmJhY2tncm91bmQgPSBwcm9wcy5jb2xvcjtcclxuICAgIHBhcmVudC5oYW5kbGUoXCJtb3VzZXVwXCIsIGUpO1xyXG4gIH0pO1xyXG5cclxuICBteURvbS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGlmIChwYXJlbnQubW91c2VQcmVzc2VkKSB7XHJcbiAgICAgIG15RG9tLnN0eWxlLmJhY2tncm91bmQgPSBwcm9wcy5jb2xvcjtcclxuICAgICAgcGFyZW50LmhhbmRsZShcIm1vdXNldXBcIiwgZSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG59IiwidmFyIG1hY2hpbmU9cmVxdWlyZSgnLi9TdGF0ZU1hY2hpbmUnKTtcclxudmFyIHN0YXRlR3JhcGg9cmVxdWlyZSgnLi9zdGF0ZUdyYXBoJyk7XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpeyAvLyBvbiBkb20gcmVhZHlcclxuICBtYWNoaW5lLmNyZWF0ZSgpO1xyXG4vLyB2YXIgc3RhdGU9KGZ1bmN0aW9uKCl7XHJcbi8vICAgdmFyIGN1cnJlbnROb2RlO1xyXG4vLyAgIGZ1bmN0aW9uIHNldCh0byl7XHJcbi8vICAgICBjdXJyZW50Tm9kZT10bztcclxuLy8gICB9XHJcbi8vICAgZnVuY3Rpb24gZ2V0UG9zc2libGUoKXtcclxuLy9cclxuLy8gICB9XHJcbi8vICAgcmV0dXJuIHRoaXM7XHJcbi8vIH0pKCk7XHJcbn0pOyAvLyBvbiBkb20gcmVhZHkiLCJcInVzZSBzdHJpY3RcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklpSXNJbVpwYkdVaU9pSnpkR0YwWlVkeVlYQm9MbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2x0ZGZRPT0iXX0=
