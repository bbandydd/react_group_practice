import React from 'react';
import styled from 'styled-components';

const TV = ({
  width, height, startX, startY, selectable, handleSelect, id
}) => {
  const Container = styled.div`
    width: ${width}px;
    height: ${height}px;
    position: absolute;
    left: ${startX}px;
    top: ${startY}px;
    border: 1px solid;
    background: ${selectable ? 'red' : 'white'};
  `;

  return (
    <Container onClick={handleSelect}>
      {id}
    </Container>
  );
};

export default TV;
