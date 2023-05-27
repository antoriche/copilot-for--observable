import $ from 'jquery';

type NotebookCell = {
    id: string;
    type: "javascript"; // "markdown" | "html"
    content: string;
    preview: string;
    active: boolean;
};

export function parsePage():NotebookCell[] {
    const ret:NotebookCell[] = []


            /*
        select all .observablehq--worker elements
        find .observablehq--inspect element
        pick all contents from chidren (nested) elements and join them
        */
        /**console.log('observablehq--worker',$('.observablehq--worker').length)
        $('.observablehq--worker').each((i, node) => {
        const cell = {
            id: $(node).attr('id')||"",
            type: 'javascript' as const,
            content: '',
            preview: '',
            active: false
        }

        const preview = $(node).find('.observablehq--inspect').text()
        console.log('preview',preview)

        ret.push(cell)
    })  */


    //select elements having attr data-node-id
    
    $( '[data-node-id]').each((i, node) => {
        const cell = {
            id: $(node).attr('data-node-id')||"",
            type: 'javascript' as const,
            content: '',
            preview: '',
            active: false
        }


        const editor = $(node).find('.cm-editor');
        if(!editor.length) return
        const lines = editor.find('[role=textbox]').find('.cm-line');
        
        if (lines.filter('.cm-activeLine').length > 0) {
            cell.active = true;
        }

        cell.content = lines.map((i, line) => {
            return $(line).text();
        }).toArray().join('\n');

        ret.push(cell)
    })  
    return ret
}