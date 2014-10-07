<script language="JavaScript">
var i=0
var j=0
var texteNE, affiche;
var texte="Friendship marks a life even more deeply than love. <br> Love risks degenerating into obsession,<br> friendship is never anything but sharing."
var ie = (document.all);
var ne = (document.layers); 
function init(){
texteNE='';
machine_a_ecrire();
}
function machine_a_ecrire(){
texteNE=texteNE+texte.charAt(i)
affiche="<font face=verdana size=1 color=#187EE5><strong>"+texteNE+"</strong></font>"
if (texte.charAt(i)=="<") {
j=1
}
if (texte.charAt(i)==">") {
j=0
}
if (j==0) {
if (document.getElementById) { // avec internet explorer
document.getElementById("bulle").innerHTML = affiche;
}
}
if (i<texte.length-1){
i++
setTimeout("machine_a_ecrire()",130)
}
else
return
}
</script>