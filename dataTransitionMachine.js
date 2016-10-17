SM=(function(){
  this.StateMachine=function(){
    var main=this;
    onHandlers.call(this);
    this.start=function(initialState){
      this.switchState(initialState,"initialization");
    }
    this.eachState=function(iteratorCallback){
      for(var a in this.states){
        iteratorCallback(this.states[a],a);
      }
    }
    this.getChildrenOf=function(who){
      var whostring="";
      if(typeof who=="string"){
        whostring=who;
        who=states[who];
      }else{
        whostring=who.name;
      }
      var childlist=[];
      for(var a in who.children){
        childlist.push(states[who.children[a]]);
      }
      return childlist;
    }

    this.switchState=function(to,force){
      //console.log(this.states);
      var tostring="";
      if(typeof to=="string"){
        tostring=to;
        to=states[to];
      }else{
        tostring=to.name;
      }
      //console.log(tostring,to);
      if(to){
        if(to.isState){
          var allowed=false;
          if(force=="transitional"||force=="force"||force=="initialization"){
            console.log(force);
            allowed=true;
          }else{
            for(var a in activeState.children){
              // console.log(;
              if(activeState.children[a]===tostring){
                allowed=true;
                break;
              }
            }
          }
          if(allowed){
            to.activate();
            console.log(activeState.name+"-->"+tostring+"");
          }else{
            console.warn(activeState.name+"-x-"+tostring+"");
          }
        }else{
          console.warn("tried to switch state, but a state was not provided. You provided: "+tostring);
        }
      }else{
        console.warn("you are trying to switch tp: ",to);
      }
    }
    var stateRequiredData={
      //transitional states
      children:[],
      name:"none"
    }
    this.states={};
    var states=this.states;
    activeState={deactivate:function(){console.log("hi there");}};
    this.create=function(list){
      for(var a in list){
        var nl=list[a];
        nl.name=a;
        //console.log(nl);

        new State(list[a]);
      }
    }
    var Element=function(properties){
      for(var a in properties){
        this[a]=properties[a];
      }
      onHandlers.call(this);
    }
    var State=function(properties){

      this.isState=true;
      var parent=this;
      this.transitional=false;
      this.children=[];
      for(var a in stateRequiredData){
        if(!properties[a]){
          //console.log(a+" is a required property in "+this.name+"/"+this.className);
          return false;
        }
      }
      Element.call(this,properties);
      // if()
      // properties.transitional();
      this.activate=function(){
        activeState.deactivate();
        console.log(parent.transitional);
        if(parent.transitional){
          parent.transitional(function(){
            switchState(parent.children[0],"transitional");
          });
        }
        activeState=this;
        parent.handle("activation");
        main.handle("stateActivation",{originator:parent});
      }
      this.deactivate=function(){
        console.log("noup");
        parent.handle("deactivation");
        main.handle("stateDeactivation",{originator:parent});
      }
      this.getChild=function(n){
        if(n){
          return this.children[n];
        }else{
          return this.childen;
        }
      }
      this.handle("creation",{originator:this});
      main.handle("stateCreation",{originator:parent});
      //console.log(this);
      main.states[this.name]=this;
    }
    // var newTransitionalState=function(properties){
    //   State.call(this,properties);
    //   // this.transitionEnd=
    //   var stateTransitionFunction=this.transition;
    //   this.activate=function(to){
    //     this.stateTransitionFunction(to);
    //     window.setTimeOut(function(){
    //       switchState(this.children[0],true);
    //     },500);
    //   }
    //
    //   return this;
    // }
    // var StableState=function(properties){
    //   State.call(this,properties);
    // }

  }
  return this;
})();