import React, { useRef, useEffect } from 'react'
import styled from "styled-components";
export const Canvas = (props) => {
    const Container = styled.div`
                        width:700px;
                        height:500px;
                        background-color:red;
                        margin:auto; `

    const canvasRef = useRef(null)
    var draw = ctx => {
        ctx.fillStyle = props?.textColor || '#0000ff'
        ctx.beginPath()
        ctx.arc(props?.drawposition?.x, props?.drawposition?.y, 20, 0, 2 * Math.PI)
        ctx.fill()
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        draw(context)
    }, [draw])

    return (
        <Container >
            <canvas ref={canvasRef} {...props}
                onMouseDown={props?.onchange}
                style={{ width: "100%", height: "100%", backgroundColor: "white" }}
            />
        </Container>
    )
}
