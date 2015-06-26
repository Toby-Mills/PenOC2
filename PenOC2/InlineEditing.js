var InlineEditing = InlineEditing || {};

/*----Start Editing ---*/
InlineEditing.startEditing = function (objParent) {
    InlineEditing.spanToTextBox(objParent);
}

/*----Span To Text Box ---*/
InlineEditing.spanToTextBox = function (objParent) {
    var objSpans;

    objSpans = objParent.find("span.edit-textbox")
    objSpans.each(function (intIndex, objSpan) {

        var objTextBox = $("<input>", {
            val: $(objSpan).text(),
            type: "text"
        });
        objTextBox.attr("id", $(objSpan).attr("id"));
        objTextBox.attr("class", $(objSpan).attr("class"));
        objTextBox.removeClass("edit-textbox")
        objTextBox.addClass("noEdit-span")
        objTextBox.css("width", "100%");
        $(objSpan).replaceWith(objTextBox);

    });
};

/*----Stop Editing ---*/
InlineEditing.stopEditing = function (objParent) {
    InlineEditing.TextBoxToSpan(objParent);
}

/*----Text Box to Span---*/
InlineEditing.TextBoxToSpan = function (objParent) {
    var objInputs;

    objInputs = objParent.find("input.noEdit-span")
    objInputs.each(function (intIndex, objInput) {

        var objSpan = $("<span>", {
            val: objInput.text()
        });
        objSpan.attr("class", objSpan.attr("class"));
        objSpan.removeClass("noEdit-span")
        objSpan.addClass("edit-textbox")
        objSpan.css("width", "100%");
        objInput.replaceWith(objSpan);

    });
};