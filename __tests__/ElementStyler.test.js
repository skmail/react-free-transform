import React from 'react'
import elementStyler from '../src/ElementStyler'

import {
  scale,
  rotate,
  translate,
  transform,
  applyToPoint,
  toCSS
} from 'transformation-matrix';

it('it return basic styles', () => {

  const results = elementStyler({
    x:0,
    y:0,
    angle:0,
    scaleX:1,
    scaleY:1,
    width:100,
    height:100
  })

  expect(results.element).toEqual({
    width:100,
    height:100,
    position:"absolute",
    transform:toCSS(transform(
      translate(0,0),
      scale(1,1)
    ))
  })
  expect(results.controls).toEqual({
    width:100,
    height:100,
    position:"absolute",
    transform:toCSS(transform(
      translate(0,0),
      scale(1,1)
    ))
  })
})

it('it return complex matrix styles', () => {

  const results = elementStyler({
    x:0,
    y:0,
    angle:90,
    scaleX:1,
    scaleY:1,
    width:100,
    height:100
  })

  expect(results.element).toEqual({
    width:100,
    height:100,
    position:"absolute",
    transform:toCSS( transform(
      translate(0,0),
      rotate(90 * (Math.PI / 180)),
      scale(1,1)
    ))
  })

  expect(results.controls).toEqual({
    width:100,
    height:100,
    position:"absolute",transform:toCSS( transform(
      translate(0,0),
      rotate(90 * (Math.PI / 180)),
      scale(1,1)
    ))
  })
})

it('it return  styles when disableScale is true', () => {

  const results = elementStyler({
    x:0,
    y:0,
    angle:0,
    scaleX:2,
    scaleY:2,
    width:100,
    height:100,
    disableScale:true
  })

  expect(results.element).toEqual({
    width:200,
    height:200,
    position:"absolute",
    transform:toCSS( transform(
      translate(-100,-100),
      rotate(0),
    ))
  })

  expect(results.controls).toEqual({
    width:200,
    height:200,
    position:"absolute",transform:toCSS( transform(
      translate(-100,-100),
      rotate(0),
      scale(1,1)
    ))
  })
})