var languageTree = [];

$(function() {
  $(".objects-elements").accordion();
});

$(function() {
  $("#selectable").selectable({
    stop: function() {
      var result = $("#select-result").empty();
      $(".ui-selected", this).each(function() {

      });
    }
  });
});

function saveTree() {
  if (!languageTree) {
    message("Error");
    return;
  }
  chrome.storage.sync.set({
    'languageTree': languageTree
  }, function() {
    console.log("Treeview is saved.");
  });
}

var addToTree = function(object) {
  languageTree.push(object);
};

var addToTreeBtn = function() {
  var text = $("#addingText").val();
  if (text === "") {
    console.log("Nothing in there");
    $("#errorText").html("Nothing to Add");
  } else if (text.length > 20) {
    console.log("To much in there");
    $("#addingText").val("");
    $("#errorText").html("To many chars");
  } else {
    for (var key of languageTree) {
      if (key.name === text) {
        $("#addingText").val("");
        $("#errorText").html("Already exists");
        return;
      }
    }
    $("#addingText").val("");
    clearTree();
    addToTree({
      'name': text
    });
    drawTree();
    $("#errorText").html("");
    saveTree();
  }
};

var removeFromTree = function(object) {
  console.log("Deleting " + object[0]);
  var rem = -1;
  for (var i = 0; i < languageTree.length; i++) {
    if (languageTree[i].name == object) {
      rem = i;
    }
  }
  if (rem >= 0) {
    languageTree.splice(rem, 1);
  } else {
    console.log("Nothing there " + rem);
  }
};

var removeFromTreeBtn = function() {
  var sel = $('.ui-selected > .name')[0].textContent;
  console.log("Deleting " + sel);
  removeFromTree(sel);
  clearTree();
  drawTree();
  saveTree();
};

var removeSubFromTree = function(name) {
  var parent = $('#header').html();
  var parent_id = getIdByName(parent);
  for (var i = 0; i < languageTree[parent_id].children.length; i++) {
    if (name == languageTree[parent_id].children[i].name) {
      languageTree[parent_id].children.splice(i, 1);
    }
  }
  clearTree();
  drawChildrenOf(parent_id);
  saveTree();
};

var drawChildrenOf = function(id) {
  var ol = $("#selectable");
  var li = "";
  if (languageTree[id].children === undefined) {
    // draw no children if have no children
  } else {
    for (var splice of languageTree[id].children) {
      li += "<li class='std-ui ui-widget-content'>";
      li += "<button class='snippet name std-ui-btn rounded glow-blue'>" + splice.name + "</button>";
      li += "</li>";
    }
  }

  $('.rootInput').hide();
  $('.snippetInput').show();
  $('#header').html(languageTree[id].name);
  ol.append(li);
  addSnippetEvent();
};

var drawTree = function() {
  var ol = $("#selectable");
  var li = "";
  for (var splice of languageTree) {
    li += "<li class='std-ui ui-widget-content'><span class='std-ui-btn-left name'>" + splice.name + "</span>";
    li += "<button class='std-ui-btn-right glow-blue openChildren'>&#8594;</button>";
    li += "</li>";
  }
  $('.rootInput').show();
  $('.snippetInput').hide();
  $('#header').html("Code Reminder");
  ol.append(li);
  addEvents();
};

var addSubToTree = function(toObj) {
  var node = $("#addingSubNode").val();
  console.log("node " + node);
  var object = {
    'name': node,
    'snippet': ""
  };
  if (node === "") {
    $("#errorSubText").html("Nothing to Add");
  } else {
    for (var i = 0; i < languageTree.length; i++) {
      if (languageTree[i].name == toObj) {
        if (languageTree[i].children !== undefined) {
          for (var nodes of languageTree[i].children) {
            if (nodes.name === object.name) {
              $("#errorSubText").html("Already exists.");
              $("#addingSubNode").val("");
              return;
            }
          }
          languageTree[i].children.push(object);
          clearTree();
          drawChildrenOf(getIdByName(toObj));
          $("#addingSubNode").val("");
          saveTree();
        } else {
          languageTree[i].children = [object];
          clearTree();
          drawChildrenOf(getIdByName(toObj));
          $("#addingSubNode").val("");
          saveTree();
        }
      }
    }
  }
};

var getParentLanguage = function() {
  var name = $('#header').html();
  for (var i = 0; i < languageTree.length; i++) {
    if (languageTree[i].name == name) {
      return languageTree[i].language;
    }
  }
  return -1;
};

var getParentId = function() {
  var name = $('#header').html();
  for (var i = 0; i < languageTree.length; i++) {
    if (languageTree[i].name == name) {
      return i;
    }
  }
  return -1;
};

var getSelectedAsText = function() {
  if ($('.ui-selected > .name')[0] !== undefined) {
    var sel = $('.ui-selected > .name')[0].textContent;
    return sel;
  } else {
    return -1;
  }
};

var getSelectedId = function() {
  var sel = getSelectedAsText();
  var id = -1;
  for (var i = 0; i < languageTree.length; i++) {
    if (languageTree[i].name == sel) {
      id = i;
      return id;
    }
  }
  return id;
};

var getSelectedSubId = function() {
  var sel = getSelectedAsText();
  var id = -1;
  for (var i = 0; i < languageTree[getParentId()].children.length; i++) {
    if (languageTree[getParentId()].children[i].name == sel) {
      id = i;
      return id;
    }
  }
  return id;
}

var getIdByName = function(name) {
  var id = -1;
  for (var i = 0; i < languageTree.length; i++) {
    if (languageTree[i].name == name) {
      id = i;
    }
  }
  return id;
};

var getSubIdByName = function(name) {
  var id = getIdByName($('#header').html());
  for (var i = 0; i < languageTree[id].children.length; i++) {
    if (name == languageTree[id].children[i].name) {
      return i;
    }
  }
  return -1;
};

var clearTree = function() {
  var ol = $("#selectable");
  ol.html("");
};

/* Problem with initial start - Object will be undefined and extension crashes. */
function loadTree() {
  chrome.storage.sync.get('languageTree', function(result) {
    if (result.languageTree !== undefined) {
      languageTree = result.languageTree;
      drawTree();
    } else {
      $('.rootInput').show();
      $('.snippetInput').hide();
      $('#header').html("Code Reminder");
      console.log("INFO: Can't load from Sync because there is no Date (initial opening)");
    }
  });
}

var sort_by = function(field, reverse, primer) {

  var key = primer ?
    function(x) {
      return primer(x[field]);
    } :
    function(x) {
      return x[field];
    };

  reverse = !reverse ? 1 : -1;

  return function(a, b) {
    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
  };
};

var sortSubTreeAlpha = function() {
  languageTree[getParentId()].children.sort(sort_by("name", false, function(a) {
    return a.toUpperCase();
  }));
  clearTree();
  drawChildrenOf(getParentId());
  saveTree();
};

var sortTreeAlpha = function() {
  languageTree.sort(sort_by("name", false, function(a) {
    return a.toUpperCase();
  }));
  clearTree();
  drawTree();
  saveTree();
};

var sortSubTreeAlphaRev = function() {
  languageTree[getParentId()].children.sort(sort_by("name", true, function(a) {
    return a.toUpperCase();
  }));
  clearTree();
  drawChildrenOf(getParentId());
  saveTree();
};

var sortTreeAlphaRev = function() {
  languageTree.sort(sort_by("name", true, function(a) {
    return a.toUpperCase();
  }));
  clearTree();
  drawTree();
  saveTree();
};