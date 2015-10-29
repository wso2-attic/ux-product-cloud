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

(function($){

    $.fn.inlineEdit = function(cell,table){

        if(typeof $.fn.editable === 'undefined'){
            throw 'Dependancy not found : Jeditable';
        }

        var target  = $(cell),
            jTable   = table;

        if(target.hasClass('inline-edit') && target.is('td')){
            var edit = target.editable(function(value,settings){
                if(value){
                    inlineText = value;

                    if(inlineText){
                        jTable.cell(this).data(inlineText)
                    }

                    var editedCell  = table.cell(target),
                        columnIndex = editedCell[0][0].column,
                        columnText  = table.column(columnIndex).header().innerText.trim(),
                        cellId      = table.row(target.parents()).data().id,
                        editContent = target.text(),
                        editedData  = {};

                    editedData['id'] = cellId;
                    editedData[columnText] = editContent;

                    console.log(editedData);
                }
            },{
                submit      : 'OK',
                indicator   : '<i class="fw fw-wso2-logo fw-pulse fw-2x"></i>',
                tooltip     : 'Click to edit...'
            })
        }
    }

})(jQuery)

