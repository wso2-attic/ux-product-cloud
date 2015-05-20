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
            appendHtml = '<div class="longme">' +
                            '<div class="clearfix"></div>' +
                            '<div class="col-md-12 long"> <div class="row"> <div class="col-md-6"> ' +
                            '<h2>JAVA Appication</h2>'+
                            '<div class="app-description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. </div> '+
                            '<div class="button-bar">' +
                            '<a href="#" class="cu-btn cu-btn-md cu-btn-gr-dark">Documentation</a>'+
                            '<a href="#" class="cu-btn cu-btn-md cu-btn-gr-dark">Video Guide</a>'+
                            '</div></div>' +
                            '<div class="col-md-6">' +
                            '<a href="#" class="cu-btn cu-btn-md cu-btn-gr-dark">Create Application</a>'+
                            '</div>'+
                            '</div>'+
                            '</div>' +
                            '</div>';

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

