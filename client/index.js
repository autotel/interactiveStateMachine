var machine=require('./StateMachine');
var stateGraph=require('./stateGraph');
document.addEventListener('DOMContentLoaded', function(){ // on dom ready
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