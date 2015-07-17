//setTimeout(function(){ drawTree() }, 200);
//drawTree();
$( "#addBtn").click(function() { addToTreeBtn() });
$( "#removeBtn" ).click(function() {removeFromTreeBtn();});
$( "#backBtn" ).click(function() {
  clearTree();
  drawTree();
});
$( '#addingText' ).keyup(function(e) {
    if(e.keyCode == 13)
    {
        addToTreeBtn();
    }
});

$( "#editBtn" ).click(function() {
  $('#myModal').modal('show');
  var selected = getSelectedId();

  var innerHtmlVar = "Name: <input type='text' value='" + languageTree[selected].name + "'/><br>";
  if(languageTree[selected].language != undefined)
  {
    innerHtmlVar +=  "Language: <input type='text' value='" + languageTree[selected].language + "'/><br>";
  }
  else
  {
    innerHtmlVar +=  "Language: <input type='text'/><br>";
  }
  if(languageTree[selected].children != undefined)
  {
    for (var child of languageTree[selected].children)
    {
      innerHtmlVar +=  "Child: <input type='text' value='" + child + "'/><br>";
    }
  }

  $('#myModal > div > div > div').html(innerHtmlVar);
});

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

var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");

function addSnippetEvent() {
  $('.snippet:not([data-event-added])').attr("data-event-added", "1").click(function() {
    var parent = $('#header').html();
    var element = this.parentElement.childNodes[0].textContent;
    console.log("test");
    $('#aceModal').modal('show');
    editor.getSession().setMode("ace/mode/javascript");
  });
}

loadTree();
