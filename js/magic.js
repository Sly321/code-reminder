function addEvents() {
  $('.addChild:not([data-event-added])').attr("data-event-added", "1").click(function() {
    var element = this.parentElement.childNodes[0].textContent;
    $('#myModal').modal('show');
    $('#myModal > div > div > div').html("<input id='addingSubNode' type='text'></input>");
    $('#addingSubNode')[0].focus();
    document.getElementById("addingSubNode").focus();
    $('#addingSubNode').keyup(function(e){
        if(e.keyCode == 13)
        {
            addSubTreeTo(element);
            $('#myModal').modal('hide');
            clearTree();
            drawTree();
        }
    });
  });

  $('.openChildren:not([data-event-added])').attr("data-event-added", "1").click(function() {
    var element = this.parentElement.childNodes[0].textContent;
    var sel = getIdByName(element);
    console.log("OpenChildren " + element + sel);
    if(sel >= 0)
    {
      clearTree();
      drawChildrenOf(sel);
    }
  });
}

loadTree();
