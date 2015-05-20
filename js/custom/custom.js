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
     * this function 
     * */
    $(document).on('click', '.clou-app-type', function(){

        $('.listing').find('.longme').detach();

        if($('.clou-app-type').hasClass('cloud-app-selected')){
            $('.clou-app-type').removeClass('cloud-app-selected');
            $(this).addClass('cloud-app-selected');
        }else{
            $(this).addClass('cloud-app-selected');
        }

        var width = $( window ).width(),
            currentcount = $(this).attr('id'),
            dataCount = $('.listing').attr('data-count'),
            appendHtml = '<div class="longme"><div class="clearfix"></div><div class="col-md-12 long">Description</div></div>';

        if(width >=1170){
            if(currentcount%6 == 0){
                $('#'+currentcount).parent().after(appendHtml);
            }else{
                var ctest = parseInt(currentcount)+(6- currentcount%6);
                if(ctest > dataCount){
                    $('#'+ dataCount).parent().after(appendHtml);
                }else{
                    $('#'+ctest).parent().after(appendHtml);
                }

            }
        }else if(width >=970){
            if(currentcount%4 == 0){
                $('#'+currentcount).parent().after(appendHtml);
            }else{
                var ctest = parseInt(currentcount)+(4- currentcount%4);
                if(ctest > dataCount){
                    $('#'+ dataCount).parent().after(appendHtml);
                }else{
                    $('#'+ctest).parent().after(appendHtml);
                }

            }
        }else if(width >=750 ){
            if(currentcount%2 == 0){
                $('#'+currentcount).parent().after(appendHtml);
            }else{
                var ctest = parseInt(currentcount)+1;
                $('#'+ctest).parent().after(appendHtml);
            }

        }else if(width <750 ){
            $('#'+currentcount).parent().after(appendHtml);

        }


    })

