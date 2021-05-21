import React, { useRef, useEffect, useState } from 'react'
import styled from "styled-components";

export const Canvas = (props) => {
    const Container = styled.div`
                        width:700px;
                        height:500px;
                        background-color:red;
                        margin:auto; `

    const canvasRef = useRef(null)
    const [cantype, setcantype] = useState(false)
    var canDraw = false
    var canDownload = false
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
        prevX = x;
        prevY = y
    }
    const handleMouseDown = (e) => {
        prevX = e.layerX
        prevY = e.layerY
        canDraw = true
    }
    const handleUp = (e) => {
        canDraw = false
    }
    const drawNormal = (e, context) => {
        if (canDraw && !cantype) {
            canDownload = true
            draw(context, e.layerX, e.layerY)
        }
    }
    const clearCanvas = (e) => {
        const canvas = canvasRef.current
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        canDownload = false
        document.getElementById("typeid").value=""
    }
    const setpoint = (e) => {
        prevX = 0
        prevY = 0
    }
    const download = (e) => {
        if (canDownload) {
            var download = document.getElementById("download");
            var image = document.getElementById("canvas").toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            download.setAttribute("href", image);
        }
    }

    const TypeClick = (e) => {
        const canvas = canvasRef.current
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        setcantype(t => !t)
    }
    const typechange = (e) => {
        const canvas = canvasRef.current
        var ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.font = "30px Homemade Apple, cursive";
        ctx.textAlign = "center";
        ctx.fillText(e.target.value, 350, 250);
        if (e.target.value) {
            canDownload = true
        } else {
            canDownload = false
        }
    }
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        canvas.addEventListener("mousedown", handleMouseDown)
        canvas.addEventListener("mousemove", (e) => { drawNormal(e, context) });
        canvas.addEventListener("mouseup", handleUp);
        canvas.addEventListener("mouseout", setpoint);
    }, [draw])

    useEffect(() => {
    }, [cantype])
    return (
        <Container >
            <canvas ref={canvasRef} {...props}
                style={{ width: "700px", height: "500px", backgroundColor: "white" }}
                width="700"
                height="500"
                id="canvas"
            />
            <input type="text" id="typeid" disabled={!cantype} onChange={typechange} placeholder="Pradip Kharal"/>
            <button onClick={TypeClick} >{!cantype ? "Type" : "Draw"} </button>
            <a id="download">
                <button onClick={download}>Download</button>
            </a>
            <button onClick={clearCanvas}>Clear</button>
        </Container>
    )
}
