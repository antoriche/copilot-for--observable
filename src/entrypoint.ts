import $ from 'jquery';
import { parsePage } from './parser';

console.log('test injection')

$(document).ready(function () {
        const cells = parsePage()
        console.log(cells)
});