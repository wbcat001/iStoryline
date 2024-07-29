
// result -> array for Line
// array
// perm [frame, chara]

var lineArray = [];
for (var i=0; i< result["array"].length; i++){

    var tmpPos = result["array"][i];
    var tmpPerm = result["perm"][i];
    var tmpSession = result["sessionTable"][i];

    var tmpLineArray = [];
    for(var j=0; j<tmpPos["points"].length; j++){

        if(tmpPerm[j] != -1){
            var p1 = { "x": tmpPos["points"][j]["item1"], "y": tmpPos["points"][j]["item3"], "s": tmpSession[j]};
            var p2 = { "x": tmpPos["points"][j]["item2"], "y": tmpPos["points"][j]["item3"], "s": tmpSession[j]};
            tmpLineArray.push(p1);
            tmpLineArray.push(p2);
        }
    }
    

    var charaLineArray = {
        "id": tmpPos["name"],
        "position": tmpLineArray,
        "session": tmpSession,
    }
    lineArray.push(charaLineArray);

}
console.log("result of preprocess");
console.log(lineArray);
