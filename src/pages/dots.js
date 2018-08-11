import React, {Component} from 'react'
import styled from 'react-emotion'
import {opacify} from 'polished'
import {observer} from 'mobx-react'
import {observable} from 'mobx'

import Layout from '../layout'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`

const size = 40
const count = 12
const spacing = 20

const Circle = styled.div`
  width: ${size}px;
  height: ${size}px;
  border-radius: 50%;

  background: ${props => props.color};
  box-shadow: 0px 0px 11px ${props => opacify(0.4, props.color)};

  margin-right: ${spacing}px;
  margin-bottom: ${spacing}px;

  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`

const Grid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  width: ${count * 60}px;
`

const primary = '#FF3366'
const dark = '#2d2d30'

@observer
export default class Board extends Component {
  @observable
  colors = Array(count * count).fill(primary)

  handleCircle = i => {
    const color = this.colors[i]

    if (!color || color === primary) {
      this.colors[i] = dark
    }

    if (color === dark) {
      this.colors[i] = primary
    }
  }

  render() {
    return (
      <Layout>
        <Container>
          <Grid>
            {this.colors.map((color, i) => (
              <Circle
                key={i}
                color={color || primary}
                onClick={() => this.handleCircle(i)}
                onMouseOver={() => this.handleCircle(i)}
                onTouchStart={() => this.handleCircle(i)}
              />
            ))}
          </Grid>
        </Container>
      </Layout>
    )
  }
}
