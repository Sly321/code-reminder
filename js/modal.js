var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");

function addSnippetEvent() {
  $('.snippet:not([data-event-added])').attr("data-event-added", "1").click(function() {
    $( "#removeSubBtn" ).off("click");
    $( "#aceSaveBtn" ).off("click");
    var parent = $('#header').html();
    var element = this.parentElement.childNodes[0].textContent;
    var subId = getSubIdByName(element);
    var parId = getIdByName(parent);
    if(languageTree[parId].children[subId].snippet != undefined) {
      editor.setValue(languageTree[parId].children[subId].snippet);
    } else {
      editor.setValue("");
    }

    console.log("element: " + element);
    $('#aceModal').modal('show');
    if(getParentLanguage().length > 0)
    {
        editor.getSession().setMode("ace/mode/" + getParentLanguage());
    }

    $( "#removeSubBtn" ).click(function() {
      $('#modalNo').off("click");
      $('#modalYes').off("click");
      $('#yesNoModal').modal().show();
      $('#yesNoModalBody').html("Delete " + element + "?");

      $('#modalYes').click(function() {
        removeSubFromTree(element);
        $('#yesNoModal').modal('hide');
        $('#aceModal').modal('hide');
      });
      $('#modalNo').click(function() {
        $('#yesNoModal').modal('hide');
      });
    });

    $( "#aceSaveBtn" ).click(function() {
      languageTree[parId].children[subId].snippet = editor.getValue();
      saveTree();
      $('#aceModal').modal('hide');
    });
  });
}

$('#aceCancelBtn').click(function()
{
  $('#aceModal').modal('hide');
});
