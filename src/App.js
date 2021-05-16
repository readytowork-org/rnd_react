import React from "react"
import styled from "styled-components";
import { Canvas } from "./components";

const App = () => {
  const Wrapper = styled.div`
  padding: 4em;
  background: papayawhip;
`;
  return (
    <Wrapper >
      <Canvas />
    </Wrapper>
  );
}

export default App