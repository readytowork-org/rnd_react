import React, { useState } from "react"
import styled from "styled-components";
import { Canvas } from "./components";

const App = () => {
  const Wrapper = styled.div`
  padding: 4em;
  background: papayawhip;
`;
  const [drawposition, setDrawposition] = useState({ x: 50, y: 100 })
  return (
    <Wrapper >
      <Canvas
        textColor={"#2C3E50"}
        onchange={(e) => {
          console.error({ e })
          setDrawposition({
            x: drawposition.x + 1, Y: drawposition.y + 10
          })
        }}
        drawposition={drawposition}
      />
    </Wrapper>
  );
}

export default App