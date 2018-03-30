import React, { Component } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  color: #fff;
  background: #007bff;
  boder-color: #007bff;
  text-align: center;
  border-radius: .25rem;
  font-size: 1rem;
  padding: .375rem .75rem;
  top: 0;
  left: 0;
  position: absolute;
`;

const Text = styled.p`
  font-size: 4rem;
  color: #fff;
`;

const Group = ({
  data, removeGroup, index
}) => {
  const {
    start, end, width, height
  } = data.position;

  const Container = styled.div`
    width: ${end.x - start.x}px;
    height: ${end.y - start.y}px;
    position: absolute;
    left: ${start.x}px;
    top: ${start.y}px;
    border: 1px solid;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  return (
    <Container>
      <Text>{index + 1}</Text>
      <Button onClick={removeGroup}>解群組</Button>
    </Container>
  );
};

export default Group;
