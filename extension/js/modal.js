var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
var options = {
  'linenumbers': true
};

function addSnippetEvent() {
  $('.snippet:not([data-event-added])').attr("data-event-added", "1").click(function() {
    $( "#removeSubBtn" ).off("click");
    $( "#aceSaveBtn" ).off("click");
    var parent = $('#header').html();
    var element = this.parentElement.childNodes[0].textContent;
    var subId = getSubIdByName(element);
    var parId = getIdByName(parent);
    if(languageTree[parId].children[subId].snippet != undefined) {
      if(languageTree[parId].children[subId].snippet == "")
      {
        editor.setValue("");
      } else {
        editor.setValue(languageTree[parId].children[subId].snippet);
      }

    } else {
      editor.setValue("");
    }
    $('#aceModal').modal('show');
    if(getParentLanguage() != undefined)
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

$('#aceOptions').click(function()
{
  $('#aceOptionsSave').off("click");
  $('#aceOptionsCancel').off("click");
  $('#aceOptionsModal').modal('show');

  $('#widthInput').val($("body").width() + 20);
  $('#heightInput').val($("body").height() + 20);
  $('#widthInput').tooltip({'trigger':'focus', 'title': 'Minimum 300 maximum 800'});
  $('#heightInput').tooltip({'trigger':'focus', 'title': 'Minimum 480 maximum 600'});

  $('#aceOptionsSave').click(function()
  {
    if($('#lineNumbersSel').find("option:selected").text() === "Yes")
    {
      options.linenumbers = true;
    }
    else
    {
      options.linenumbers = false;
    }
    var width = parseInt($('#widthInput').val());
    if(Number.isInteger(width) && width >= 300 && width <= 800)
    {
      options.width = width;
    } else {
      $('#widthInput').val(options.width);
    }

    var height = parseInt($('#heightInput').val());
    if(Number.isInteger(height) && height >= 480 && height <= 600)
    {
      options.height = height;
    } else {
      $('#heightInput').val(options.height);
    }

    $('#aceOptionsModal').modal('hide');
    saveOptions();
    setOptions();
  });

  $('#aceOptionsCancel').click(function()
  {
    $('#cbLineNumbers').prop('checked', options.linenumbers);
    $('#aceOptionsModal').modal('hide');
  });
});

function saveOptions()
{
  chrome.storage.sync.set({'aceOptions': options}, function() {
    console.log("Treeview is saved.");
  });
}

function loadOptions()
{
  chrome.storage.sync.get('aceOptions', function (result) {
    if(result.aceOptions == undefined)
    {
      saveOptions();
    }
    else
    {
      options = result.aceOptions;
    }
    setOptions();
  });
}

function setOptions()
{
  if(options.linenumbers)
  {
    editor.renderer.setShowGutter(true);
    $('#cbLineNumbers').prop('checked', true);
  }
  else {
    editor.renderer.setShowGutter(false);
    $('#cbLineNumbers').prop('checked', false);
  }

  if(options.width === undefined || options.width === 0)
  {
    options.width = 300;
  }

  if(options.height === undefined || options.height === 0)
  {
    options.height = 500;
  }
  $("body").height(options.height - 20);
  $("body").width(options.width - 20);
}

loadOptions();
