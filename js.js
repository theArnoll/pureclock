document.addEventListener('keydown', (event) => {
  var name = event.key;
  var code = event.code;
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
}, false);
// https://www.section.io/engineering-education/keyboard-events-in-javascript/

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
  }
  else{
    document.getElementsByTagName('td')[0].style.width = "6vw";
    document.getElementsByTagName('td')[1].style.width = "6vw";
    document.getElementsByTagName('td')[0].innerText = ":";
    document.getElementsByTagName('td')[1].innerText = ":";
  }

  setTimeout(function(){ main() },200);
}