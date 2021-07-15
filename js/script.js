$(document).ready(function(){
         // There's the gallery and the trash
    var $gallery = $( "#gallery" ),
    $trash = $( "#trash" );

  // Let the gallery items be draggable
  $( "li", $gallery ).draggable({
    cancel: "a.ui-icon", // clicking an icon won't initiate dragging
    revert: "invalid", // when not dropped, the item will revert back to its initial position
    containment: "document",
    helper: "clone",
    cursor: "move"
  });

  // Let the trash be droppable, accepting the gallery items
  $trash.droppable({
    accept: "#gallery > li",
    classes: {
      "ui-droppable-active": "ui-state-highlight"
    },
    drop: function( event, ui ) {
      deleteImage( ui.draggable );
    }
  });

  // Let the gallery be droppable as well, accepting items from the trash
  $gallery.droppable({
    accept: "#trash li",
    classes: {
      "ui-droppable-active": "custom-state-active"
    },
    drop: function( event, ui ) {
      recycleImage( ui.draggable );
    }
  });

  // Image deletion function
  var recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Recycle this image' class='ui-icon ui-icon-refresh'>Recycle image</a>";
  function deleteImage( $item ) {
    $item.fadeOut(function() {
      var $list = $( "ul", $trash ).length ?
        $( "ul", $trash ) :
        $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $trash );

      $item.find( "a.ui-icon-trash" ).remove();
      $item.append( recycle_icon ).appendTo( $list ).fadeIn(function() {
        $item
          .animate({ width: "180px" })
          .find( "img" )
            .animate({ height: "auto" });
      });
    });
  }

  // Image recycle function
  var trash_icon = "<a href='link/to/trash/script/when/we/have/js/off' title='Delete this image' class='ui-icon ui-icon-trash'>Delete image</a>";
  function recycleImage( $item ) {
    $item.fadeOut(function() {
      $item
        .find( "a.ui-icon-refresh" )
          .remove()
        .end()
        .css( "width", "180px")
        .append( trash_icon )
        .find( "img" )
          .css( "height", "auto" )
        .end()
        .appendTo( $gallery )
        .fadeIn();
    });
  }

  // Image preview function, demonstrating the ui.dialog used as a modal window
  function viewLargerImage( $link ) {
    var src = $link.attr( "href" ),
      title = $link.siblings( "img" ).attr( "alt" ),
      $modal = $( "img[src$='" + src + "']" );

    if ( $modal.length ) {
      $modal.dialog( "open" );
    } else {
      var img = $( "<img alt='" + title + "' width='384' height='288' style='display: none; padding: 8px;' />" )
        .attr( "src", src ).appendTo( "body" );
      setTimeout(function() {
        img.dialog({
          title: title,
          width: 400,
          modal: true
        });
      }, 1 );
    }
  }

  // Resolve the icons behavior with event delegation
  $( "ul.gallery > li" ).on( "click", function( event ) {
    var $item = $( this ),
      $target = $( event.target );

    if ( $target.is( "a.ui-icon-trash" ) ) {
      deleteImage( $item );
    } else if ( $target.is( "a.ui-icon-zoomin" ) ) {
      viewLargerImage( $target );
    } else if ( $target.is( "a.ui-icon-refresh" ) ) {
      recycleImage( $item );
    }

    return false;
  });

    // Draggable
    $( "#draggable" ).draggable({ scroll: true });
    $( "#draggable2" ).draggable({ scroll: true, scrollSensitivity: 100 });
    $( "#draggable3" ).draggable({ scroll: true, scrollSpeed: 100 });

    // Resizable
    $( "#resizable" ).resizable({
        animate: true
      });

    // Selectable
    $( "#selectable" ).selectable({
        stop: function() {
          var result = $( "#select-result" ).empty();
          $( ".ui-selected", this ).each(function() {
            var index = $( "#selectable li" ).index( this );
            result.append( " #" + ( index + 1 ) );
          });
        }
    });

    // Shortable
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();

    // Accordion
    $( "#accordion" )
    .accordion({
      header: "> div > h3"
    })
    .sortable({
      axis: "y",
      handle: "h3",
      stop: function( event, ui ) {
        // IE doesn't register the blur when sorting
        // so trigger focusout handlers to remove .ui-state-focus
        ui.item.children( "h3" ).triggerHandler( "focusout" );

        // Refresh accordion to handle new order
        $( this ).accordion( "refresh" );
      }
    });

    // Autocomplete
    var availableTags = [
      "BMW",
      "AUDI",
      "Toyota",
      "Suzuki",
      "Honda",
      "Mercedes",
      "Tata",
      "Volkswagen",
      "Porsche",
      "Volvo",
      "Tesla",
      "Subaru",
      "Rolls-Royce",
      "Mitsubishi",
      "Nissan",
      "Maserati",
      "Mazda",
      "McLaren",
      "Land Rover",
      "Lexus",
      "Lamborghini",
      "Jeep",
      "Kia",
      "Hyundai",
      "Jaguar",
      "Ford",
      "Ferrari",
      "Fiat"
    ];
    $( "#tags" ).autocomplete({
      source: availableTags
    });

    // Checkboxradio
    $( "input" ).checkboxradio({
      icon: false
    });

    // Datepicker
    var state = true;
    $( "#button" ).on( "click", function() {
      if ( state ) {
        $( "#effect" ).animate({
          backgroundColor: "#aa0000",
          color: "#fff",
          width: 500
        }, 1000 );
      } else {
        $( "#effect" ).animate({
          backgroundColor: "#fff",
          color: "#000",
          width: 240
        }, 1000 );
      }
      state = !state;
    });


  // Tooltip
  var tooltips = $( "[title]" ).tooltip({
    position: {
      my: "left top",
      at: "right+5 top-5",
      collision: "none"
    }
  });
  $( "<button>" )
    .text( "Show help" )
    .button()
    .on( "click", function() {
      tooltips.tooltip( "open" );
    })
    .insertAfter( "form" );


    // Tabs
    $( "#tabs" ).tabs();

    // 
    $( "#currency" ).on( "change", function() {
      $( "#spinner" ).spinner( "option", "culture", $( this ).val() );
    });
 
    $( "#spinner" ).spinner({
      min: 5,
      max: 2500,
      step: 25,
      start: 1000,
      numberFormat: "C"
    });


    // Colorpicker
    function hexFromRGB(r, g, b) {
      var hex = [
        r.toString( 16 ),
        g.toString( 16 ),
        b.toString( 16 )
      ];
      $.each( hex, function( nr, val ) {
        if ( val.length === 1 ) {
          hex[ nr ] = "0" + val;
        }
      });
      return hex.join( "" ).toUpperCase();
    }
    function refreshSwatch() {
      var red = $( "#red" ).slider( "value" ),
        green = $( "#green" ).slider( "value" ),
        blue = $( "#blue" ).slider( "value" ),
        hex = hexFromRGB( red, green, blue );
      $( "#swatch" ).css( "background-color", "#" + hex );
    }
 
    $( "#red, #green, #blue" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 255,
      value: 127,
      slide: refreshSwatch,
      change: refreshSwatch
    });
    $( "#red" ).slider( "value", 255 );
    $( "#green" ).slider( "value", 140 );
    $( "#blue" ).slider( "value", 60 );


    // Selectmenu
    var circle = $( "#circle" );
 
    $( "#radius" ).selectmenu({
      change: function( event, data ) {
        circle.css({
          width: data.item.value,
          height: data.item.value
        });
      }
    });
 
    $( "#color" ).selectmenu({
       change: function( event, data ) {
         circle.css( "background", data.item.value );
       }
    });


    // Progressbar
    var progressTimer,
    progressbar = $( "#progressbar" ),
    progressLabel = $( ".progress-label" ),
    dialogButtons = [{
      text: "Cancel Download",
      click: closeDownload
    }],
    dialog = $( "#dialog" ).dialog({
      autoOpen: false,
      closeOnEscape: false,
      resizable: false,
      buttons: dialogButtons,
      open: function() {
        progressTimer = setTimeout( progress, 2000 );
      },
      beforeClose: function() {
        downloadButton.button( "option", {
          disabled: false,
          label: "Start Download"
        });
      }
    }),
    downloadButton = $( "#downloadButton" )
      .button()
      .on( "click", function() {
        $( this ).button( "option", {
          disabled: true,
          label: "Downloading..."
        });
        dialog.dialog( "open" );
      });

  progressbar.progressbar({
    value: false,
    change: function() {
      progressLabel.text( "Current Progress: " + progressbar.progressbar( "value" ) + "%" );
    },
    complete: function() {
      progressLabel.text( "Complete!" );
      dialog.dialog( "option", "buttons", [{
        text: "Close",
        click: closeDownload
      }]);
      $(".ui-dialog button").last().trigger( "focus" );
    }
  });

  function progress() {
    var val = progressbar.progressbar( "value" ) || 0;

    progressbar.progressbar( "value", val + Math.floor( Math.random() * 3 ) );

    if ( val <= 99 ) {
      progressTimer = setTimeout( progress, 50 );
    }
  }

  function closeDownload() {
    clearTimeout( progressTimer );
    dialog
      .dialog( "option", "buttons", dialogButtons )
      .dialog( "close" );
    progressbar.progressbar( "value", false );
    progressLabel
      .text( "Starting download..." );
    downloadButton.trigger( "focus" );
  }

  // Menu
  $( "#menu" ).menu();

});