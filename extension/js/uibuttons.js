/* Sub Tree */
$("#addSubBtn").click(function() {
  addSubToTree($('#header').html());
});

$("#sortAToZ").click(function() {
  sortTreeAlpha();
});

$("#sortSubAToZ").click(function() {
  sortSubTreeAlpha();
});

$("#sortZToA").click(function() {
  sortTreeAlphaRev();
});

$("#sortSubZToA").click(function() {
  sortSubTreeAlphaRev();
});

$('#addingSubNode').keyup(function(e) {
  $("#errorSubText").html("");
  if (e.keyCode == 13) {
    addSubToTree($('#header').html());
  }
});

$("#backBtn").click(function() {
  clearTree();
  drawTree();
});

/* Root Tree */
$("#addBtn").click(function() {
  addToTreeBtn();
});

$("#removeBtn").click(function() {
  $('#modalNo').off("click");
  $('#modalYes').off("click");

  if (preferences.askbeforremove === true) {
    if (getSelectedId() >= 0) {
      $('#yesNoModal').modal('show');
      $('#yesNoModalBody').html("Delete " + getSelectedAsText() + "?");

      $('#modalYes').click(function() {
        removeFromTreeBtn();
        $('#yesNoModal').modal('hide');
      });
      $('#modalNo').click(function() {
        $('#yesNoModal').modal('hide');
      });
    }
  } else {
    removeFromTreeBtn();
  }


});

$('#addingText').keyup(function(e) {
  $("#errorText").html("");
  if (e.keyCode == 13) {
    addToTreeBtn();
  }
});

