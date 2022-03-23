import { useRef } from "react";


export const Counter = props => {
  const renderCounter  = useRef(0);
  renderCounter.current = renderCounter.current + 1;
  return <h1 style={{fontSize: 16, color: 'red'}}>Renders: {renderCounter.current}, {props.message}</h1>;
};