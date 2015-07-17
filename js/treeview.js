var cplusplus = [
  {
    'name': "for",
    'snippet': "abcdefg"
  }
];

var languageTree = [
];

$(function()
{
  $( ".objects-elements" ).accordion();
});

$(function()
{
  $( "#selectable" ).selectable({
    stop: function() {
    	var result = $( "#select-result" ).empty();
		$( ".ui-selected", this ).each(function() {

		});
    }
  });
});

function saveTree() {
  if(!languageTree) {
    message("Error");
    return;
  }
  chrome.storage.sync.set({'languageTree': languageTree}, function() {
    console.log("Treeview is saved.");
  });
}

var addToTree = function(object)
{
  languageTree.push(object);
}

var addToTreeBtn = function()
{
  var text = $("#addingText").val();
  if(text == "")
  {
    console.log("Nothing in there");
    $("#errorText").html("Nothing to Add");
  }
  else if(text.length > 20)
  {
    console.log("To much in there");
    $("#addingText").val("");
    $("#errorText").html("To many chars");
  }
  else
  {
    for(var key of languageTree) {
      if(key == text)
      {
        $("#addingText").val("");
        $("#errorText").html("Already exists");
        return;
      }
    }
    $("#addingText").val("");
    clearTree();
    addToTree({ 'name': text });
    drawTree();
    $("#errorText").html("");
    saveTree();
  }
}

var removeFromTree = function(object)
{
  console.log("Deleting " + object[0]);
  var rem = -1;
  for(var i= 0; i < languageTree.length; i++)
  {
    if(languageTree[i].name == object)
    {
      rem = i;
    }
  }
  if(rem >= 0)
  {
    languageTree.splice(rem, 1);
  }
  else {
    console.log("Nothing there " + rem);
  }

}

var removeFromTreeBtn = function()
{
  var sel = $('.ui-selected > .name')[0].textContent;
  console.log("Deleting " + sel);
  removeFromTree(sel);
  clearTree();
  drawTree();
  saveTree();
}

var drawChildrenOf = function(id)
{
  var ol = $("#selectable");
  var li = "";
  for (var splice of languageTree[id].children)
  {
    li += "<li class='ui-widget-content'>";
    li += "<button class='snippet name rounded'>" + splice.name + "</button>";
    li += "</li>";
  }
  $('.rootInput').hide();
  $('.snippetInput').show();
  $('#header').html(languageTree[id].name);
  ol.append(li);
  addSnippetEvent();
}

var drawTree = function()
{
  var ol = $("#selectable");
  var li = "";
  for (var splice of languageTree)
  {
    li += "<li class='ui-widget-content'><span class='name'>" + splice.name + "</span>";
    if(splice.children != undefined)
    {
      li += "<button class='openChildren'>&gt;</button>";
    }
    else
    {
      li += "<button class='addChild'>+</button>";
    }
    li += "</li>";
  }
  $('.rootInput').show();
  $('.snippetInput').hide();
  $('#header').html("Code Reminder");
  ol.append(li);
  addEvents();
}

var addSubTreeTo = function(toObj)
{
  var node = $("#addingSubNode").val();
  var object = { 'name': node, 'snippet': "" };
  for(var i= 0; i < languageTree.length; i++)
  {
    if(languageTree[i].name == toObj)
    {
      if(languageTree[i].children != undefined)
      {
        languageTree[i].children.push(object);
      }
      else
      {
        languageTree[i].children = [object];
      }
    }
  }
}

var getSelectedAsText = function()
{
  var sel = $('.ui-selected > .name')[0].textContent;
  return sel;
}

var getSelectedId = function()
{
  var sel = getSelectedAsText();
  var id = -1;
  for(var i= 0; i < languageTree.length; i++)
  {
    if(languageTree[i].name == sel)
    {
      id = i;
    }
  }
  return id;
}

var getIdByName = function(name)
{
  var id = -1;
  for(var i= 0; i < languageTree.length; i++)
  {
    if(languageTree[i].name == name)
    {
      id = i;
    }
  }
  return id;
}

var clearTree = function()
{
  var ol = $("#selectable");
  ol.html("");
}

/* Problem with initial start - Object will be undefined and extension crashes. */
function loadTree() {
    chrome.storage.sync.get('languageTree', function (result) {
      if(result.languageTree != undefined)
      {
        languageTree = result.languageTree;
        drawTree();
      }
      else
      {
        console.log("INFO: Can't load from Sync because there is no Date (initial opening)");
      }
    });
}

//loadTree();
