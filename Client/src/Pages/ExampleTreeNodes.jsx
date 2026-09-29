import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import ExamplefamilyData from "./EampleFamilyData";
import PersonCard from "../components/PersonCard";

function ExampleTreeNodes() {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [offset, setOffset] = useState({ x: 0, y: 80 });
  const [svgHeight, setSvgHeight] = useState(1200);

  useEffect(() => {
    const root = d3.hierarchy(
      ExamplefamilyData.rootPerson,
      d => d.children
    );

    const tree = d3.tree().nodeSize([180, 180]);

    tree(root);

    const descendants = root.descendants();
    const treeLinks = root.links();

    const minX = d3.min(descendants, d => d.x);
    const maxX = d3.max(descendants, d => d.x);
    const maxY = d3.max(descendants, d => d.y);

    const treeWidth = maxX - minX;

    const screenWidth = window.innerWidth;

    const offsetX = (screenWidth - treeWidth) / 2 - minX;

    setOffset({
      x: offsetX,
      y: 80
    });

    setSvgHeight(maxY + 250);

    setNodes(descendants);
    setLinks(treeLinks);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "auto",
        background: "#f5f5f5",
        position: "relative"
      }}
    >
      {/* Entire tree wrapper */}
      <div
        style={{
          position: "relative",
          transform: `translate(${offset.x}px,${offset.y}px)`
        }}
      >
        {/* SVG Links */}
        <svg
          width="100%"
          height={svgHeight}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            overflow: "visible"
          }}
        >
          {links.map((link, index) => {
            const path = d3
              .linkVertical()
              .x(d => d[0])
              .y(d => d[1])({
                source: [link.source.x, link.source.y],
                target: [link.target.x, link.target.y]
              });

            return (
              <path
                key={index}
                d={path}
                fill="none"
                stroke="#999"
                strokeWidth={2}
              />
            );
          })}
        </svg>

        {/* React Cards */}
        {nodes.map(node => (
          <div
            key={node.data._id}
            style={{
              position: "absolute",
              left: node.x - 65,
              top: node.y - 45
            }}
          >
            <PersonCard person={node.data} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExampleTreeNodes;