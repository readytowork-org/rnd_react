import React, { useRef, useEffect } from 'react'
import styled from "styled-components";
export const Canvas = (props) => {
    const Container = styled.div`
                        width:700px;
                        height:500px;
                        background-color:red;
                        margin:auto; `

    const canvasRef = useRef(null)
    var isdraw = false
    var prevX = 0
    var prevY = 0
    var draw = (ctx, x = 0, y = 0) => {
        ctx.beginPath();
        !prevX && (prevX = x)
        !prevY && (prevY = y)
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = props?.textColor || '#0000ff'
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
        ctx.fill()
        prevX = x;
        prevY = y
    }
    const handleMouseDown = (e) => {
        console.error({ e })
        isdraw = true
    }
    const drawNormal = (e, context) => {
        isdraw && draw(context, e.offsetX, e.offsetY)
    }
    const stopDrawing = (e) => {
        prevX = 0
        prevY = 0
        isdraw = false
    }
    const clearCanvas = (e) => {
        const canvas = canvasRef.current
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    }
    
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        canvas.addEventListener("mousedown", handleMouseDown)
        canvas.addEventListener("mousemove", (e) => { drawNormal(e, context) });
        canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("mouseout", stopDrawing);
    }, [draw])

    return (
        <Container >
            <canvas ref={canvasRef} {...props}
                style={{ width: "100%", height: "100%", backgroundColor: "white" }}
            />
            <button onClick={(e) => {
                console.error("download")
            }}>Download</button>
            <button onClick={clearCanvas}>Clear</button>
        </Container>
    )
}
