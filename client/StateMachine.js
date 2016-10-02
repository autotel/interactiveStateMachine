var a = require('./OnHandlers');
var states=[];
exports.Create=function(config){
  for(var a in config){
    if(config[a].type="state"){
      new State(config[a].properties);
    }else if(config[a].type="transition"){
      new Transition(config[a].properties);

    }
  }
}
var Transition=function(properties){

}
var State = function(properties) {
  var parent = this;
  var properties = properties || {};
  console.log("c",properties);
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
  myDom.addEventListener("mousedown", function(e) {
    e.preventDefault()
    parent.mousePressed = true;
    myDom.style.background = "red";
    parent.handle("mousedown", e);
  });
  myDom.addEventListener("mouseup", function(e) {
    e.preventDefault()
    parent.mousePressed = false;
    myDom.style.background = props.color;
    parent.handle("mouseup", e);
  });

  myDom.addEventListener("mouseleave", function(e) {
    e.preventDefault()
    if (parent.mousePressed) {
      myDom.style.background = props.color;
      parent.handle("mouseup", e);
    }
  });

}