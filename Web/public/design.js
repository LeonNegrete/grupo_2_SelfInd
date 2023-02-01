import { Solver, Color, hexToRgb } from './hexToFilter.js'
const image_input = document.querySelector("#image_input");
var uploaded_image = ''
var reader = new FileReader();

image_input.addEventListener("change", function () {
    reader.addEventListener("load", () => {
        uploaded_image = new Image();
        uploaded_image.src = reader.result;
        uploaded_image.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(uploaded_image, x, y);
        }
    });
    reader.readAsDataURL(this.files[0]);
});


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var rect = canvas.getBoundingClientRect();
var x = 0, y = 0, painting = false, colorSelect = 'black', girthSelect = 1;
var btn = document.getElementById('preview-btn');
var canvasPlace = document.querySelector("#diseno-div-canvas");
const downloadBtn = document.querySelector('#download-btn');
const normal = document.getElementById('normal');
const liner = document.getElementById('liner');
const circle = document.getElementById('circle');
const clearBtn = document.querySelector('#clear-btn');
const remeraPNG2 = document.querySelector('#remeraPNG2')
let remera = document.getElementById('remera-div');


const colorPick = document.getElementById('color');
colorPick.addEventListener('input' ,()=>{
    console.log(colorPick.value)
    colorSelect = colorPick.value;
})

const girthPick = document.getElementById('girth');
girthPick.addEventListener('input',()=>{
    girthSelect = girthPick.value
})

const colorShirtPick = document.getElementById('colorShirt');
colorShirtPick.addEventListener('input',()=>{
    const rgb = hexToRgb(colorShirtPick.value);
    const colorer = new Color(rgb[0], rgb[1], rgb[2]);
    const solver = new Solver(colorer);
    const result = solver.solve();
    remeraPNG2.style.filter = result.filter
})

function paint(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = colorSelect;
    ctx.lineWidth = girthSelect;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}


canvas.addEventListener('mousedown', (place) => {
    rect = canvas.getBoundingClientRect();
    x = place.clientX - rect.left;
    y = place.clientY - rect.top;
    painting = true;
})

canvas.addEventListener('mousemove', (place) => {
    rect = canvas.getBoundingClientRect();
    if (normal.checked) {
        if (painting) {
            paint(x, y, place.clientX - rect.left, place.clientY - rect.top)
            x = place.clientX - rect.left;
            y = place.clientY - rect.top;
        }
    }
    if (circle.checked) {
        if (painting) {
            paint(x, y, place.clientX - rect.left, place.clientY - rect.top)
            x = place.clientX + curentX - rect.left;
            y = place.clientY + currentY - rect.top;
        }

    }
    if (liner.checked) {
        if (painting) {
            paint(x, y, place.clientX - rect.left, place.clientY - rect.top)
            x = event.clientX - rect.left;
            y = event.clientY + currentY - rect.top;
        }

    }
});
canvas.addEventListener('mouseup', (place) => {
    if (painting) {
        paint(x, y, place.clientX - rect.left, place.clientY - rect.top);
        x = 0;
        y = 0;
        painting = false;
    }
})

btn.addEventListener('click', () => {
    const dataURL = canvas.toDataURL()
    document.querySelector("#diseno-div-canvas").style.backgroundImage = `url(${dataURL})`
})

function takeScreenshot() {
    var node = remera
    domtoimage.toPng(node)
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'screenshot.png';
            link.href = dataUrl;
            link.click();
        });
}
downloadBtn.addEventListener('click', () => {
    takeScreenshot();
})

function erase() {
    colorSelect = 'white';
    girthSelect = 10;
}

document.getElementById('erase-btn').addEventListener('click', erase);

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


clearBtn.addEventListener('click', () => {
    clearCanvas();
});