$(document).ready(function () {

  /**
   * jQuery slider for images with mobile events support
   */
  $('.bxslider').bxSlider();


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
    var cssStyles = ' style=width:10px;height:10px;display:inline-block;vertical-align:middle;background-color:' + state.id;
    var $state = $(
      '<p style="width:100px;padding:5px;"><span' + cssStyles + '>' + state.text + '</span></p>'
    );
    return $state;
  }
  $('.select2').select2({
    templateResult: formatState,
    templateSelection: formatState,
    minimumResultsForSearch: Infinity
  });

  /**
   * Custom filter selection
   * get value of clicked inputs
   */
  $('.checkbox22').click(function (e) {
    if ($(this).is(':checked')) {
      // add filter selected items fot appropriate filter
      $( e.target ).closest('.panel').find('[data-selected-items]').append(
        '<li class="' + $(this).val() + '"><a href="#"><span class="fa fa-times"></span><span>' + $(this).val() + '</span></a></li>'
      );
      // add filter selected items fot global filter view
      $('[data-global-filter-settings]').append(
        '<li class="' + $(this).val() + '"><a href="#"><span class="fa fa-times"></span><span>' + $(this).val() + '</span></a></li>'
      );
    } else {
      // remove filter selected items fot appropriate filter
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
    // remove filter option from filter option list
    $(e.target).closest('li').remove();
    // uncheck filter option
    $(this).parent().next().find('#' + clickedLiClass).attr('checked', false);
  });
});