function SelectSelectableElement(selectableContainer, elementsToSelect) {
  // add unselecting class to all elements in the styleboard canvas except the ones to select
  $(".ui-selected", selectableContainer).not(elementsToSelect).removeClass("ui-selected").addClass("ui-unselecting");

  // add ui-selecting class to the elements to select
  $(elementsToSelect).not(".ui-selected").addClass("ui-selecting");

  // trigger the mouse stop event (this will select all .ui-selecting elements, and deselect all .ui-unselecting elements)
  $(".ui-unselecting", selectableContainer).not(elementsToSelect).removeClass("ui-unselecting");
  //selectableContainer.data("uiSelectable")._mouseStop(null);
  $(elementsToSelect).not(".ui-selected").removeClass("ui-selecting").addClass("ui-selected");

  document.activeElement.blur();
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

function isNoModalOpen() {
  return $('#aceModal').css("display") !== "block" && $('#yesNoModal').css("display") !== "block" && $('#preferencesModal').css("display") !== "block" && $('myModal').css('display') !== "block";
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
      if (isNoModalOpen() && !(document.activeElement == $('#addingSubNode')[0]) && $('#header').html() !== "Code Reminder") {
        event.preventDefault();
        $('#backBtn').trigger('click');
      } else if (document.activeElement == $('#addingText')[0] || document.activeElement == $('#addingSubNode')[0]) {

      } else {
        event.preventDefault();
      }
      break;
    case 13:
      if ($('#yesNoModal').css("display") === "block") {
        $('#modalYes').trigger("click");
      } else if ($('#preferencesModal').css("display") === "block") {
        $('#savePreferences').trigger("click");
      } else if ($('#myModal').css("display") === "block") {
        $('#saveLanguageBtn').trigger("click");
      } else if ($('#header').html() === "Code Reminder" && !(document.activeElement == $('#addingText')[0]) && isNoModalOpen()) {
        $('.ui-selected > .openChildren').trigger('click');
      } else if ($('#aceModal').css('display') === 'block') {
        //$('.ui-selected > .openChildren').trigger('click');
      } else if ($('#header').html() !== "Code Reminder" && !(document.activeElement == $('#addingSubNode')[0]) && isNoModalOpen()) {
        $('.ui-selected > .name').trigger("click");
      }
      break;
    case 46:
      if ($('#header').html() === "Code Reminder" && !(document.activeElement == $('#addingText')[0]) && isNoModalOpen()) {
        $('#removeBtn').trigger('click');
      } else if ($('#header').html() !== "Code Reminder" && !(document.activeElement == $('#addingSubNode')[0]) && isNoModalOpen()) {
        removeSubNode(getSelectedAsText());
      }
      break;
    case 38:
      if ($('#header').html() === "Code Reminder" && isNoModalOpen()) {
        if (languageTree.length !== 0) {
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
      } else if ($('#header').html() !== "Code Reminder" && isNoModalOpen()) {
        console.log("welcome");
        if (languageTree[getParentId()].children.length !== 0) {
          console.log("welcome2");
          if ($('.ui-selected > .name')[0] === undefined) {
            SelectSelectableElement($("#selectable"), $("li:last"));
          } else {
            var currId = getSelectedSubId();
            if (currId === 0) {
              console.log("welcome3" + currId);
              SelectSelectableElement($("#selectable"), $("li:last"));
            } else if (currId === languageTree[getParentId()].children.length - 1) {
              console.log("welcome4" + currId);
              SelectSelectableElement($("#selectable"), $("#selectable li:eq(" + parseInt(currId - 1) + ")"));
            } else {
              console.log("welcome5: " + currId);
              SelectSelectableElement($("#selectable"), $("#selectable li:eq(" + parseInt(currId - 1) + ")"));
            }
          }
        }
      }
      break;
    case 40:
      if ($('#header').html() === "Code Reminder" && isNoModalOpen()) {
        if (languageTree.length !== 0) {
          if ($('.ui-selected > .name')[0] === undefined) {
            SelectSelectableElement($("#selectable"), $("li:first"));
          } else {
            var currId = getSelectedId();
            if (currId === 0) {
              SelectSelectableElement($("#selectable"), $("#selectable li:eq(1)"));
            } else if (currId === languageTree.length - 1) {
              SelectSelectableElement($("#selectable"), $("li:first"));
            } else {
              SelectSelectableElement($("#selectable"), $("#selectable li:eq(" + parseInt(currId + 1) + ")"));
            }
          }
        }
      } else if ($('#header').html() !== "Code Reminder" && isNoModalOpen()) {
        if (languageTree[getParentId()].children.length !== 0) {
          if ($('.ui-selected > .name')[0] === undefined) {
            SelectSelectableElement($("#selectable"), $("li:first"));
          } else {
            var currId = getSelectedSubId();
            if (currId === 0) {
              SelectSelectableElement($("#selectable"), $("#selectable li:eq(1)"));
            } else if (currId === languageTree[getParentId()].children.length - 1) {
              SelectSelectableElement($("#selectable"), $("li:first"));
            } else {
              SelectSelectableElement($("#selectable"), $("#selectable li:eq(" + parseInt(currId + 1) + ")"));
            }
          }
        }
      }
      break;
    case 65:
      if ($('#header').html() === "Code Reminder" && !(document.activeElement == $('#addingText')[0]) && isNoModalOpen()) {
        event.preventDefault();
        $('#addingText').focus();
      } else if ($('#header').html() !== "Code Reminder" && !(document.activeElement == $('#addingSubNode')[0]) && isNoModalOpen()) {
        event.preventDefault();
        $('#addingSubNode').focus();
      }
      break;

    case 69:
      if ($('#header').html() === "Code Reminder" && !(document.activeElement == $('#addingText')[0]) && isNoModalOpen()) {
        $('#editBtn').trigger('click');
      } 
      break;
  }
});

loadTree();