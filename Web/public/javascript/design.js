import { Solver, Color, hexToRgb } from './hexToFilter.js'

const image_input = document.querySelector("#image_input"); //El input file del form
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let uploaded_image = ''
let reader = new FileReader();


image_input.addEventListener("change", async function () {
    reader.addEventListener("load", async () => {
        uploaded_image = new Image();
        uploaded_image.src = reader.result;
        uploaded_image.onload = async function () {
            let imgAspectRatio = uploaded_image.width / uploaded_image.height;
            let canvasAspectRatio = canvas.width / canvas.height;
            let scaleFactor;
            if (imgAspectRatio > canvasAspectRatio) {
                scaleFactor = canvas.width / uploaded_image.width;
            } else {
                scaleFactor = canvas.height / uploaded_image.height;
            }
            let x = (canvas.width - uploaded_image.width * scaleFactor) / 2;
            let y = (canvas.height - uploaded_image.height * scaleFactor) / 2;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(uploaded_image, x, y, uploaded_image.width * scaleFactor, uploaded_image.height * scaleFactor);
        };
    });
    reader.readAsDataURL(this.files[0]);
});


var rect = canvas.getBoundingClientRect();
let x = 0, y = 0, painting = false, colorSelect = 'black', girthSelect = 1;
let previewBtn = document.getElementById('preview-btn');
const downloadBtn = document.querySelector('#download-btn');
const normalRadioBtn = document.getElementById('normal');
const linerRadioBtn = document.getElementById('liner');
const circleRadioBtn = document.getElementById('circle');
const clearBtn = document.querySelector('#clear-btn');
const remeraPNG2 = document.querySelector('#remeraPNG2')
let remera = document.getElementById('remera-div');
let submitBtn = document.getElementById('submit-btn')

const colorPick = document.getElementById('color');
colorPick.addEventListener('input', () => {
    console.log(colorPick.value)
    colorSelect = colorPick.value;
})

const girthPick = document.getElementById('girth');
girthPick.addEventListener('input', () => {
    girthSelect = girthPick.value
})

const colorShirtPick = document.getElementById('colorShirt');
const colorShirtBtn = document.getElementById('colorShirtBtn'); 
colorShirtPick.addEventListener('input', () => {
    const rgb = hexToRgb(colorShirtPick.value);
    const colorer = new Color(rgb[0], rgb[1], rgb[2]);
    const solver = new Solver(colorer);
    const result = solver.solve();
    remeraPNG2.style.filter = result.filter
  colorShirtBtn.style.filter = result.filter 
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
let allRadioButtons = [normalRadioBtn,circleRadioBtn,linerRadioBtn]
allRadioButtons.forEach((element)=>{element.addEventListener('click', ()=>{
    if (normalRadioBtn.checked) {
        document.getElementById('normalImg').style.filter = 'invert(13%) sepia(29%) saturate(7453%) hue-rotate(294deg) brightness(96%) contrast(92%)'
    }else{
        document.getElementById('normalImg').style.filter = 'invert(0%) sepia(0%) saturate(7%) hue-rotate(253deg) brightness(103%) contrast(100%)'
    }
    if (circleRadioBtn.checked) {
        document.getElementById('circleImg').style.filter = 'invert(13%) sepia(29%) saturate(7453%) hue-rotate(294deg) brightness(96%) contrast(92%)'
    }else{
        document.getElementById('circleImg').style.filter = 'invert(0%) sepia(0%) saturate(7%) hue-rotate(253deg) brightness(103%) contrast(100%)'
    }
    if (linerRadioBtn.checked) {
        document.getElementById('linerImg').style.filter = 'invert(13%) sepia(29%) saturate(7453%) hue-rotate(294deg) brightness(96%) contrast(92%)'
    }else{
        document.getElementById('linerImg').style.filter = 'invert(0%) sepia(0%) saturate(7%) hue-rotate(253deg) brightness(103%) contrast(100%)'
    }
})})


canvas.addEventListener('mousemove', (place) => {
    rect = canvas.getBoundingClientRect();
    if (normalRadioBtn.checked) {
        document.getElementById('normal').style.filter = 'invert(13%) sepia(29%) saturate(7453%) hue-rotate(294deg) brightness(96%) contrast(92%)'
        if (painting) {
            paint(x, y, place.clientX - rect.left, place.clientY - rect.top)
            x = place.clientX - rect.left;
            y = place.clientY - rect.top;
        }
    }
    if (circleRadioBtn.checked) {
        if (painting) {
            paint(x, y, place.clientX - rect.left, place.clientY - rect.top)
            x = place.clientX + curentX - rect.left;
            y = place.clientY + currentY - rect.top;
        }

    }
    if (linerRadioBtn.checked) {
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

previewBtn.addEventListener('click', () => {
    const dataURL = canvas.toDataURL()
    document.querySelector("#diseno-div-canvas").style.backgroundImage = `url(${dataURL})`
})

 
downloadBtn.addEventListener('click', () => {
    let node = remera
    domtoimage.toPng(node)
        .then(function (dataUrl) {
            let link = document.createElement('a');
            link.download = 'screenshot.png';
            link.href = dataUrl;
            link.click();
        });
})

/* function erase() {
    colorSelect = 'white';
    girthSelect = 15;                                   //Una vez se activa erase, para volver a dibujar se debe volver a elegir color y girth
}

document.getElementById('erase-btn').addEventListener('click', erase); */

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


clearBtn.addEventListener('click', () => {
    clearCanvas();
});

downloadBtn.addEventListener('click',()=>{
    domtoimage.toPng(remera)
    .then(function (dataUrl) {
    const image = new Buffer.from(dataUrl.split(',')[1], 'base64');
    fs.writeFileSync('image.png', image);
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });
})
 
async function saveScreenshot() {
    try {
      const dataUrl = await domtoimage.toPng(remera);
      const image = dataUrl.split(',')[1];
      const response = await fetch('/save-screenshot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image: image
        })
      });
      const text = await response.text();
      console.log('screenshot saved');
    } catch (error) {
      console.error('failed to save screenshot', error);
    }
}

submitBtn.addEventListener('click',(evt)=>{
    evt.preventDefault()
    saveScreenshot()
})