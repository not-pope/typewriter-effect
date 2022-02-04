const main = document.getElementById("main");
const [max_speed, min_speed] = [50,800];
const timeouts = {};

function randomInRange(min, max) {
  return Math.floor(Math.random()*(max-min+1))+min;
}

function animate(id,text,field) {
  if (text.length>=1) {
    field.innerHTML+=text[0];
    let speed = randomInRange(min_speed,max_speed);
    timeouts[id] = setTimeout(animate,speed,id,text.slice(1,text.length),field);
  }else{
    clearTimeout(timeouts[id]); // just because :)
    timeouts[id]=null;
  }
}

function startAnimation(e) {
  e.preventDefault();
  let example = e.target.parentElement;
  let example_id = example.id;
  let example_text = example.children[0];
  let example_area = example.children[4]; // bad
  if (example_text.value !== ""){
    example_area.innerHTML = "";
    clearTimeout(timeouts[example_id]);
    animate(example_id, example_text.value, example_area);
  }
}

function stopAnimation(e) {
  e.preventDefault();
  let example = e.target.parentElement;
  let example_id = example.id;
  clearTimeout(timeouts[example_id]);
  timeouts[example_id] = null;
}

function clear(e) {
  e.preventDefault();
  let clear_button = e.target;
  let example = e.target.parentElement;
  let example_id = example.id;
  let example_area = example.children[4]; // baad
  clear_button.classList.remove("success")
  clear_button.classList.remove("fail");
  void clear_button.offsetWidth; // trigger reflow
  if (timeouts[example_id]){
    // console.log("first stop animation or wait for it to finish");
    clear_button.classList.add("fail");
  }else{
    if(example_area.innerHTML===""){
      // console.log("there is nothing to clear");
      clear_button.classList.add("fail");
    }else{
      clear_button.classList.add("success");
      example_area.innerHTML = "&nbsp;";
    }
  }
}

function createExample() {
  const example = document.createElement("div");
  const example_text = document.createElement("input");
  example_text.placeholder = "enter your text";
  const example_start_button = document.createElement("button");
  example_start_button.innerHTML = "start animation";
  const example_stop_button = document.createElement("button");
  example_stop_button.innerHTML = "stop animation";
  const example_clear_button = document.createElement("button");
  example_clear_button.innerHTML = "clear";
  const example_area = document.createElement("span");
  example_area.innerHTML = "&nbsp;";
  let example_id = "example-"+String(randomInRange(1,99999));
  example.id=example_id;
  example.classList.add("example");
  example.appendChild(example_text);
  example.appendChild(example_start_button);
  example.appendChild(example_stop_button);
  example.appendChild(example_clear_button);
  example.appendChild(example_area);
  example_start_button.addEventListener("click",startAnimation);
  example_stop_button.addEventListener("click",stopAnimation);
  example_clear_button.addEventListener("click",clear);
  main.appendChild(example);
}

function deleteExample() {
  main.removeChild(main.lastChild);
}

const create_example_button = document.createElement("button");
const delete_example_button = document.createElement("button");
create_example_button.innerHTML="+";
delete_example_button.innerHTML="-";
create_example_button.addEventListener("click",createExample);
delete_example_button.addEventListener("click",deleteExample);
main.appendChild(create_example_button);
main.appendChild(delete_example_button);
createExample();
