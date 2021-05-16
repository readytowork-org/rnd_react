import React, { useRef, useEffect, useState } from 'react'
import styled from "styled-components";

export const Canvas = (props) => {
    const Container = styled.div`
    width:700px;
    height:500px;
    background-color:white;
    margin:auto;
    `
    const canvasRef = useRef(null)

    const [drawPosition, setdrawPosition] = useState({ })
    const draw = ctx => {
        ctx.fillStyle = '#0000ff'
        ctx.beginPath()
        ctx.arc(drawPosition?.x, drawPosition?.y, 20, 0, 2 * Math.PI)
        ctx.fill()
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        draw(context)
    }, [draw, drawPosition])


    return (
        <Container >
            <canvas ref={canvasRef} {...props}
                onMouseMove={(e) => {
                    console.error({ e })
                    setdrawPosition({
                        x: 50, y: 100
                    })
                }} />
        </Container>
    )
}
