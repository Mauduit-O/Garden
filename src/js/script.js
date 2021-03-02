let lawn = [];
let square = [];
let mower = [];
let mowerNumber = 1;
let lawnMowed;
let changeDirection = 0;
let timerun = 350;
let divResponse = document.querySelector(".response");
let start = document.querySelector(".btnStart");
let container = document.querySelector(".garden");
let data = ["55", "44 S", "GADDAAGADAA", "22 N", "AADGGDADGA"];

for (let i = 0; i <= 1; i++) {
  lawn.push(data[0][i]);
}
for (let i = 1; i < lawn[0] * lawn[1] + 1; i++) {
  square[i] = document.createElement("div");
  square[i].classList.add("lawn");
  square[i].setAttribute("id", i);
  container.appendChild(square[i]);
}

getData = () => {
  getParameters(data);
  waitChangeDirection(mower);
};

start.addEventListener("click", () => {
  getData();
});

mowLawn = (div) => {
  div.classList.remove(div.classList);
  div.classList.toggle("lawnMowed");
};

getParameters = (data) => {
  let response = [];
  let detailsInstruction = [];
  for (let i = 1; i < data.length; i++) {
    response.push(data[i]);
  }
  for (i = 0; i < response.length; i += 2) {
    detailsInstruction.push(response.slice(i, i + 2));
  }
  for (let i = 0; i < detailsInstruction.length; i++) {
    let directive = [];
    for (let j = 0; j < detailsInstruction[i][0].length; j++) {
      directive.push(detailsInstruction[i][0][j]);
    }
    mower[i] = {
      posX: Number(directive[0]),
      posY: Number(directive[1]),
      orientation: directive[3],
      instructions: detailsInstruction[i][1],
    };
  }
};

mowerParameters = (mower, id) => {
  let orientation = "mower" + mower.orientation;
  if (mower.posX == 0) {
    mower.posX = 1;
  }
  if (mower.posY == 0) {
    mower.posY = 1;
  }
  let pos = 25 - mower.posY * 5 + mower.posX;
  let div = document.getElementById(pos);
  div.classList.remove(div.classList);
  div.classList.add(orientation);
  lawnMowed = div;
};

command = (instructions, mower, i) => {
  setTimeout(function () {
    if (i == instructions.length) {
      createResponse(mower, mowerNumber);
      window.scrollTo(0, document.body.scrollHeight);
      mowerNumber++;
    }
    mowerParameters(mower, mowerNumber);
    if (i < instructions.length) {
      setTimeout(() => {
        mowLawn(lawnMowed);
      }, timerun);
    }
    switch (instructions[i]) {
      case "G":
        if (mower.orientation == "S") {
          mower.orientation = "E";
        } else if (mower.orientation == "N") {
          mower.orientation = "W";
        } else if (mower.orientation == "W") {
          mower.orientation = "S";
        } else if (mower.orientation == "E") {
          mower.orientation = "N";
        }
        break;
      case "D":
        if (mower.orientation == "S") {
          mower.orientation = "W";
        } else if (mower.orientation == "N") {
          mower.orientation = "E";
        } else if (mower.orientation == "W") {
          mower.orientation = "N";
        } else if (mower.orientation == "E") {
          mower.orientation = "S";
        }
        break;

      case "A":
        if (
          mower.orientation == "S" &&
          mower.posY > 0 &&
          mower.posY <= lawn[1]
        ) {
          mower.posY -= 1;
        } else if (
          mower.orientation == "N" &&
          mower.posY > 0 &&
          mower.posY < lawn[1]
        ) {
          mower.posY += 1;
        } else if (
          mower.orientation == "E" &&
          mower.posX > 0 &&
          mower.posX < lawn[0]
        ) {
          mower.posX += 1;
        } else if (
          mower.orientation == "W" &&
          mower.posX > 0 &&
          mower.posX <= lawn[0]
        ) {
          mower.posX -= 1;
        }
        break;
    }
    i++;
    if (i < instructions.length + 1) {
      command(instructions, mower, i);
    } else if (i == instructions.length) {
    }
  }, timerun);
};

waitChangeDirection = (time = 0) => {
  setTimeout(function () {
    command(mower[changeDirection].instructions, mower[changeDirection], 0);
    var Newtime =
      mower[changeDirection].instructions.length * timerun + timerun;
    changeDirection++;
    if (changeDirection < mower.length) {
      waitChangeDirection(Newtime);
    }
  }, time);
};

createResponse = (mower, i) => {
  var position = document.createElement("p");
  position.classList.add("response__Position");
  position.innerText = `Position tondeuse ${i} : ${mower.posX}${mower.posY} ${mower.orientation}`;
  divResponse.append(position);
};
