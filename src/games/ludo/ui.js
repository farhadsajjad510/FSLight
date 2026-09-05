export function drawClassicBoard(ctx){

  const cell = 40;

  function home(x,y,color){

    ctx.fillStyle=color;
    ctx.fillRect(x,y,240,240);

    ctx.fillStyle="#ffffff";

    const r=18;

    [[60,60],[180,60],[60,180],[180,180]].forEach(([dx,dy])=>{
      ctx.beginPath();
      ctx.arc(x+dx,y+dy,r,0,Math.PI*2);
      ctx.fill();
    });

  }

  ctx.fillStyle="#ffffff";
  ctx.fillRect(0,0,600,600);

  /* Cross */
  ctx.strokeStyle="#222";

  for(let i=0;i<=15;i++){
    ctx.beginPath();
    ctx.moveTo(i*cell,0);
    ctx.lineTo(i*cell,600);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,i*cell);
    ctx.lineTo(600,i*cell);
    ctx.stroke();
  }

  home(0,0,"#e53935");
  home(360,0,"#43a047");
  home(0,360,"#1e88e5");
  home(360,360,"#fdd835");

  ctx.fillStyle="#9c27b0";
  ctx.beginPath();
  ctx.arc(300,300,30,0,Math.PI*2);
  ctx.fill();
}
