import React, { useRef, useEffect } from 'react'
import styled from "styled-components";
export const Canvas = (props) => {
    const Container = styled.div`
                        width:700px;
                        height:500px;
                        background-color:red;
                        margin:auto; `

    const canvasRef = useRef(null)
    var draw = (ctx, x = 0, y = 0) => {
        ctx.fillStyle = props?.textColor || '#0000ff'
        ctx.beginPath()
        ctx.arc(x, y, 1, 0, 90)
        ctx.fill()
    }
    const handleMouseDown = (e) => {
        console.error({ e, "action": "down" })
    }
    const drawNormal = (e, context) => {
        console.error({ e, "action": "draw" })
        draw(context, e.offsetX, e.offsetY)
    }
    const stopDrawing = (e) => {
        console.error({ e })
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        // canvas.addEventListener("mousedown", handleMouseDown)
        // canvas.addEventListener("mousemove", drawNormal);
        canvas.addEventListener("mousemove", (e) => { drawNormal(e, context) });
        // canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("mouseout", stopDrawing);
        // draw(context)
    }, [draw])

    return (
        <Container >
            <canvas ref={canvasRef} {...props}
                // onMouseDown={props?.onchange}
                style={{ width: "100%", height: "100%", backgroundColor: "white" }}
            />
        </Container>
    )
}
