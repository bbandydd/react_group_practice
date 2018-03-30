import React, { Component } from 'react';
import styled from 'styled-components';

import TV from './TV';
import Group from './Group';

const Container = styled.div`
  width: 600px;
  height: 300px;
  position: relative;
  border: 1px solid;
`;

const Button = styled.button`
  width: 100px;
  height: 50px;
`;

export default class Main extends Component {
  state = {
    data: [
      {
        id: 1, startX: 20, startY: 20, width: 150, height: 80, selectable: false,
      },
      {
        id: 2, startX: 170, startY: 20, width: 150, height: 80, selectable: false,
      },
      {
        id: 3, startX: 20, startY: 100, width: 150, height: 80, selectable: false,
      },
      {
        id: 4, startX: 170, startY: 100, width: 150, height: 80, selectable: false,
      },
      {
        id: 5, startX: 320, startY: 20, width: 150, height: 80, selectable: false,
      },
      {
        id: 6, startX: 320, startY: 100, width: 150, height: 80, selectable: false,
      },
    ],
    group: []
  }

  validateGroup = (group) => {
    let width;
    let height;

    const newGroup = group.map((tv) => {
      [width, height] = [tv.width, tv.height];

      return {
        ...tv, endX: tv.startX + tv.width, endY: tv.startY + tv.height, area: tv.width * tv.height
      };
    });

    // 找出最小x,y、最大x,y，畫出大矩形
    const [minX, minY, maxX, maxY] = [
      Math.min(...newGroup.map(tv => tv.startX)),
      Math.min(...newGroup.map(tv => tv.startY)),
      Math.max(...newGroup.map(tv => tv.endX)),
      Math.max(...newGroup.map(tv => tv.endY)),
    ];

    // 算出面積
    const area = (maxX - minX) * (maxY - minY);
    const groupArea = newGroup.reduce((acc, val) => acc += val.area, 0);

    return {
      isPass: area === groupArea,
      position: {
        start: { x: minX, y: minY },
        end: { x: maxX, y: maxY },
      }
    };
  }

  handleSelect = (index) => {
    const data = [...this.state.data];
    data[index].selectable = !data[index].selectable;

    this.setState({ data });
  }

  handleGroup = () => {
    const group = this.state.data.filter(tv => tv.selectable);

    if (!group.length) return;

    const { isPass, position } = this.validateGroup(group);

    if (!isPass) {
      alert('不符合分群要求');
      return;
    }

    this.setState({
      group: [
        ...this.state.group,
        { group, position },
      ],
      data: this.state.data.map(tv => ({...tv, selectable: false}))
    });
  }

  removeGroup = (index) => {
    const group = [...this.state.group];
    group.splice(index, 1);

    this.setState({ group });
  }

  render() {
    return (
      <div>
        <Container>
          { this.state.data.map((obj, index) => <TV {...obj} handleSelect={() => this.handleSelect(index)} />) }
          { this.state.group.map((obj, index) => <Group data={obj} index={index} removeGroup={() => this.removeGroup(index)} />) }
        </Container>
        <Button onClick={this.handleGroup}>群組</Button>
      </div>
    );
  }
}
