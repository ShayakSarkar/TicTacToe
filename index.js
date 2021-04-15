var GAME_OVER=false;
var CROSS=0;
var TICK=1;
var MARK_TYPE=1;
var marked_cell_ctr=0;
var is_marked=[[null,null,null],
     [null,null,null],
     [null,null,null]];

function reset(){
    console.log('reset called');
    is_marked=[[null,null,null],
               [null,null,null],
               [null,null,null]];
    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            var id="c"+i+j;
            var child=document.querySelector("#"+id+" img")
            if(child!=null){
                document.getElementById(id).removeChild(child);
            }
        }
    }
    document.getElementById("winner_name").innerHTML="";
    document.getElementById("reset_button").style.display="none";
    //document.getElementById("reset_button").style.width="hidden";
    //document.getElementById("reset_button").style.innerHTML="";
    GAME_OVER=false;
}

function verify(r,c){
    console.log(is_marked);
    console.log("position is",r,c);
    var mark_type=is_marked[r][c]; //mark_type is the current mark_type that needs checking
                                   //and is present in grid[r][c]
    var flg=true;
    for(var i=r+1;i<3;i++){
        if(is_marked[i][c]!=mark_type){
            flg=false;
            break;
        }
    }
    for(i=r-1;i>=0;i--){
        if(is_marked[i][c]!=mark_type){
            flg=false;
            break;
        }
    }
    if(flg===true){
        console.log('row wise correct');
        return mark_type;
    }
    flg=true;
    for(i=c+1;i<3;i++){
        if(is_marked[r][i]!=mark_type){
            flg=false;
            break;
        }
    }
    for(i=c-1;i>=0;i--){
        if(is_marked[r][i]!=mark_type){
            flg=false;
            break; 
        }
    }
    if(flg===true){
        console.log('column wise correct');
        return mark_type;
    }
    if(r===0 || c===0 || r===2 || c===2 || (r===1 && c===1)){
        i=0;
        var j=0;
        while(i<3){
            if(is_marked[i][j]!=mark_type){
                break;
            }
            i++;
            j++;
        }
        if(i==3){
            console.log('principal diagonal correct');
            return mark_type;
        }
        i=0;
        j=2;
        while(i<3){
            if(is_marked[i][j]!=mark_type){
                break;
            }
            i++;
            j--;
        }
        if(i==3){
            console.log('non-principal diagonal correct');
            return mark_type;
        }
    }
    return null;
}
function  handleClick(e){
    if(GAME_OVER){
        return;
    }
    //e.path[0].style.backgroundColor="red";
    if(is_marked[e.path[0].id]!=null){
        return;
    }
    is_marked[e.path[0].id]=MARK_TYPE;
    var r=Number(e.path[0].id[1]);
    var c=Number(e.path[0].id[2]);
    is_marked[r][c]=MARK_TYPE;
    var mark=document.createElement("img");
    if(MARK_TYPE===TICK){
        mark.src="./tick.png";
        MARK_TYPE=CROSS;
    }
    else{
        mark.src="./cross.png";
        MARK_TYPE=TICK;
    }
    marked_cell_ctr++;
    mark.style.position="absolute";
    mark.width=50;
    mark.height=50;
    mark.style.left="25px";
    mark.style.top="25px";
    //mark.=100;
    console.log(e.path[0].offsetLeft);
    console.log(e.path[0].offsetTop);
    document.getElementById(e.path[0].id).appendChild(mark);
    var winner=verify(r,c);
    if(winner!=null){
        if(winner===0){
            document.getElementById("winner_name").innerHTML="!! Player 2 Wins !!";
        }
        else{
            document.getElementById("winner_name").innerHTML="!! Player 1 Wins !!";
        }
        var resetButton=document.getElementById("reset_button");
        resetButton.style.display="block";
        resetButton.addEventListener("click",reset);
        console.log(winner);
        GAME_OVER=true;
        marked_cell_ctr=0;
        return;
    }
    else if(marked_cell_ctr==9){
        document.getElementById("winner_name").innerHTML="!!  Game Drawn  !!";
        resetButton=document.getElementById("reset_button");
        resetButton.style.display="block";
        resetButton.addEventListener("click",reset);
        console.log(winner);
        GAME_OVER=true;
        marked_cell_ctr=0;
        return;
    }
    else{
        console.log("no winner found");
    }
}
document.getElementsByClassName("Board")[0].addEventListener("click",handleClick);

