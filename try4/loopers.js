looperManager=(function(){
  var dynaconsole= document.getElementById("dynamicConsole");
  var exports={};
  var loop;
  var transportCurrentStep=0;
  var globalTransport=false;
  var sequencers=[];
  transportStart=function(){
    this.beatCalls=[
      function(){
        dynaconsole.innerHTML=("<pre>"+beatCalls.length+"</pre>"+this.lastBeatTime);
      }
    ];
    Tone.Transport.scheduleRepeat (function(time){
      for(var n in sequencers){
        try{
          sequencers[n].step({time:time,step:transportCurrentStep});
        }catch(e){
          console.log(e);
          console.warn("at step "+transportCurrentStep%sequencers[n].length+" of sequencer "+n);
        }
      }
      transportCurrentStep++;
    }, "32n");
    Tone.Transport.start();
    Tone.Transport.bpm.value = 120;
    this.onBeat=function(call){
      handlern=beatCalls.push(call);
      return beatCalls[handlern-1];
    }
    this.offBeat=function(handler){
      return beatCalls.splice(handler);
    }
    return this;
  };

  globalTransport=transportStart();
  Sequencer=function(){
    sequencers.push(this);
    this.length=92;
    this.sequence={

      //48:function(){instruments[0].stop();instruments[0].engine.playbackRate=1},
      // 49:function(){instruments[0].restart()},
      // 81:function(){instruments[0].engine.playbackRate*=0.8},
      // 91:function(){instruments[0].stop();instruments[0].engine.playbackRate=1.2},
    };
    this.step=function(e){
      if(this.sequence[e.step%this.length]){
        this.sequence[e.step%this.length]();
      }
    }
  }


  var Sampler=function(databaseItem){
    var parent=this;
    if(databaseItem.hasOwnProperty("source")){
      parent.engine=new Tone.Player(databaseItem.source,function(a){
        parent.play=function(){
          parent.engine.start();
        };
        parent.restart=function(){
          parent.engine.stop();
          parent.engine.start();
        }
        parent.stop=function(){
          parent.engine.stop();
        };
        parent.double=function(){
          parent.tempoFactor(2);
        };
        parent.half=function(){
          parent.tempoFactor(0.5);
        };
        parent.playerBender=function(bender){
          bender.setData(0.5);
        };
        parent.playerBender=function(bender){
          var value=bender.data.value*2;
          parent.engine.playbackRate=(parent.playbackRate)*value;
        };
      }).toMaster();
      this.engine.loop=true;
      this.engine.retrigger=false;
    }else{
      console.log("sorry, databaseItem didnt specify a source ",databaseItem);
    }
  };
  var Perca=function(){
    new Tone.MembraneSynth({
  		"pitchDecay" : 0.008,
  		"octaves" : 2,
  		"envelope" : {
  			"attack" : 0.0006,
  			"decay" : 0.5,
  			"sustain" : 0
  		}
  	}).toMaster()
  };
  var Percb=function(){
    var engine=new Tone.MetalSynth ({
      frequency:200,
      envelope:{
        attack:0.0015,
        decay:1.4,
        release:0.2,
      },
      harmonicity:5.1,
      modulationIndex:32,
      resonance:300,
      octaves:1.5,
  	}).toMaster()
    this.triggerAttack=engine.triggerAttack;
    this.play=function(){engine.triggerAttack()};
  }
  var Syntha=function(){}

  var instruments={
    sampler0:new Sampler({
      // "name":"scorpio 01",
      "source":"audio/scorpio-01.wav",
      "bpm":119
    }),
    sampler1:new Sampler({
      // "name":"scorpio 01",
      "source":"audio/scorpio-01.wav",
      "bpm":119
    }),
    sampler2:new Sampler({
      // "name":"scorpio 01",
      "source":"audio/scorpio-01.wav",
      "bpm":119
    }),
    sampler3:new Sampler({
      // "name":"scorpio 01",
      "source":"audio/scorpio-01.wav",
      "bpm":119
    }),
    perc0:new Perca(),
    perc1:new Perca(),
    perc2:new Percb(),
    perc3:new Percb()

  };
  new Sequencer();
  new Sequencer();
  new Sequencer();
  new Sequencer();

  // exports.instruments=instruments;
  // exports.sequencers=sequencers;
  exports.tweak=function(callback){
    callback(instruments,sequencers);
  }
  return exports;
})()