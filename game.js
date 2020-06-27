function load_images()
{
ene_image=new Image;
ene_image.src="v1.png";
player_image=new Image;
player_image.src="player.png";
gem_image=new Image;
gem_image.src="gem.png";
}
function init()
{
  canvas=document.getElementById("mycanvas");
      W=1000;
      H=400;
      canvas.width=W;
      canvas.height=H;
      game_over=false;
      pen=canvas.getContext('2d');
      e1={
        x:150,
        y:50,
        w:60,
        h:60,
        speed:15,

      };
      e2={
        x:500,
        y:150,
        w:60,
        h:60,
        speed:20,

      };
      e3={
        x:750,
        y:20,
        w:60,
        h:60,
        speed:35,

      };
      player={
        x:20,
        y:H/2,
        w:60,
        h:60,
        speed:20,
        moving:false,
        health:140,
      };
      gem={
        x:900,
        y:H/2,
        w:60,
        h:60,
      };
      enemy=[e1,e2,e3];
      canvas.addEventListener('mousedown',function(){
        player.moving=true;
      });
      canvas.addEventListener('mouseup',function(){
        player.moving=false;
      });
}
function draw()
{
    pen.clearRect(0,0,W,H);
    pen.font="50px Roboto";
    pen.fillText("player heath",30,40);
    pen.fillText(player.health,300,40);
    pen.fillStyle="blue";
    pen.drawImage(player_image,player.x,player.y,player.w,player.h);
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
  for(var i=0;i<enemy.length;i++)
  {
  pen.drawImage(ene_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
}
}
//  pen.fillRect(box.x,box.y,box.w,box.h);
function isOverlap(rect1,rect2)
{
  if (rect1.x < rect2.x + rect2.w &&
   rect1.x + rect1.w > rect2.x &&
   rect1.y < rect2.y + rect2.h &&
   rect1.y + rect1.h > rect2.y) {
    return true;
}


return false;
}
function update()
{


  if(player.moving==true)
  {
    player.x+=player.speed;
    player.health+=5;

  }
  if(player.health>200)
  player.heath=200;
  for(let i=0;i<enemy.length;i++)
  {
    if(isOverlap(enemy[i],player))
    {
      player.health-=10;
      if(player.health<0)
      {
        game_over=true;
        alert("game_over you lost");
      }
    }
  }
 if(isOverlap(player,gem)){
  console.log("You Won");
   alert("congrats you won");
   game_over=true;
   return;
 }
  for(var i=0;i<enemy.length;i++)
  {
     enemy[i].y+= enemy[i].speed;
       if( enemy[i].y+ enemy[i].h>H || enemy[i].y<0)
        {
           enemy[i].speed*=-1;
        }
 }
}
function gameloop()
{
  if(game_over==true)
  clearInterval(f);
  draw();
  update();
}
load_images();
init();
var f=setInterval(gameloop,100);
