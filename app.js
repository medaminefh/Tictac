const cells=document.querySelectorAll('[data-cell');
const board=document.getElementById('board');
const winnerMessage=document.getElementById('winning-message');
let winningMessageElement=document.querySelector('[data-winning]');
let button=document.getElementById('restart');
const x='x';
const o='o';
let oturn;
const winning=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
start()
button.addEventListener('click',start);


function start(){
    oturn=false ;
    cells.forEach(cell =>{
        cell.classList.remove(x);
        cell.classList.remove(o);
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click',handleClick,{once:true});
    })
    sethover();
    winnerMessage.classList.remove('show');
}

function handleClick(e){
    const cell=e.target;
    const current=oturn ?o:x;
    placemark(cell,current);

    if(checkwin(current)){
        end(false)
    }else if(isdraw()){
        end(true);
    }else {
        swap()
        sethover()
    }

}

function isdraw(){
    return [...cells].every(cell =>{
        return cell.classList.contains(x) || cell.classList.contains(o);
    })
}

function end(draw){
    if(draw){
        winningMessageElement.innerText="Draw!"
    }else{
        winningMessageElement.innerText=`${oturn?"O's":"X's"}Wins!`
    }
    winnerMessage.classList.add('show');
}

function placemark(cell,current){
    cell.classList.add(current)
}

function swap(){
    oturn=!oturn;
}

function sethover(){
    board.classList.remove(x)
    board.classList.remove(o)
    if(oturn){
        board.classList.add(o)
    }else {
        board.classList.add(x)
    }
}

function checkwin(current){
    return winning.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(current);
        })
    })
}