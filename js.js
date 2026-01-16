// let det = new Date;
var lastHr = 25, lastSec = -1;
var fontTog = true, colorTog = true, manualTog = false;
let url = new URLSearchParams(window.location.search);
// var screen = '';
document.getElementsByClassName('clock')[0].style.color = "#AAA";

const hrI = document.getElementById('hrI');
const hrII = document.getElementById('hrII');
const mnI = document.getElementById('mnI');
const mnII = document.getElementById('mnII');
const scI = document.getElementById('scI');
const scII = document.getElementById('scII');
const colon = document.getElementsByTagName('td');

requestAnimationFrame(main);

if(url.has('color'))
{
    var color = url.get('color');
    document.getElementsByClassName('clock')[0].style.color = '#' + color;
    console.log("Set color to " + color);
}

function main()
{
    let time = new Date;
    var hour = time.getHours() <= 12 ? time.getHours() : time.getHours() - 12;
    
    requestAnimationFrame(main); // Update main func by frame
    if(time.getSeconds() == lastSec) return; // Skip screen update if second hasn't changed
    lastSec = time.getSeconds();

    hrI.innerText=Math.floor(hour <= 9 ? "0" : hour / 10);
    hrII.innerText=hour % 10;
    mnI.innerText=Math.floor(time.getMinutes() <= 9 ? "0" : time.getMinutes() / 10);
    mnII.innerText=time.getMinutes() % 10;
    scI.innerText=Math.floor(time.getSeconds() <= 9 ? "0" : time.getSeconds() / 10);
    scII.innerText=time.getSeconds() % 10;

    if(time.getMilliseconds() == 0)
        console.log("Lucky 0 easteregg!");

    if(window.innerHeight > window.innerWidth){
        colon[0].style.width = "3vw"; colon[1].style.width = "3vw";
        colon[0].innerText = ""; colon[1].innerText = "";
        // screen = 'v';
    }
    else{
        colon[0].style.width = "6vw"; colon[1].style.width = "6vw";
        colon[0].innerText = ":"; colon[1].innerText = ":";
        // screen = 'h'
    }
    
    if(lastHr != time.getHours())
    {
        if((url.has('oledProtection') && url.get('oledProtection') == 0) || (url.has('oled') && url.get('oled') == 0))
            console.log("Oled Protection Disabled.");
        else
            if(lastHr != 25) oledProtection();

        lastHr = time.getHours();
    }
}

function oledProtection()
{
    const rect = document.getElementById('table').getBoundingClientRect();
    const clockW = rect.width, clockH = rect.height;

    const maxLeft = Math.max(0, window.innerWidth - clockW);
    const maxTop = Math.max(0, window.innerHeight - clockH);

    const randL = Math.floor(Math.random() * maxLeft);
    const randT = Math.floor(Math.random() * maxTop);

    document.getElementById('table').style.left = randL + "px";
    document.getElementById('table').style.top = randT + "px";
}

function ctrl(key)  // 1 = Font, 2 = Manual, 3 = Color White/Gray, 4 = Color Random
{
    switch (key) {
        case 1:
        case 'f':
            if (fontTog)
            {
                document.getElementsByTagName('body')[0].style.fontFamily="Alexandria";
                for(var re = 0; re <= 5; re++)
                    document.getElementsByTagName('th')[re].style.width = "12vw";
            }
            else
            {
                document.getElementsByTagName('body')[0].style.fontFamily="Playfair Display";
                for(var re = 0; re <= 5; re++)
                    document.getElementsByTagName('th')[re].style.width = "10vw";
            }
            fontTog = !fontTog;
            break;
        case 2:
        case 'm':
            manualTog = !manualTog;
            document.getElementsByClassName('manual')[0].style.opacity = (document.getElementsByClassName('manual')[0].style.opacity == 0 ? 1 : 0);
            if(manualTog)
            {
                document.getElementsByClassName('manual')[0].innerHTML=
                "-- MANUAL -- <br>" +
                "! Currently all operations required keyboard. ! <br>" +
                "<br>" +
                "f - Toggle font between regular and gorgeous <br>" +
                "m - Show / Hide this manual <br>" +
                "w - Switch clock's color between White and Default <br>" +
                "c - Change clock's color randomly in 8 colors<br>" +
                "<br>" +
                "Add \"?oled=0\" on the end of the URL to disable oled protection (Change position randomly every hour)<br>" +
                "Add \"?color=[Color Hex code without '#' symble]\" on the end of the URL to set color of the clock <br>" +
                "If you want to use both, you can type like \"[URL]?oled=0&color=71a1f0\".";
            }
            else
            {
                document.getElementsByClassName('manual')[0].innerHTML="";
                document.getElementsByClassName('manual')[0].style.pointerEvents = "none";
            }
            
            break;
        case 3:
        case 'w':
            if(colorTog)
                document.getElementsByClassName('clock')[0].style.color = "#FFF";
            else
                document.getElementsByClassName('clock')[0].style.color = "#AAA";
            colorTog = !colorTog;
            break;
        case 4:
        case 'c':
            const tableColor = ["#AAA", "#FFF", "#F00", "#0F0", "#00F", "#FF0", "#0FF", "#F0F"];
            document.getElementsByClassName('clock')[0].style.color = tableColor[Math.floor(Math.random() * 8)];
            break;
        default:
            break;
    }
}

document.addEventListener('keydown', (event) => {
    var name = event.key;
    ctrl(name);
}, false);
// https://www.section.io/engineering-education/keyboard-events-in-javascript/

hrI.addEventListener('click', () => {
    ctrl(1); 
});
hrII.addEventListener('click', () => {
    ctrl(1); 
});

mnI.addEventListener('click', () => {
    ctrl(2); 
});
mnII.addEventListener('click', () => {
    ctrl(2); 
});

scI.addEventListener('click', () => {
    ctrl(3); 
});
scII.addEventListener('click', () => {
    ctrl(4); 
});

// 在你的 JS 最下面加上這段，幫所有可點擊元素加上手指游標
[hrI, hrII, mnI, mnII, scI, scII].forEach(el => {
    el.style.cursor = "pointer";
});