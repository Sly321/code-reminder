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