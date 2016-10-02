document.addEventListener('DOMContentLoaded', function(){ // on dom ready
var state=(function(){
  var currentNode;
  function set(to){
    currentNode=to;
  }
  function getPossible(){

  }
  return this;
})();
var cy = cytoscape({
  container: document.querySelector('#cy'),

  boxSelectionEnabled: true,
  autounselectify: false,

  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'content': 'data(name)',
        'text-valign': 'center',
        'color': 'white',
        'text-outline-width': 2,
        'background-color': '#999',
        'text-outline-color': '#999'
      })
    .selector('edge')
      .css({
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'target-arrow-color': '#ccc',
        'line-color': '#ccc',
        'width': 1
      })
    .selector(':selected')
      .css({
        'background-color': 'black',
        'line-color': 'black',
        'target-arrow-color': 'black',
        'source-arrow-color': 'black'
      })
    .selector('.faded')
      .css({
        'opacity': 0.25,
        'text-opacity': 0
      }),



});
var cyObjects=cy.add({
  nodes: [
    { data: { id: 'j', name: 'Jerry', state:[{0:"red",2:"black"}] }},
    { data: { id: 'e', name: 'Elaine', state:[{2:"green",3:"black"}] }},
    { data: { id: 'k', name: 'Kramer', state:[{2:"green"}] }},
    { data: { id: 'g', name: 'George', state:[{3:"black",2:"yellow"}] }}
  ],
  edges: [
    { data: { source: 'j', target: 'e' } },
    { data: { source: 'j', target: 'k' } },
    { data: { source: 'j', target: 'g' } },
    { data: { source: 'e', target: 'j' } },
    { data: { source: 'e', target: 'k' } },
    { data: { source: 'k', target: 'j' } },
    { data: { source: 'k', target: 'e' } },
    { data: { source: 'k', target: 'g' } },
    { data: { source: 'g', target: 'j' } }
  ]
});
cy.layout({name:'grid'})
cy.makeLayout(
{
  name: 'cose',
  // Called on `layoutready`
  ready: function(){},
  // Called on `layoutstop`
  stop: function(){},
  // Whether to animate while running the layout
  animate: true,
  // The layout animates only after this many milliseconds
  // (prevents flashing on fast runs)
  animationThreshold: 500,
  // Number of iterations between consecutive screen positions update
  // (0 -> only updated on the end)
  refresh: 200,
  // Whether to fit the network view after when done
  fit: true,
  // Padding on fit
  padding: 30,
  // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  boundingBox: undefined,
  // Randomize the initial positions of the nodes (true) or use existing positions (false)
  randomize: false,
  // Extra spacing between components in non-compound graphs
  componentSpacing: 100,
  // Node repulsion (non overlapping) multiplier
  nodeRepulsion: function( node ){ return 400000; },
  // Node repulsion (overlapping) multiplier
  nodeOverlap: 10,
  // Ideal edge (non nested) length
  idealEdgeLength: function( edge ){ return 10; },
  // Divisor to compute edge forces
  edgeElasticity: function( edge ){ return 100; },
  // Nesting factor (multiplier) to compute ideal edge length for nested edges
  nestingFactor: 5,
  // Gravity force (constant)
  gravity: 80,
  // Maximum number of iterations to perform
  numIter: 1000,
  // Initial temperature (maximum node displacement)
  initialTemp: 200,
  // Cooling factor (how the temperature is reduced between consecutive iterations
  coolingFactor: 0.95,
  // Lower temperature threshold (below this point the layout will end)
  minTemp: 1.0,
  // Whether to use threading to speed up the layout
  useMultitasking: true
}).run();
// cy.remove(cyObjects[2]);

cy.on('tap', 'node', function(e){
    var node = e.cyTarget;
    var neighborhood = node.neighborhood().add(node);
    cy.elements().addClass('faded');
    neighborhood.removeClass('faded');
    console.log(node.data().test());
    console.log(neighborhood.data());
});
//add listener to single element
cy.on('tap', cyObjects[2], function(e){
    var node = e.cyTarget;
    var neighborhood = node.neighborhood().add(node);
    cy.elements().addClass('faded');
    neighborhood.removeClass('faded');
});
// cy.on('tap', 'node', function(e){
//   var node = e.cyTarget;
//   var ran=Math.random()+"";
//   var eles = cy.add([
//     { group: "nodes", data: { id: ran }, position: { x: 200, y: 200 } },
//     { group: "edges", data: { id: "e"+ran, source: node.id(), target: ran } }
//   ]);
// });


cy.on('tap', function(e){
  if( e.cyTarget === cy ){
    cy.elements().removeClass('faded');
  }
});

}); // on dom ready