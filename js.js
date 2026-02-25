// let det = new Date;
var lastHr = 25, lastSec = -1;
var fontTog = true, colorTog = true, manualTog = false;
var url = new URLSearchParams(window.location.search);
var screen = '';
var touchable = navigator.maxTouchPoints;

const hrI = document.getElementById('hrI');
const hrII = document.getElementById('hrII');
const mnI = document.getElementById('mnI');
const mnII = document.getElementById('mnII');
const scI = document.getElementById('scI');
const scII = document.getElementById('scII');
const colon = document.getElementsByTagName('td');

screenOrient();
document.getElementsByClassName('clock')[0].style.color = "#AAA";

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
    
    if(lastHr != time.getHours())
    {
        if((url.has('oledProtection') && url.get('oledProtection') == 0) || (url.has('oled') && url.get('oled') == 0))
            console.log("Oled Protection Disabled.");
        else
            if(lastHr != 25) oledProtection();

        lastHr = time.getHours();
    }
}

let lastCW = 0;

function oledProtectionDebug()
{
    const rect = document.getElementById('table').getBoundingClientRect();
    const clockW = Math.ceil(rect.width), clockH = Math.ceil(rect.height);
    if (lastCW == 0) lastCW = clockW;

    const field = document.getElementById('field').getBoundingClientRect(); // originally visualViewport.width
    const fieldW = Math.ceil(field.width), fieldH = Math.ceil(field.height);

    const maxLeft = (fieldW - clockW) / 2, minLeft = -maxLeft;
    const maxTop = (fieldH - clockH) / 2, minTop = -maxTop;

    const randL = Math.floor(Math.random() * (maxLeft - minLeft + 1) + minLeft);
    const randT = Math.floor(Math.random() * (maxTop - minTop + 1) + minTop);

    document.getElementById('field').style.background = "#400";
    document.getElementById('table').style.background = "#040";
    const sequence = ["hrI", "hrII", "mnI", "mnII", "scI", "scII"];
    for (let re = 0; re < sequence.length; re++) {
        const element = sequence[re];
        document.getElementById(element).style.background = (lastCW == clockW ? "#004" : "#404");
    }

    // document.getElementById('table').style.left = randL + "px";
    // document.getElementById('table').style.top = randT + "px";
    document.getElementById('table').style.transform = `translate(${randL}px, ${randT}px)`;
    console.log("Position Shifted to (" + randL + ", " + randT + ")\nMax position is" + "(" + maxLeft + ", " + maxTop + ")\nClock size is (" + clockW + ", " + clockH + ")\nScreen size is (" + fieldW + ", " + fieldH + ")" + (lastCW > clockW ? ("\n! Squeezed "+(lastCW-clockW)+" px") : ""));
    lastCW = clockW;
}

function oledProtection()
{
    const rect = document.getElementById('table').getBoundingClientRect();
    const clockW = rect.width, clockH = rect.height;

    const field = document.getElementById('field').getBoundingClientRect(); // originally visualViewport.width
    const fieldW = Math.ceil(field.width), fieldH = Math.ceil(field.height);

    const maxLeft = (fieldW - clockW) / 2, minLeft = -maxLeft;
    const maxTop = (fieldH - clockH) / 2, minTop = -maxTop;

    const randL = Math.floor(Math.random() * (maxLeft - minLeft + 1) + minLeft);
    const randT = Math.floor(Math.random() * (maxTop - minTop + 1) + minTop);

    document.getElementById('table').style.transform = `translate(${randL}px, ${randT}px)`;
}

