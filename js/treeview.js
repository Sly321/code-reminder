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

var tree = [];

function saveTree() {
  if(!tree) {
    message("Error");
    return;
  }
  chrome.storage.local.set({'tree': tree}, function() {
    console.log("Tree is saved.");
  });
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key];
    console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
  }
});

var addToTree = function(object)
{
  tree.push(object);
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
    for(var key of tree) {
      if(key == text)
      {
        $("#addingText").val("");
        $("#errorText").html("Already exists");
        return;
      }
    }
    $("#addingText").val("");
    clearTree();
    addToTree([text]);
    drawTree();
    $("#errorText").html("");
    saveTree();
  }
}

var removeFromTree = function(object)
{
  console.log("Deleting " + object[0]);
  var rem = -1;
  for(var i= 0; i < tree.length; i++)
  {
    if(tree[i][0] == object[0])
    {
      rem = i;
    }
  }
  if(rem >= 0)
  {
    tree.splice(rem, 1);
  }
  else {
    console.log("Nothing there " + rem);
  }

}

var removeFromTreeBtn = function()
{
  var sel = $('.ui-selected > .name')[0].textContent;
  console.log("Deleting " + sel);
  removeFromTree([sel]);
  clearTree();
  drawTree();
  saveTree();
}

var drawTree = function()
{
  var ol = $("#selectable");
  for (var splice of tree) {
    ol.append("<li class='ui-widget-content'><span class='name'>" + splice + "</span><span>&gt;</span></li>");
  }
}

var clearTree = function()
{
  var ol = $("#selectable");
  ol.html("");
}

function loadTree() {
    chrome.storage.local.get('tree', function (result) {
        tree = result.tree;
    });
}

loadTree();
drawTree();
