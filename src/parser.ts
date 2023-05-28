import $ from "jquery";

type NotebookCell = {
  id: string;
  type: "javascript"; // "markdown" | "html"
  content: string;
  preview: string;
  active: boolean;
};

export async function loadNotebook(): Promise<string> {
  const ret: NotebookCell[] = [];

  const notebookId = window.location.pathname.split("/")[2];

  let notebook = await (await fetch(`https://api.observablehq.com/d/${notebookId}.js`)).text();
  notebook = notebook
    .split("m0 = ")[1]
    .split("\nconst m1")[0]
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .join("\n");

  return notebook;
}

export function getCurrentCell(): string {
  const activeLine = $(".node-hover .cm-activeLine");
  const activeLineIndex = activeLine.parent().children().index(activeLine);
  const lines = activeLine
    .parent()
    .children()
    .filter((i, el) => {
      return i <= activeLineIndex;
    })
    .toArray()
    .map((el) => {
      return $(el).text();
    })
    .join("\n");
  return lines;
}

export function injectPredictionPreview(prediction: string | null) {
  console.log("injectPredictionPreview", prediction);
  $("head").remove("#prediction_style");
  $(".prediction").removeClass("prediction");
  if (!prediction) return;

  $("head").append(`<style id="prediction_style">
        .prediction:after {
            content: '${prediction.replace("'", "\\'")}';
            color: lightgrey;
        }
    </style>`);

  const activeLine = $(".node-hover .cm-activeLine");
  const lastChild = activeLine.children().last();
  lastChild.addClass("prediction");
}

export function injectPrediction(prediction: string) {
  $("head").remove("#prediction_style");
  $(".prediction").removeClass("prediction");

  const activeLine = $(".node-hover .cm-activeLine");
  const lastChild = activeLine.children().last();
  lastChild.append(prediction);
}
