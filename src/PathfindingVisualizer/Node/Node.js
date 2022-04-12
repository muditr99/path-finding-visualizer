import React from 'react'
import './node.css';

export default function Node(props) {
    
    const { row, col, isStart, isFinish, isWall } = props;

    const extraClassName =  isFinish ? 'node-finish' : isStart ? 'node-start' : isWall ? 'node-wall' : ''
    
  return (
    <div id={`node-${row}-${col}`} className={`node ${extraClassName}`}></div>
  )
}
