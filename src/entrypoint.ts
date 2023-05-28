import { getCodePrediction } from './engine';
import $ from 'jquery';
import { getCurrentCell, injectPrediction, injectPredictionPreview, loadNotebook } from './parser';
import _ from 'lodash';

let prediction:string | null = null;
const acceptPrediction = function(e:JQuery.KeyDownEvent) {
        var keyCode = e.key;
        if (keyCode === "Tab" && prediction) { 
                e.stopPropagation();
                

                injectPrediction(prediction)
                injectPredictionPreview("")
                prediction = null;
                
                //TODO: Bug, tab still trigger
                //$('.node-hover .cm-activeLine').trigger('keydown', {key: 'Backspace'});
                //$('.node-hover .cm-activeLine').trigger('keydown', {key: 'Backspace'});
        }
}


const processPreview = _.debounce(async function(e:JQuery.KeyDownEvent | JQuery.ClickEvent) {
        const notebook = await loadNotebook()
        const currentCell = await getCurrentCell()

        prediction = await getCodePrediction(notebook, currentCell)
        console.log('processPreview',currentCell, prediction)


        $(document).off('keydown', acceptPrediction);
        await injectPredictionPreview(prediction)
        $(document).one('keydown', acceptPrediction);
}, 1000)

$(document).ready(async function () {
        $(document).on('keydown', processPreview)
        $(document).on('click', processPreview)
});