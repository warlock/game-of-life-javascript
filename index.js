var fs = require("fs");

var grid = [];
var grid_aux = [];
fs.readFile("./grid.txt", "utf8", (err, data) => {
    if (err) throw err;
    data.split("\n").forEach((l) => {
        grid.push(l.split(""));
    });
    grid_aux = grid;
    grid.forEach((g,y) => {
        g.forEach((gg,x) => {
            grid_aux[y][x] = transorm(getNear(x,y),getCell(x,y));
        });
    });
    show(grid_aux);
});


function getCell(x,y) {
    return grid[y][x];
}

function getNear(x,y) {
    let n = 0;
    if(check(y,x-1) &&    grid[y][x-1] === "1") n++;
    if(check(y,x+1) && grid[y][x+1]    === "1") n++;
    if(check(y-1,x-1) && grid[y-1][x-1] === "1") n++;
    if(check(y-1,x+1) && grid[y-1][x+1] === "1") n++;
    if(check(y+1,x-1) && grid[y+1][x-1] === "1") n++;
    if(check(y+1,x+1) && grid[y+1][x+1] === "1") n++;
    if(check(y+1,x) && grid[y+1][x] === "1") n++;
    if(check(y-1,x) && grid[y-1][x] === "1") n++;
    return n;
}

function transorm(num_activos,actual) {
    if(num_activos === 0 && actual === "1") return "0";
    else if(num_activos === 3 && actual === "0") return "1";
    else if(num_activos > 3 && actual === "1") return "0";
    else return "0";
}

function show(array_multi) {
    array_multi.forEach((g) => {
        var line = "";
        g.forEach((gg) => {
            line = line + gg;
        });
        console.log(line);
    });
}

function check(y,x) {
    return grid[y] !== undefined && grid[y][x] !== undefined;
}