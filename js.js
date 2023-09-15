document.addEventListener('keydown', (event) => {
    var name = event.key;
    // var code = event.code;
    // Alert the key name and key code on keydown
    // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
    // document.getElementById('hrI').innerHTML=name;
    if(name == 1)
    {
        document.getElementsByTagName('body')[0].style.fontFamily="Alexandria";
        
        for(var re = 0; re <= 5; re++)
            document.getElementsByTagName('th')[re].style.width = "12vw";
    }
    if(name == 2)
    {
        document.getElementsByTagName('body')[0].style.fontFamily="Playfair Display";

        for(var re = 0; re <= 5; re++)
            document.getElementsByTagName('th')[re].style.width = "10vw";
    }
    if(name == 'm')
        document.getElementsByClassName('manual')[0].style.opacity = (document.getElementsByClassName('manual')[0].style.opacity == 0 ? 1 : 0);

    if(name == 'w')
    {
        if(document.getElementsByClassName('clock')[0].style.color == "rgb(170, 170, 170)")
            document.getElementsByClassName('clock')[0].style.color = "#FFF";
        else
            document.getElementsByClassName('clock')[0].style.color = "#AAA";
    }
    if(name == 'c')
    {
        const tableColor = ["#AAA", "#FFF", "#F00", "#0F0", "#00F", "#FF0", "#0FF", "#F0F"];
        document.getElementsByClassName('clock')[0].style.color = tableColor[Math.floor(Math.random() * 8)];
    }
}, false);
// https://www.section.io/engineering-education/keyboard-events-in-javascript/

let det = new Date;
var lastHr = 25;
let url = new URLSearchParams(window.location.search);
var screen = '';
document.getElementsByClassName('clock')[0].style.color = "#AAA";

function main()
{
    let time = new Date;
    var hour = time.getHours() <= 12 ? time.getHours() : time.getHours() - 12;

    document.getElementById('hrI').innerText=Math.floor(hour <= 9 ? "0" : hour / 10);
    document.getElementById('hrII').innerText=hour % 10;
    document.getElementById('mnI').innerText=Math.floor(time.getMinutes() <= 9 ? "0" : time.getMinutes() / 10);
    document.getElementById('mnII').innerText=time.getMinutes() % 10;
    document.getElementById('scI').innerHTML=Math.floor(time.getSeconds() <= 9 ? "0" : time.getSeconds() / 10);
    document.getElementById('scII').innerHTML=time.getSeconds() % 10;

    if(time.getMilliseconds() == 0)
        console.log("Lucky 0 easteregg!");

    if(window.innerHeight > window.innerWidth){
        document.getElementsByTagName('td')[0].style.width = "3vw";
        document.getElementsByTagName('td')[1].style.width = "3vw";
        document.getElementsByTagName('td')[0].innerText = "";
        document.getElementsByTagName('td')[1].innerText = "";
        screen = 'v';
    }
    else{
        document.getElementsByTagName('td')[0].style.width = "6vw";
        document.getElementsByTagName('td')[1].style.width = "6vw";
        document.getElementsByTagName('td')[0].innerText = ":";
        document.getElementsByTagName('td')[1].innerText = ":";
        screen = 'h'
    }
    
    if(lastHr != time.getHours())
    {
        if((url.has('oledProtection') && url.get('oledProtection') == 0) || (url.has('oled') && url.get('oled') == 0))
        {
            console.log("Oled Protection Disabled.");
        }
        else
        {
            if(lastHr != 25) oledProtection();
        }

        lastHr = time.getHours();
    }
}

// ---------------------------------
if(url.has('color'))
{
    var color = url.get('color');
    document.getElementsByClassName('clock')[0].style.color = '#' + color;
    console.log("Setted color to " + color);
}
setInterval(main ,200);

function oledProtection(){
    //document.getElementById('table').style.justify-content = "normal";
    //document.getElementById('table').style.align-items = "normal";
    do
    {   var randT = Math.floor(Math.random() * 99 /*72*/).toString() + "vh";
        var randL = Math.floor(Math.random() * (screen == 'h' ? 12 : innerHeight/innerWidth < 2.1875 ? 11 : 9)).toString() + "vw";
        document.getElementById('table').style.top = randT;
        if (innerHeight/innerWidth < 2.3357142857142)
            document.getElementById('table').style.left = randL;
        else
            console.log("Screen too long. Horizontal position won't change.");
        console.log("top = " + randT + "\nleft = " + randL);
    } while (isTablePartOutsideViewport(document.getElementById('table')))
}


function isTablePartOutsideViewport(tableElement) {
    const tableRect = tableElement.getBoundingClientRect();
  
    if (tableRect.right > window.innerWidth ||
        tableRect.bottom > window.innerHeight ||
        tableRect.left < 0 ||
        tableRect.top < 0 )
    {
        return true;
    }
  
    return false;
} //thx ChatGPT