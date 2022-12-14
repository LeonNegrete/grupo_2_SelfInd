const image_input = document.querySelector("#image_input");
var uploaded_image = ''
var reader = new FileReader();

image_input.addEventListener("change", function() {
  
  reader.addEventListener("load", () => {
    uploaded_image = reader.result;
    document.querySelector("#diseno-div").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var rect = canvas.getBoundingClientRect();
var x = 0, y = 0, painting = false, colorSelect = 'black', girthSelect = 1;
var btn = document.getElementById('preview-btn');
var canvasPlace = document.querySelector("#diseno-div-canvas");
function color(c) {
    colorSelect = c;
}
function girth(g) {
    girthSelect = g;
}
function paint(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.strokeStyle = colorSelect;
    ctx.lineWidth = girthSelect;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
}
canvas.addEventListener('mousedown', (place) => {
    x = place.clientX - rect.left;
    y = place.clientY - rect.top;
    painting = true;
})
canvas.addEventListener('mousemove', (place) => {
    if (painting) {
        paint(x, y, place.clientX - rect.left, place.clientY - rect.top)
        x = place.clientX - rect.left;
        y = place.clientY - rect.top;
    }
});

canvas.addEventListener('mouseup',(place)=>{
    if (painting){
        paint(x, y, place.clientX - rect.left, place.clientY - rect.top);
        x=0;
        y=0;
        painting = false;
    }
})

btn.addEventListener('click',()=>{
    const dataURL = canvas.toDataURL()
    document.querySelector("#diseno-div-canvas").style.backgroundImage = `url(${dataURL})`
    console.log(document.querySelector("#diseno-div-canvas").style.backgroundImage === `url(${dataURL})`)
})