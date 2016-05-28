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
     */

    // get value of clicked inputs
    $('.checkbox22').click(function (e) {
      // e.preventDefault();
      // console.log('selected value of opend filter');
      // console.log($( "input:checked" ).length);
      // console.log($(this).val());
      // insert selected items from filter
      // console.log($(this).is(':checked'));
      // console.log($( e.target ).closest('.panel').find('[data-selected-items]'));
      if ($(this).is(':checked')) {
        $( e.target ).closest('.panel').find('[data-selected-items]').append(
          '<li class="' + $(this).val() + '"><a href="#"><span class="fa fa-times"></span><span>' + $(this).val() + '</span></a></li>'
        );
        $('#global-filter-settings').append(
          '<li class="' + $(this).val() + '"><a href="#"><span class="fa fa-times"></span><span>' + $(this).val() + '</span></a></li>'
        );
      } else {
        $( e.target ).closest('.panel').find('[data-selected-items]').find('.' + $(this).val()).remove();
        $('#global-filter-settings').find('.' + $(this).val()).remove(
          '<li class="' + $(this).val() + '"><a href="#"><span class="fa fa-times"></span><span>' + $(this).val() + '</span></a></li>'
        );
      }
    });

    // add selected items into html
    // $('#filterAccordion').on('shown.bs.collapse', function (e) {
    //   e.preventDefault();
    //   console.log('id of opend filter');
    //   console.log(e.target.id);
    //
    // });


    // $('#filterAccordion').on('hidden.bs.collapse', function (e) {
    //   e.preventDefault();
    //   console.log(e);
    // });


});