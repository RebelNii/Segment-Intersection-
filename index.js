canvas = document.getElementById("myCanvas");

let t = 0;

const c = canvas.getContext("2d");

const mouse = { x: 0, y: 0 };

canvas.height = window.innerHeight;
canvas.width = window.innerWidth * 0.9;

//c.fillRect(0,0,canvas.width,canvas.height);

document.onmousemove = (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
};

function drawLabel(point, label, isInter) {
  c.beginPath();
  c.fillStyle = isInter ? "red" : "white";
  c.arc(point.x, point.y, 10, 0, Math.PI * 2);
  c.fill();
  c.stroke();
  c.fillStyle = "black";
  c.textAlign = "center";
  c.textBaseline = "middle";
  c.font = "bold 14px Arial";
  c.fillText(label, point.x, point.y);
}

function lerp(A, B, t) {
  return A + (B - A) * t;
}

function getIntersection(A, B, C, D) {
  /**
   * Ix = Ax+(Bx-Ax)*t = CDx+(Dx-CDx)*u
   * Iy = Ay+(By-Ay)*t = CDy+(Dy-CDy)*u
   */

  const top = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
  const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

  if (bottom != 0) {
    const t = top / bottom;
    console.log(t);
    if (t >= 0 && t <= 1) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        bottom: bottom,
      };
    }
  }
}

let angle = 0;

function animate() {
  window.requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  const A = { x: 200, y: 150 };
  const B = { x: 150, y: 250 };
  const CD = { x: 50, y: 100 };
  const D = { x: 250, y: 200 };

  const M = {
    x: lerp(A.x, B.x, t),
    y: lerp(A.y, B.y, t),
  };

  const F = {
    x: lerp(CD.x, D.x, t),
    y: lerp(CD.y, D.y, t),
  };
  const radius = 50;
  A.x = mouse.x + Math.cos(angle) * radius;
  A.y = mouse.y - Math.sin(angle) * radius;
  B.x = mouse.x - Math.cos(angle) * radius;
  B.y = mouse.y + Math.sin(angle) * radius;
  angle += 0.02;

  c.lineWidth = 5;
  c.strokeStyle = "yellow";
  c.beginPath();
  c.moveTo(A.x, A.y);
  c.lineTo(B.x, B.y);
  c.moveTo(CD.x, CD.y);
  c.lineTo(D.x, D.y);
  c.stroke();

  drawLabel(A, "A");
  drawLabel(B, "B");
  drawLabel(CD, "CD");
  drawLabel(D, "D");
  //drawLabel(M, "M", t<0 || t>1);
  //drawLabel(F, "F",t<0 || t>1);

  const I = getIntersection(A, B, CD, D);

  drawLabel(I, "I");
  c.beginPath();
  c.fillStyle = "red";
  c.fillRect(canvas.width / 2, 0, I.bottom / 100, 10);

  //t += 0.005;
}

animate();

/*
c.beginPath();
c.fillStyle = "white";
c.arc(A.x, A.y, 10, 0, Math.PI * 2);
c.fill();
c.stroke();
c.fillStyle = "black";
c.textAlign = "center";
c.textBaseline = "middle";
c.font = "bold 14px Arial";
c.fillText("A", A.x, A.y);*/
