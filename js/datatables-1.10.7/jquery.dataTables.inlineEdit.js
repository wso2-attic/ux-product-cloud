/*
 * File:        jquery.dataTables.inlineEdit.js
 * Version:     1.0.0
 * Author:      Dakshika Jayathilaka(sinhaladjs@gmail.com/ dakshika@apache.org)
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Dependancy: Jeditable - jQuery in place edit plugin
 * include  Jeditable inorder to use this plugin
 */

(function ($) {

    $.fn.inlineEdit = function (target, table, url, options) {
        //get col of value editing
      //  console.log('col_name: ' + table.cell(target).index().column)
        //get current row id
     //   console.log(table.cell(target).index().row)
        //get current row first value
     //   console.log(table.row(table.cell(target).index().row).data()['varname'])
     //   console.log(table.row().data())

        if(target.hasClass('inline-edit') && target.is('td')){

            var inlineText = target.text();
            //enable inline editing
            var me = target.editable(
                function(value, settings) {

                    //inline validation
                   /* if( !value.match(/^\d{3}\-\d{4}$/) ){
                        console.log(value + " is not valid zip-code");
                        table.cell(this).data(inlineText)
                    }else{*/
                        if(value){
                            inlineText = value;

                            if(inlineText){
                                table.cell(this).data(inlineText)
                            }
                        }
                  /* }*/
                    //var editedData = table.row(target.parents()).data();
                    var editedData = table.cell(target).data();
                    var cellId = table.row(target.parents()).data().id;
                    var developmentCell = table.row(target.parents()).data().dev;
                    var testingCell = table.row(target.parents()).data().test;
                    //var deployCell = table.row(target.parents()).data().deploy;
                    var edits = {};
                    edits['id'] = cellId;
                    if(target.hasClass('development')){
                        edits['development'] = developmentCell;
                    }else{
                        edits['testing'] = testingCell;
                    }
                    console.log(edits);
                    //console.log(cellId);
                    //console.log(value);
                    //console.log(settings);
                },{
                    submit    : 'OK',
                    indicator : '<i class="fw fw-wso2-logo fw-pulse fw-2x"></i>',
                    tooltip   : 'Click to edit...'
                }
            );


        }

    }
})(jQuery);