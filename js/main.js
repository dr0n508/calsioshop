$(document).ready(function () {

  // /**
  //  * Custom event
  //  */
  // $(document).on('testEvent', function(e, eventInfo) {
  //   console.log('testEvent happend');
  // });

  /**
   * jQuery slider for images with mobile events support
   */
  $('.bxslider').bxSlider();


  $('.slider-recently-viewed').bxSlider({
      slideWidth: 128,
      minSlides: 2,
      maxSlides: 3,
      moveSlides: 1,
      slideMargin: 10,
      pager: false,
      hideControlOnEnd: true,
      infiniteLoop: false,
      nextText: 'Vedi tutto <span class="fa fa-chevron-right" aria-hidden="true"></span>',
      prevText: '<span class="fa fa-chevron-left" aria-hidden="true"></span> Prev',
      nextSelector: '#slider-next',
      prevSelector: '#slider-prev'
  });


  /**
   * jQuery UI slider widget
   * Drag a handle to select a numeric value.
   */
  $("#slider").slider({
    min: 0,
    max: 1000,
    values: [0, 1000],
    range: true,
    stop: function(event, ui) {
      $("input#minCost").val($("#slider").slider("values",0));
      $("input#maxCost").val($("#slider").slider("values",1));
    },
    slide: function(event, ui){
      $("input#minCost").val($("#slider").slider("values",0));
      $("input#maxCost").val($("#slider").slider("values",1));
    }
  });

  $("input#minCost").change(function(){
    var value1=$("input#minCost").val();
    var value2=$("input#maxCost").val();

    if(parseInt(value1) > parseInt(value2)){
      value1 = value2;
      $("input#minCost").val(value1);
    }
    $("#slider").slider("values",0,value1);
  });

  $("input#maxCost").change(function(){
    var value1=$("input#minCost").val();
    var value2=$("input#maxCost").val();

    if (value2 > 1000) { value2 = 1000; $("input#maxCost").val(1000)}

    if(parseInt(value1) > parseInt(value2)){
      value2 = value1;
      $("input#maxCost").val(value2);
    }
    $("#slider").slider("values",1,value2);
  });

  /**
   * The jQuery replacement for select boxes
   * init select2 with template
   */
  function formatState (state) {
    if (!state.id) { return state.text; }
    var cssStyles = ' style=width:22px;height:22px;display:inline-block;vertical-align:middle;background-color:' + state.id;
    var $state = $(
      '<p style="width:100px;padding:5px;"><span' + cssStyles + '></span><span>' + state.text + '</span></p>'
    );
    return $state;
  }
  $('.select2').select2({
    templateResult: formatState,
    templateSelection: formatState,
    minimumResultsForSearch: Infinity,
    placeholder: "Seleziona un colore"

  });

  $('.select2-size').select2({
      minimumResultsForSearch: Infinity,
      placeholder: "Seleziona una taglia"
  });
  $('.select2-brand').select2({
      minimumResultsForSearch: Infinity,
      placeholder: "Seleziona una marca"
  }).on("change", function(e) {
      $('.filter-personal-prefer').addClass("db");
  });



  $('b[role="presentation"]').hide();
  $('.select2-selection__arrow').append('<i class="fa fa-chevron-down"></i>');

  /**
   * Custom filter selection
   * get value of clicked inputs
   */
  $('.checkbox22').click(function (e) {
    var str = $(this).parent().parent()[0].id;
    var n = str.lastIndexOf('-');
    var filterName = str.substring(n + 1);
    $('.number-of-filters').html('Filtra (' + $( "input:checked" ).length + ')');
    if ($(this).is(':checked')) {
      // add filter selected items fot appropriate filter
      $( e.target ).closest('.panel').find('[data-selected-items]').append(
        '<li class="' + $(this).val() + '"><a href="#"><span class="fa fa-times"></span><span>' + $(this).val() + '</span></a></li>'
      );
      // add filter selected items fot global filter view
      if ($('[data-global-filter-settings] li[data-filter=' + filterName + ']').length === 0) {
        $('[data-global-filter-settings]').append(
          '<li data-filter=' + filterName + '>' + filterName + '<a class="' + $(this).val() + '" href="#"><span class="fa fa-times"></span><span>' + $(this).val() + '</span></a></li>'
          // '<li class="' + $(this).val() + '"><a href="#"><span class="fa fa-times"></span><span>' + $(this).val() + '</span></a></li>'
        );
      } else {
        $('[data-global-filter-settings]  li[data-filter=' + filterName + ']').append(
          // '<li class="' + $(this).val() + '"><a href="#"><span class="fa fa-times"></span><span>' + $(this).val() + '</span></a></li>'
          '<a class="' + $(this).val() + '" href="#"><span class="fa fa-times"></span><span>' + $(this).val() + '</span></a>'
        );
      }

    } else {
      // remove filter selected items for appropriate filter
      $( e.target ).closest('.panel').find('[data-selected-items]').find('.' + $(this).val()).remove();
      // remove filter selected items fot global filter view
      $('[data-global-filter-settings]').find('.' + $(this).val()).remove();
    }
  });

  /**
   * Remove selected filter options
   * and uncheck inputs at filter options
   */
  $('[data-selected-items]').click(function (e) {
    var clickedLiClass = $(e.target).closest('li').attr('class');
    //remove filter option from global filter list
    $('[data-global-filter-settings]').find('.' + clickedLiClass).remove();
    console.log();
    // remove filter option from filter option list
    $(e.target).closest('li').remove();
    // uncheck filter option
    $(this).parent().next().find('#' + clickedLiClass).attr('checked', false);
    $('.number-of-filters').html('Filtra (' + $( "input:checked" ).length + ')');
  });

  $('[data-global-filter-settings]').click(function (e) {
    var clickedLiClass = $(e.target).closest('a').attr('class');
    if ($(e.target).closest('li').children().length === 1) {
      $(e.target).closest('li').remove();
    }
    $('#filterAccordion').find('[data-selected-items]').find('.' + clickedLiClass).remove();
    $('[data-global-filter-settings]').find('.' + clickedLiClass).remove();
    $('#filterAccordion').find('input#' + clickedLiClass).attr('checked', false);
    $('.number-of-filters').html('Filtra (' + $( "input:checked" ).length + ')');
  });

  /**
   * Reset filter
   */
  $('[data-filter-reset]').click(function (e) {
    $('[data-selected-items], [data-global-filter-settings] li').empty();
    // $(document).trigger('testEvent', [1011]);
  });
});