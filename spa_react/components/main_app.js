//import React, {Component} from 'react';
import React, {useState, useEffect} from 'react';
import {Sigma, RandomizeNodePositions, RelativeSize} from 'react-sigma';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';



const best_route = ['A', 'D', 'G', 'H']
const MainApp = props => {

    const [selectedItem, setSelectedItem] = useState({ })
    const [items, setSelectedItems] = useState([
        'A','B','C','D','E','F','G','H'
    ])

    const [graph, setGraph] = useState(
        {
            "nodes": [
              { "id": "nA", "label": "A", "x": 1, "y": 1, "size": 24 },
              { "id": "nB", "label": "B", "x": 3, "y": 1, "size": 24 },
              { "id": "nC", "label": "C", "x": 2, "y": 4, "size": 24 },
              { "id": "nD", "label": "D", "x": 1, "y": 6, "size": 24 },
              { "id": "nE", "label": "E", "x": 6, "y": 2, "size": 24 },
              { "id": "nF", "label": "F", "x": 5, "y": 4, "size": 24 },
              { "id": "nG", "label": "G", "x": 6, "y": 6, "size": 24 },
              { "id": "nH", "label": "H", "x": 8, "y": 6, "size": 24 }
            ],
            "edges": [
              { "id": "e0", "source": "nA", "target": "nB", "color": "#0000ff" },
              { "id": "e1", "source": "nA", "target": "nD" },
              { "id": "e2", "source": "nA", "target": "nC" },
              { "id": "e3", "source": "nB", "target": "nE" },
              { "id": "e4", "source": "nB", "target": "nC" },
              { "id": "e5", "source": "nB", "target": "nF" },
              { "id": "e6", "source": "nC", "target": "nF" },
              { "id": "e7", "source": "nD", "target": "nG" },
              { "id": "e8", "source": "nE", "target": "nG" },
              { "id": "e9", "source": "nF", "target": "nG" },
              { "id": "e10", "source": "nG", "target": "nH" }
            ]
          }
    )
    
    console.log(items)

    const sourceChanged = (e) => {
        let selected = e.target.value;

        if(selected == 'A')
            highlightRoute(best_route);
    }

    const destChanged = (e) => {
        let selected = e.target.value;

        if(selected == 'H')
            highlightRoute(best_route);
    }

    const highlightRoute = (route) => {
        var edges = [...graph.edges].map(e =>{ delete e.color; return e;} )
        route.forEach((v, idx) => {
            let curr = v;
            let nxt = (idx + 1 >= route.length) ? v : route[idx + 1];
            
            if(curr != nxt)
                edges.find(e => e.source == 'n' + curr && e.target == 'n' + nxt)['color'] = "#0000ff"
            
        });

        setGraph({...graph, edges:edges});
        console.log(graph);
    }

    const left_div_style = {
        float:'left',
        padding: '0 10px'
    }
    const right_div_style = {
        float:'left'
    }
        return (
        <div>
            <h1>Hello!</h1>
            <div style={left_div_style}>
                <div>Source</div>
                <select name="Select source" onChange={sourceChanged}>
                    {
                    items.map((val, idx) => (
                        <option key={idx} value={val}>
                        {val}
                        </option>
                    ))
                    }
                </select>
            </div>
            <div style={right_div_style}>
                <div>Destination</div>
                <select name="Select destination" onChange={destChanged}>
                    {
                    items.map((val, idx) => (
                        <option key={idx} value={val}>
                        {val}
                        </option>
                    ))
                    }
                </select>
            </div>
            <Sigma graph={graph} settings={{drawEdges: true, clone: false}}>
            </Sigma>
        </div>
        );
}


export default MainApp;