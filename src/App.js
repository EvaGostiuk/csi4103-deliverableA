import './App.css';
import React, { useState, useEffect } from "react";
import ForceGraph3D from "3d-force-graph";
import nodes from './nodes.json';
import links from './links.json';


const GraphGenerator = (props) => {
  // my code  is most of this function, but because it is related to library a lot of it was required part of just making it runnable
  useEffect(() => {
    const ele = document.getElementById("my-graph");
    const myGraph = ForceGraph3D();
    const myData = {
      nodes, links
    };
    
    let hoverNode = null;
    
    myGraph(ele).graphData(myData)
    .nodeLabel(node => `${node.title}`)
    .nodeColor(node => node === hoverNode ? '#e5edf3' : '#7ba5ec')
    .onNodeClick(node => window.open(`https://arxiv.org/abs/${node.id}`, '_blank'))
    .onNodeHover(node => {
      // no state change
      if (!node  || (node && hoverNode === node)) return;
      hoverNode = node || null;

      updateHighlight();
    });

    function updateHighlight() {
      // trigger update of highlighted objects in scene
      myGraph
        .nodeColor(myGraph.nodeColor())
    }
  }, []);

  return (
    <>
      <div id="my-graph"></div>
    </>
  );
}

export default function App() {
  return (
    // my code for app structure:
    <div className="App">
      <div class="graph">
        <GraphGenerator />
      </div>
      <div class="sidebar">
        
          <h1>2023 Research In AI</h1>

          <p>This graph is the visualization of the relationships between papers which were submitted in 2023 to Artificial Intelligence section of https://arxiv.org/ .</p>
          <p> You can hover over the node to see titile of publication, while clicking on any node will lead you to the information card of the corresponding publication.</p>
        
      </div>
    </div>
  );
}
