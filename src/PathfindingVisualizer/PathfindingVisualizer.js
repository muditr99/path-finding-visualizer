import React from 'react'
import Node from './Node/Node'

import { useState, useEffect } from 'react'
import { dijkstra, getNodesInShortestPathOrder } from '../Algorithm/Dijkstra';

import './PathfindingVisualizer.css'

const START_NODE_ROW = 2;
const FINISH_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_COL = 35;

export default function PathfindingVisualizer() {
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        const grid = initialGrid();
        setGrid(grid);
    }, [])

    const initialGrid = () => {
        const grid = [];
        for(let row = 0;row < 20;row++){
            const currentRow = [];
            for(let col = 0;col < 50;col++){
                currentRow.push(createNode(col, row));
            }
            grid.push(currentRow);
        }
        return grid;
    }

    const createNode = (col, row) => {
        return {
            col : col,
            row : row,
            isStart : row === START_NODE_ROW && col === START_NODE_COL,
            isFinish : row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
            distance : Infinity,
            isVisited : false,
            isWall : false,
            previousNode : null,
        }
    }

    const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
          }
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-visited';
          }, 10 * i);
        }
      }
    
      const animateShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path';
          }, 50 * i);
        }
      }

    const visualizeDijkstra = () => {
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

  return (
  <>
  
  <button className='btn' onClick={() => {visualizeDijkstra()}}>
      Visualize Dijkstra's Algorithm
  </button>

  <div className='grid'>
      {grid.map((row, rowIndex) => {
        return (
          <div>
             {row.map((node, nodeIndex) => {
             const {row, col, isStart, isFinish, isWall} = node;

            return (
                <Node 
                row = {row}
                col = {col}
                isStart = {isStart}
                isFinish = {isFinish}
                isWall = {isWall}
                />
                   )
              })}
          </div>
        );
      })}
  </div>

  </>
  )
}