/* EDIT LANGUAGE MODAL */
$("#editBtn").click(function() {
  $('#saveLanguageBtn').off('click');
  $('#cancelLanguageButton').off('click');
  $('#nameInput').off('keyup');
  $('#languageInput').off('keyup');

  var selected = getSelectedId();
  if (selected === -1)
    return;

  $('#myModal').modal('show');

  var innerHtmlVar = "<span class='lrounded'>Name</span><input class='rrounded' id='nameInput' type='text' value='" + languageTree[selected].name + "'/><br>";
  var innerHtmlVar2 = "";
  innerHtmlVar2 += "<span class='lrounded'>Language</span><select id='languageSelector' class='std-ui-right-selector'><option value='none'>None</option><option value='abap'>ABAP</option><option value='abc'>ABC</option><option value='actionscript'>ActionScript</option><option value='ada'>ADA</option><option value='apache_conf'>Apache Conf</option><option value='asciidoc'>AsciiDoc</option><option value='assembly_x86'>Assembly x86</option><option value='autohotkey'>AutoHotKey</option><option value='batchfile'>BatchFile</option><option value='c_cpp'>C and C++</option><option value='c9search'>C9Search</option><option value='cirru'>Cirru</option><option value='clojure'>Clojure</option><option value='cobol'>Cobol</option><option value='coffee'>CoffeeScript</option><option value='coldfusion'>ColdFusion</option><option value='csharp'>C#</option><option value='css'>CSS</option><option value='curly'>Curly</option><option value='d'>D</option><option value='dart'>Dart</option><option value='diff'>Diff</option><option value='dockerfile'>Dockerfile</option><option value='dot'>Dot</option><option value='dummy'>Dummy</option><option value='dummysyntax'>DummySyntax</option><option value='eiffel'>Eiffel</option><option value='ejs'>EJS</option><option value='elixir'>Elixir</option><option value='elm'>Elm</option><option value='erlang'>Erlang</option><option value='forth'>Forth</option><option value='ftl'>FreeMarker</option><option value='gcode'>Gcode</option><option value='gherkin'>Gherkin</option><option value='gitignore'>Gitignore</option><option value='glsl'>Glsl</option><option value='golang'>Go</option><option value='groovy'>Groovy</option><option value='haml'>HAML</option><option value='handlebars'>Handlebars</option><option value='haskell'>Haskell</option><option value='haxe'>haXe</option><option value='html'>HTML</option><option value='html_ruby'>HTML (Ruby)</option><option value='ini'>INI</option><option value='io'>Io</option><option value='jack'>Jack</option><option value='jade'>Jade</option><option value='java'>Java</option><option value='javascript'>JavaScript</option><option value='json'>JSON</option><option value='jsoniq'>JSONiq</option><option value='jsp'>JSP</option><option value='jsx'>JSX</option><option value='julia'>Julia</option><option value='latex'>LaTeX</option><option value='lean'>Lean</option><option value='less'>LESS</option><option value='liquid'>Liquid</option><option value='lisp'>Lisp</option><option value='livescript'>LiveScript</option><option value='logiql'>LogiQL</option><option value='lsl'>LSL</option><option value='lua'>Lua</option><option value='luapage'>LuaPage</option><option value='lucene'>Lucene</option><option value='makefile'>Makefile</option><option value='markdown'>Markdown</option><option value='mask'>Mask</option><option value='matlab'>MATLAB</option><option value='maze'>Maze</option><option value='mel'>MEL</option><option value='mushcode'>MUSHCode</option><option value='mysql'>MySQL</option><option value='nix'>Nix</option><option value='objectivec'>Objective-C</option><option value='ocaml'>OCaml</option><option value='pascal'>Pascal</option><option value='perl'>Perl</option><option value='pgsql'>pgSQL</option><option value='php'>PHP</option><option value='powershell'>Powershell</option><option value='praat'>Praat</option><option value='prolog'>Prolog</option><option value='properties'>Properties</option><option value='protobuf'>Protobuf</option><option value='python'>Python</option><option value='r'>R</option><option value='rdoc'>RDoc</option><option value='rhtml'>RHTML</option><option value='ruby'>Ruby</option><option value='rust'>Rust</option><option value='sass'>SASS</option><option value='scad'>SCAD</option><option value='scala'>Scala</option><option value='scheme'>Scheme</option><option value='scss'>SCSS</option><option value='sh'>SH</option><option value='sjs'>SJS</option><option value='smarty'>Smarty</option><option value='snippets'>snippets</option><option value='soy_template'>Soy Template</option><option value='space'>Space</option><option value='sql'>SQL</option><option value='sqlserver'>SQLServer</option><option value='stylus'>Stylus</option><option value='svg'>SVG</option><option value='tcl'>Tcl</option><option value='tex'>Tex</option><option value='text'>Text</option><option value='textile'>Textile</option><option value='toml'>Toml</option><option value='twig'>Twig</option><option value='typescript'>Typescript</option><option value='vala'>Vala</option><option value='vbscript'>VBScript</option><option value='velocity'>Velocity</option><option value='verilog'>Verilog</option><option value='vhdl'>VHDL</option><option value='xml'>XML</option><option value='xquery'>XQuery</option><option value='yaml'>YAML</option><option value='django'>Django</option></select>";

  $('#contentEditModalBody').html(innerHtmlVar);
  $('#contentEditModalBody2').html(innerHtmlVar2);

  if (languageTree[selected].language !== undefined) {
    var sel = document.getElementById("languageSelector");
    for (var i = 0; i < 125; i++) {
      if (sel.children[i].getAttributeNode("value").nodeValue === languageTree[selected].language) {
        document.getElementById("languageSelector").selectedIndex = i;
      }
    }
  }

  $('#nameInput').keyup(function(e) {
    if (e.keyCode == 13) {
      $('#saveLanguageBtn').trigger("click");
    }
  });

  $('#languageInput').keyup(function(e) {
    if (e.keyCode == 13) {
      $('#saveLanguageBtn').trigger("click");
    }
  });

  $('#saveLanguageBtn').click(function() {
    languageTree[selected].name = $('#nameInput').val();
    languageTree[selected].language = $("#languageSelector").find("option:selected").attr("value");
    $('#myModal').modal('hide');
    clearTree();
    drawTree();
    saveTree();
  });

  $('#cancelLanguageButton').click(function() {
    $('#myModal').modal('hide');
  });

  $('#languageSelector').change(function() {
    var selectedText = $(this).find("option:selected").attr("value");
    console.log(selectedText);
  });
});