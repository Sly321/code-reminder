setTimeout(function(){ drawTree() }, 200);
$( "#addBtn" ).click(function() { addToTreeBtn() });
$( "#removeBtn" ).click(function() {removeFromTreeBtn();})
$('#addingText').keyup(function(e){
  console.log("test" + e.keyCode);
    if(e.keyCode == 13)
    {
        addToTreeBtn();
    }
});

$('.addChildren').click(function() {
  console.log("AJOAJSCNUEC ");
});