function fullscreenToggle()
{
    if (!document.fullscreenElement)
    {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Unable to enter fullscreen mode: ${err.message}`);
        });
    }
    else
    {
        if (document.exitFullscreen)
            document.exitFullscreen();
    }
}

function ctrl(key)  // 1 = Font, 2 = Manual, 3 = Color White/Gray, 4 = Color Random, 5 = OLED Protection Debug
{
    switch (key) {
        case 1:
        case 't':
        case '1':
        case '2':
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
            document.getElementsByClassName('manual')[0].style.opacity = 
                                        (document.getElementsByClassName('manual')[0].style.opacity == 0 ? 1 : 0);
            if(manualTog)
            {
                document.getElementsByClassName('manual')[0].innerHTML=`
                    <b style="font-size:1.2em;">-- MANUAL --</b>
                    ${(innerHeight / innerWidth < 2.16) && !(window.matchMedia("(hover: none)").matches) ? `<p>
                        <span class="buttonLook"><code>t</code></span> - Toggle font style<br>
                        <span class="buttonLook"><code>m</code></span> - Show / Hide this manual<br>
                        <span class="buttonLook"><code>w</code></span> - Toggle White / Gray color<br>
                        <span class="buttonLook"><code>c</code></span> - Random color (8 colors)<br>
                        <span class="buttonLook"><code>f</code></span> - Toggle Fullscreen mode<br> </p>` : ''}
                    ${touchable ? ` <p>
                        <b>For Touch Devices:</b><br>
                        Tap Hour (Left / Right) = Toggle Fullscreen / Font<br>
                        Tap Minute = Show Manual<br>
                        Tap Second (Left) = Toggle White/Gray<br>
                        Tap Second (Right) = Random Color<br> </p>` : ''}
                    <p>
                    <b>CUSTOMIZE SETTINGS</b><br>
                    You can save settings by modifying the link in your browser's address bar:<br>
                    </p> <p>
                    <b>1. Disable Position Shift</b><br>
                    <span style="font-size:0.8em;">The position shifting every hour is for OLED screen protection.<br>
                    If you want to disable it,<br></span>
                    add <code>?oled=0</code> to the end.<br>
                    <span style="font-size:0.8em; color:#888;">Example: .../clock.html?oled=0</span><br>
                    </p> <p>
                    <b>2. Set Custom Color</b><br>
                    Add <code>?color=ColorCode</code> (Use 6-digit hex code, no '#').<br>
                    <span style="font-size:0.8em; color:#888;">Example: .../clock.html?color=71A1F0</span><br>
                    </p>
                    <b>3. Use Both</b><br>
                    Connect them with an '<code>&</code>' symbol.<br>
                    <span style="font-size:0.8em; color:#888;">Example: .../clock.html?oled=0&color=71A1F0</span>
                `;
            }
            else
                document.getElementsByClassName('manual')[0].innerHTML="";
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
        case 5:
        case 'f':
            fullscreenToggle();
            break;
        case 7:
        case 'r':
            oledProtectionDebug();
            break;
        default:
            break;
    }
}

function screenOrient()
{
    let currScreen = (window.innerHeight > window.innerWidth) ? 'v' : 'h';
    if(currScreen == screen) return; // No change

    if(window.innerHeight > window.innerWidth){
        colon[0].style.width = "3vw"; colon[1].style.width = "3vw";
        colon[0].innerText = ""; colon[1].innerText = "";
        screen = 'v';

        let overlay = document.getElementsByClassName('overlay');
        if(touchable == 0)
        {
            document.getElementsByClassName('manual')[0].style.fontSize = "2.2vh";
            document.getElementsByClassName('onstrt')[0].style.fontSize = "4.6vw";
            for(let re = 0; re < overlay.length; re++)
            {
                overlay[re].style.border = "#AAA 0.5vw solid";
                overlay[re].style.borderRadius = "2vw";
                overlay[re].style.padding = "3vw";
                overlay[re].style.width = "75vw";
            }
        }
        else
        {
            document.getElementsByClassName('manual')[0].style.fontSize = "2.2vh";
            document.getElementsByClassName('onstrt')[0].style.fontSize = "5vw";
            for(let re = 0; re < overlay.length; re++)
            {
                overlay[re].style.border = "#AAA 1vw solid";
                overlay[re].style.borderRadius = "3vw";
                overlay[re].style.padding = "4vw";
                overlay[re].style.width = "80vw";
            }
        }
    }
    else{
        colon[0].style.width = "6vw"; colon[1].style.width = "6vw";
        colon[0].innerText = ":"; colon[1].innerText = ":";
        screen = 'h'
    }
}

document.addEventListener('keydown', (event) => {
    var name = event.key;
    ctrl(name);
}, false);
// https://www.section.io/engineering-education/keyboard-events-in-javascript/

hrI.addEventListener('click',  () => ctrl(5));
hrII.addEventListener('click', () => ctrl(1));

mnI.addEventListener('click',  () => ctrl(2));
mnII.addEventListener('click', () => ctrl(2));

scI.addEventListener('click',  () => ctrl(3));
scII.addEventListener('click', () => ctrl(4));

window.addEventListener('resize', screenOrient);

[hrI, hrII, mnI, mnII, scI, scII].forEach(el => {
    el.style.cursor = "pointer";
});