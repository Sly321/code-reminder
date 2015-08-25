function SelectSelectableElement(selectableContainer, elementsToSelect) {
  // add unselecting class to all elements in the styleboard canvas except the ones to select
  $(".ui-selected", selectableContainer).not(elementsToSelect).removeClass("ui-selected").addClass("ui-unselecting");

  // add ui-selecting class to the elements to select
  $(elementsToSelect).not(".ui-selected").addClass("ui-selecting");

  // trigger the mouse stop event (this will select all .ui-selecting elements, and deselect all .ui-unselecting elements)
  $(".ui-unselecting", selectableContainer).not(elementsToSelect).removeClass("ui-unselecting");
  //selectableContainer.data("uiSelectable")._mouseStop(null);
  $(elementsToSelect).not(".ui-selected").removeClass("ui-selecting").addClass("ui-selected");
}

function addEvents() {
  $('.addChild:not([data-event-added])').attr("data-event-added", "1").click(function() {
    var element = this.parentElement.childNodes[0].textContent;
    $('#myModal').modal('show');
    $('#myModal > div > div > div').html("<input id='addingSubNode' type='text'></input>");
    $('#addingSubNode')[0].focus();
    document.getElementById("addingSubNode").focus();
    $('#addingSubNode').keyup(function(e) {
      if (e.keyCode == 13) {
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
    if (sel >= 0) {
      clearTree();
      drawChildrenOf(sel);
    }
  });
}

$(window).bind('keydown', function(event) {
  console.log(event.which);
  if (event.ctrlKey || event.metaKey) {
    switch (String.fromCharCode(event.which).toLowerCase()) {
      case 's':
        event.preventDefault();
        if ($('#aceModal').css("display") == "block") {
          $("#aceSaveBtn").trigger("click");
        } else if ($('#myModal').css("display") == "block") {
          $('#saveLanguageBtn').trigger("click");
        }
        break;
    }
  }
  switch (event.which) {
    case 27:
      event.preventDefault();
      if ($('#aceModal').css("display") === "block") {
        $("#aceCancelBtn").trigger("click");
      } else if ($('#myModal').css("display") === "block") {
        $('#cancelLanguageButton').trigger("click");
      } else if ($('#preferencesModal').css("display") === "block") {
        $('#cancelPreferences').trigger("click");
      } else if ($('#yesNoModal').css("display") === "block") {
        $('#modalNo').trigger("click");
      }
      break;
    case 8:
      if ($('#aceModal').css("display") !== "block" && $('#preferencesModal').css("display") !== "block" && $('#header').html() !== "Code Reminder") {
        $('#backBtn').trigger('click');
      }
      break;
    case 13:
      if ($('#yesNoModal').css("display") === "block") {
        $('#modalYes').trigger("click");
      } else if ($('#preferencesModal').css("display") === "block") {
        $('#savePreferences').trigger("click");
      } else if ($('#header').html() === "Code Reminder") {
        $('.ui-selected > .openChildren').trigger('click');
      }
      break;
    case 46:
      if ($('#header').html() === "Code Reminder") {
        $('#removeBtn').trigger('click');
      }
      break;
    case 38:
      if ($('#header').html() === "Code Reminder") {
        if (languageTree.length != 0) {
          if ($('.ui-selected > .name')[0] === undefined) {
            SelectSelectableElement($("#selectable"), $("li:last"));
          } else {
            var currId = getSelectedId();
            if (currId === 0) {
              SelectSelectableElement($("#selectable"), $("li:last"));
            } else if (currId === languageTree.length - 1) {
              SelectSelectableElement($("#selectable"), $("#selectable li:eq(" + parseInt(currId - 1) + ")"));
            } else {
              SelectSelectableElement($("#selectable"), $("#selectable li:eq(" + parseInt(currId - 1) + ")"));
            }
          }
        }
      }
      break;
    case 40:
      if ($('#header').html() === "Code Reminder") {
        if (languageTree.length != 0) {
          if ($('.ui-selected > .name')[0] === undefined) {
            SelectSelectableElement($("#selectable"), $("li:first"));
            console.log("1");
          } else {
            var currId = getSelectedId();
            if (currId === 0) {
              console.log("2");
              SelectSelectableElement($("#selectable"), $("#selectable li:eq(1)"));
            } else if (currId === languageTree.length - 1) {
              SelectSelectableElement($("#selectable"), $("li:first"));
              console.log("3");
            } else {
              console.log("4");
              SelectSelectableElement($("#selectable"), $("#selectable li:eq(" + parseInt(currId + 1) + ")"));
            }
          }
        }
      }
      break;
  }
});

loadTree();