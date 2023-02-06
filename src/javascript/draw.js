var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var rect = canvas.getBoundingClientRect();
var x = 0, y = 0, painting = false, colorSelect = 'black', girthSelect = 1;
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
