$('.cloud-menu-popover').popover({
    html : true,
    title: function() {
        return $("#popover-head").html();
    },
    content: function() {
        return $("#popover-content").html();
    }
});

    /**
     * this function use to append description block on app type selection
     * */
    $(document).on('click', '.cloud-app-type', function(){

        $('.listing').find('.longme').detach();

        if($('.cloud-app-type').hasClass('cloud-app-selected')){
            $('.cloud-app-type').removeClass('cloud-app-selected');
            $(this).addClass('cloud-app-selected');
        }else{
            $(this).addClass('cloud-app-selected');
        }

        var width = $( window ).width(),
            currentcount = $(this).attr('id'),
            dataCount = $('.listing').attr('data-count'),
            appendHtml = $('.app-type-info-template').html();

        if(width >=1170){
            if(currentcount%7 == 0){
                $('#'+currentcount).parent().after(appendHtml);
                $('.longme').fadeIn('slow')
            }else{
                var ctest = parseInt(currentcount)+(7- currentcount%7);
                if(ctest > dataCount){
                    $('#'+ dataCount).parent().after(appendHtml);
                    $('.longme').fadeIn('slow')
                }else{
                    $('#'+ctest).parent().after(appendHtml);
                    $('.longme').fadeIn('slow')
                }

            }
        }else if(width >=970){
            if(currentcount%4 == 0){
                $('#'+currentcount).parent().after(appendHtml);
                $('.longme').fadeIn('slow')
            }else{
                var ctest = parseInt(currentcount)+(4- currentcount%4);
                if(ctest > dataCount){
                    $('#'+ dataCount).parent().after(appendHtml);
                    $('.longme').fadeIn('slow')
                }else{
                    $('#'+ctest).parent().after(appendHtml);
                    $('.longme').fadeIn('slow')

                }

            }
        }else if(width >=750 ){
            if(currentcount%2 == 0){
                $('#'+currentcount).parent().after(appendHtml);
                $('.longme').fadeIn('slow')
            }else{
                var ctest = parseInt(currentcount)+1;
                $('#'+ctest).parent().after(appendHtml);
                $('.longme').fadeIn('slow')
            }

        }else if(width <750 ){
            $('#'+currentcount).parent().after(appendHtml);
            $('.longme').fadeIn('slow')

        }


    })

