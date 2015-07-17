/* Sub Tree */
$( "#addSubBtn").click(function() {
  addSubToTree($('#header').html());
});

$( '#addingSubNode' ).keyup(function(e) {
  $("#errorSubText").html("");
  if(e.keyCode == 13)
  {
    addSubToTree($('#header').html());
  }
});

$( "#backBtn" ).click(function() {
  clearTree();
  drawTree();
});

/* Root Tree */
$( "#addBtn").click(function() {
  addToTreeBtn()
});

$( "#removeBtn" ).click(function() {
  $('#modalNo').off("click");
  $('#modalYes').off("click");

  if(getSelectedId() >= 0)
  {
    $('#yesNoModal').modal().show();
    $('#yesNoModalBody').html("Delete " + getSelectedAsText() + "?");

    $('#modalYes').click(function() {
      removeFromTreeBtn();
      $('#yesNoModal').modal('hide');
    })
    $('#modalNo').click(function() {
      $('#yesNoModal').modal('hide');
    })
  }
});

$( '#addingText' ).keyup(function(e) {
  $("#errorText").html("");
  if(e.keyCode == 13)
  {
      addToTreeBtn();
  }
});

/* Modal */
$( "#editBtn" ).click(function() {
  $('#saveLanguageBtn').off('click');
  $('#cancelLanguageButton').off('click');
  $('#myModal').modal('show');
  var selected = getSelectedId();
  var innerHtmlVar = "<span class='lrounded'>Name</span><input class='rrounded' id='nameInput' type='text' value='" + languageTree[selected].name + "'/><br>";
  var innerHtmlVar2 = "";
  if(languageTree[selected].language != undefined)
  {
    innerHtmlVar2 +=  "<span class='lrounded'>Language</span><input class='rrounded' id='languageInput' type='text' value='" + languageTree[selected].language + "'/>";
  }
  else
  {
    innerHtmlVar2 += "<span class='lrounded'>Language</span><input class='rrounded' id='languageInput' type='text'/>";
  }
  $('#contentEditModalBody').html(innerHtmlVar);
  $('#contentEditModalBody2').html(innerHtmlVar2);

  $('#saveLanguageBtn').click(function() {
    languageTree[selected].name = $('#nameInput').val();
    languageTree[selected].language = $('#languageInput').val();
    $('#myModal').modal('hide');
    clearTree();
    drawTree();
    saveTree();
  });
  $('#cancelLanguageButton').click(function() {
    $('#myModal').modal('hide');
  })
});
