import React, {Component} from 'react';

export default class Sudoku extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            boards: [
                [
                    [7,8,0,4,0,0,1,2,0],
                    [6,0,0,0,7,5,0,0,9],
                    [0,0,0,6,0,1,0,7,8],
                    [0,0,7,0,4,0,2,6,0],
                    [0,0,1,0,5,0,9,3,0],
                    [9,0,4,0,6,0,0,0,5],
                    [0,7,0,3,0,0,0,1,2],
                    [1,2,0,0,0,7,4,0,0],
                    [0,4,9,2,0,6,0,0,7]
                ],
                [
                    [0,0,0,4,0,0,1,2,0],
                    [6,0,0,0,7,5,0,0,9],
                    [0,0,0,6,0,1,0,7,8],
                    [0,0,7,0,4,0,2,6,0],
                    [0,0,1,0,5,0,9,3,0],
                    [9,0,4,0,6,0,0,0,5],
                    [0,7,0,3,0,0,0,1,2],
                    [1,2,0,0,0,7,4,0,0],
                    [0,4,9,2,0,6,0,0,7]
                ]
            ],
            boardNum: 0,
            board: [
                [7,8,0,4,0,0,1,2,0],
                [6,0,0,0,7,5,0,0,9],
                [0,0,0,6,0,1,0,7,8],
                [0,0,7,0,4,0,2,6,0],
                [0,0,1,0,5,0,9,3,0],
                [9,0,4,0,6,0,0,0,5],
                [0,7,0,3,0,0,0,1,2],
                [1,2,0,0,0,7,4,0,0],
                [0,4,9,2,0,6,0,0,7]
            ],
            buttonState: "SOLVE!",
        };
        this.solve = this.solve.bind(this);
        this.findEmpty = this.findEmpty.bind(this);
        this.valid = this.valid.bind(this);
        this.sleep = this.sleep.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this)
        this.newPuzzle = this.newPuzzle.bind(this)
    }

    newPuzzle(){
        var newbo = []
        var randomInt = Math.floor(Math.random() * Math.floor(2))
        while (randomInt == this.state.boardNum){
            randomInt = Math.floor(Math.random() * Math.floor(2))
        }
        this.setState({
            boardNum: randomInt
        });
        var bo = this.state.boards[randomInt]
        for (var i in bo){
            newbo.push([...bo[i]])
        }
        
       
        this.setState({
            board: newbo
        });
        console.log("test")
    }

    async handleButtonClick() {
        if (this.state.isSolving == true){
            return false
        }
        console.log("t")
        if (this.state.buttonState == "SOLVE!"){
            this.setState({
                buttonState: "NEW PUZZLE!"
            });
            
            document.getElementById("solveButton").style.opacity = 0.6
            document.getElementById("solveButton").style.cursor = "not-allowed"
            await this.solve()
            document.getElementById("solveButton").style.opacity = 1
            document.getElementById("solveButton").style.cursor = "default"
            
        }
        else if (this.state.buttonState == "NEW PUZZLE!"){
            this.setState({
                buttonState: "SOLVE!"
            });
            this.newPuzzle()
        }
    }
    
    async sleep(){

        return new Promise((resolve, reject) => {
            setTimeout(resolve, 100);
        });
    }
    


    findEmpty(){
        for (var i in [...Array(this.state.board.length).keys()]){
            for (var j in [...Array(this.state.board[0].length).keys()]){
                if (this.state.board[i][j] == ""){
                    return [parseInt(i),parseInt(j)]
                }
            }
        }
        return false
    }
        
    async solve(){
        var find = this.findEmpty()
        if (!(find)){
            return true
        }
        else{
            var row = find[0]
            var col = find[1]
        }
        for (var i of [1,2,3,4,5,6,7,8,9]){
            if (this.valid(i,[row,col])){
                var newboard = this.state.board.slice(0,10)
                newboard[row][col] = i
                
                
                this.setState({
                    board: newboard
                });
                
                document.getElementById("box"+row+col).style.backgroundColor = "#112"
                document.getElementById("box"+row+col).style.color = "#ececec"
                await this.sleep();
                document.getElementById("box"+row+col).style.backgroundColor = "#ececec"
                document.getElementById("box"+row+col).style.color = "black"

                if (await this.solve()){
                    return true
                }

                await this.sleep();
                
                var newboard = this.state.board
                newboard[row][col] = 0
                  
                this.setState({
                    board: newboard
                });
            }
        }
        return false
    }
    
    valid(num,pos){
        for (var i in [...Array(this.state.board.length).keys()]){
            i = parseInt(i)
            if ((this.state.board[pos[0]][i] == num) && (pos[1] != i)){            
                return false
            }    
        }
        for (var i in [...Array(this.state.board.length).keys()]){
            i = parseInt(i)
            if ((this.state.board[i][pos[1]] == num) && (pos[0] != i)){            
                return false
            }            
        }
        var box_x = Math.floor(pos[1] / 3)
        var box_y = Math.floor(pos[0] / 3)
        var j
        for (i=box_y*3; i<box_y*3 + 3; i++){
            for (j=box_x*3; j<box_x*3 + 3; j++){
                if ((this.state.board[i][j] == num) && ((i,j) != pos)){   
                    return false
                }
            }
        }
        return true
    }


    render() {
        var box1 = []
        var emptyGrid = " "
        for (var i=0; i<3; i++){
            for (var j=0; j<3; j++){
                var id = "box" + String(i) + String(j)
                if (this.state.board[i][j]==0) {
                    box1.push(<div id={id} class="box">{emptyGrid}</div>)
                }
                else {
                    box1.push(<div id={id} class="box">{this.state.board[i][j]}</div>)
                }
                
            }
        }

        var box2 = []
        for (var i=0; i<3; i++){
            for (var j=3; j<6; j++){
                var id = "box" + String(i) + String(j)
                if (this.state.board[i][j]==0) {
                    box2.push(<div id={id} class="box">{emptyGrid}</div>)
                }
                else {
                    box2.push(<div id={id} class="box">{this.state.board[i][j]}</div>)
                }
            }
        }

        var box3 = []
        for (var i=0; i<3; i++){
            for (var j=6; j<9; j++){
                var id = "box" + String(i) + String(j)
                if (this.state.board[i][j]==0) {
                    box3.push(<div id={id} class="box">{emptyGrid}</div>)
                }
                else {
                    box3.push(<div id={id} class="box">{this.state.board[i][j]}</div>)
                }
            }
        }

        var box4 = []
        for (var i=3; i<6; i++){
            for (var j=0; j<3; j++){
                var id = "box" + String(i) + String(j)
                if (this.state.board[i][j]==0) {
                    box4.push(<div id={id} class="box">{emptyGrid}</div>)
                }
                else {
                    box4.push(<div id={id} class="box">{this.state.board[i][j]}</div>)
                }
            }
        }

        var box5 = []
        for (var i=3; i<6; i++){
            for (var j=3; j<6; j++){
                var id = "box" + String(i) + String(j)
                if (this.state.board[i][j]==0) {
                    box5.push(<div id={id} class="box">{emptyGrid}</div>)
                }
                else {
                    box5.push(<div id={id} class="box">{this.state.board[i][j]}</div>)
                }
            }
        }

        var box6 = []
        for (var i=3; i<6; i++){
            for (var j=6; j<9; j++){
                var id = "box" + String(i) + String(j)
                if (this.state.board[i][j]==0) {
                    box6.push(<div id={id} class="box">{emptyGrid}</div>)
                }
                else {
                    box6.push(<div id={id} class="box">{this.state.board[i][j]}</div>)
                }
            }
        }

        var box7 = []
        for (var i=6; i<9; i++){
            for (var j=0; j<3; j++){
                var id = "box" + String(i) + String(j)
                if (this.state.board[i][j]==0) {
                    box7.push(<div id={id} class="box">{emptyGrid}</div>)
                }
                else {
                    box7.push(<div id={id} class="box">{this.state.board[i][j]}</div>)
                }
            }
        }

        var box8 = []
        for (var i=6; i<9; i++){
            for (var j=3; j<6; j++){
                var id = "box" + String(i) + String(j)
                if (this.state.board[i][j]==0) {
                    box8.push(<div id={id} class="box">{emptyGrid}</div>)
                }
                else {
                    box8.push(<div id={id} class="box">{this.state.board[i][j]}</div>)
                }
            }
        }

        var box9 = []
        for (var i=6; i<9; i++){
            for (var j=6; j<9; j++){
                var id = "box" + String(i) + String(j)
                if (this.state.board[i][j]==0) {
                    box9.push(<div id={id} class="box">{emptyGrid}</div>)
                }
                else {
                    box9.push(<div id={id} class="box">{this.state.board[i][j]}</div>)
                }
            }
        }

        return(
            <div id="target">
                <div id="outer">
                    <div id="sudoku_outer">
                        <div class="sudoku_box" id="box1">{box1}</div> 
                        <div class="sudoku_box" id="box2">{box2}</div>
                        <div class="sudoku_box" id="box3">{box3}</div>
                        <div class="sudoku_box" id="box4">{box4}</div>
                        <div class="sudoku_box" id="box5">{box5}</div>
                        <div class="sudoku_box" id="box6">{box6}</div>
                        <div class="sudoku_box" id="box7">{box7}</div>
                        <div class="sudoku_box" id="box8">{box8}</div>
                        <div class="sudoku_box" id="box9">{box9}</div>
                    </div>
                </div>    
                <div class="space1"></div>

                <button id="solveButton" onClick={this.handleButtonClick}>{this.state.buttonState}</button>
            </div>
        );
    }
}
