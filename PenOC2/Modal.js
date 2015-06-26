var Modal = Modal || {};

Modal.modalHistory = [];

/*--- Show ---*/
Modal.show = function (strType, objData, strSummary) {
    var divModalContainer;

    divModalContainer = Modal.modalContainerDiv();
    Modal.setBackButtonVisibility();

    divModalContainer.modal('show');

    Modal.modalHeaderDiv().focus();

    Modal.modalHistory.push({ "type": strType, "data": objData, "summary": strSummary });
}

/*--- Hide ---*/
Modal.hide = function () {
    var divModalContainer;

    divModalContainer = Modal.modalContainerDiv();

    divModalContainer.modal('hide');
}


/*---Modal Container---*/
Modal.modalContainerDiv = function () {
    var divModalContainer;

    divModalContainer = $("#divModalContainer");

    if (!divModalContainer.length > 0) {
        strElement = "<div class='modal fade' id='divModalContainer' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog large'></div></div>";
        $("body").append(strElement);
        divModalContainer = $("#divModalContainer");
        divModalContainer.on('hidden.bs.modal', function () {
            Modal.modalHistory = [];
        })
        Modal.modalHeaderDiv();
        Modal.modalBodyDiv();
        Modal.modalFooterDiv();
    }

    return divModalContainer;
}

/*---Modal Dialog---*/
Modal.modalDialogDiv = function () {
    var divModalContainer;
    var divModalDialog;

    divModalContainer = Modal.modalContainerDiv();
    divModalDialog = divModalContainer.find(".modal-dialog");

    return divModalDialog;
}

/*---Modal Header--*/
Modal.modalHeaderDiv = function () {
    var divModalContent;
    var divModalHeader;

    divModalContent = Modal.modalContentDiv();
    divModalHeader = divModalContent.find(".modal-header");

    if (!divModalHeader.length > 0) {
        divModalContent.append("<div class='modal-header title'><h4 class='modal-title'></h4><button data-dismiss='modal' aria-hidden='true' class='btn btn-default modal-close'><span class='glyphicon glyphicon glyphicon-remove'></span> CLOSE</button></div>");
        divModalHeader = divModalContent.find(".modal-header");
    }

    return divModalHeader;
}

/*---Modal Title--*/
Modal.modalTitle = function () {
    var divModalHeader;
    var objModalTitle;

    divModalHeader = Modal.modalHeaderDiv();
    objModalTitle = divModalHeader.find(".modal-title");

    return objModalTitle;
}

/*---Modal Content---*/
Modal.modalContentDiv = function () {
    var divModalDialog;
    var divModalContent;

    divModalDialog = Modal.modalDialogDiv();
    divModalContent = divModalDialog.find(".modal-content");

    if (!divModalContent.length > 0) {
        divModalDialog.append("<div class='modal-content'></div>");
        divModalContent = divModalDialog.find(".modal-content");
    }

    return divModalContent;
}

/*---Modal Body---*/
Modal.modalBodyDiv = function () {
    var divModalContent;
    var divModalBody;

    divModalContent = Modal.modalContentDiv();
    divModalBody = divModalContent.find(".modal-body");

    if (!divModalBody.length > 0) {
        divModalContent.append("<div class='modal-body'></div>");
        divModalBody = divModalContent.find(".modal-body");
    }

    return divModalBody;
}

/*---Modal Footer---*/
Modal.modalFooterDiv = function () {
    var divModalContent;
    var divModalFooter;

    divModalContent = Modal.modalContentDiv();
    divModalFooter = divModalContent.find(".modal-footer");

    if (!divModalFooter.length > 0) {
        divModalContent.append("<div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'><span class='glyphicon glyphicon glyphicon-remove'></span> CLOSE</button></div>");
        divModalFooter = divModalContent.find(".modal-footer");
    }

    return divModalFooter;
}

Modal.setTitle = function (strTitle) {
    var objModalTitle;

    objModalTitle = Modal.modalTitle();

    objModalTitle.empty();
    objModalTitle.append(strTitle);

}

Modal.setBody = function (strContent) {
    var divModalBody;

    divModalBody = Modal.modalBodyDiv();

    divModalBody.empty();
    divModalBody.append(strContent);

}

Modal.setEditButtonVisible = function (blnVisible, objPromise) {
    var divModalHeader;
    var btnEdit;

    divModalHeader = Modal.modalHeaderDiv();
    btnEdit = divModalHeader.find("#btnEdit");

    if (!btnEdit.length > 0) {
        if (blnVisible) {
            divModalHeader.append("<button id='btnEdit' type='button' class='btn btn-default edit'><span class='glyphicon glyphicon glyphicon-pencil'></span> EDIT</button>");
            btnEdit = divModalHeader.find("#btnEdit");
        }
    } else {
        if (!blnVisible) {
            btnEdit.remove();
        }
    }

    if (blnVisible) {
        btnEdit.on("click", objPromise);
    }
}

Modal.setSaveButtonVisible = function (blnVisible, objPromise) {
    var divModalHeader;
    var btnSave;

    divModalHeader = Modal.modalHeaderDiv();
    btnSave = divModalHeader.find("#btnSave");

    if (!btnSave.length > 0) {
        if (blnVisible) {
            divModalHeader.append("<button id='btnSave' type='button' class='btn btn-default save'><span class='glyphicon glyphicon glyphicon-floppy-disk'></span> SAVE</button>");
            btnSave = divModalHeader.find("#btnSave");
        }
    } else {
        if (!blnVisible) {
            btnSave.remove();
        }
    }

    if (blnVisible) {
        btnSave.on("click", objPromise);
    }
}

Modal.setCancelButtonVisible = function (blnVisible, objPromise) {
    var divModalHeader;
    var btnCancel;

    divModalHeader = Modal.modalHeaderDiv();
    btnCancel = divModalHeader.find("#btnCancel");

    if (!btnCancel.length > 0) {
        if (blnVisible) {
            divModalHeader.append("<button id='btnCancel' type='button' class='btn btn-default cancel'><span class='glyphicon glyphicon glyphicon-remove-sign'></span> CANCEL</button>");
            btnCancel = divModalHeader.find("#btnCancel");
        }
    } else {
        if (!blnVisible) {
            btnCancel.remove();
        }
    }

    if (blnVisible) {
        btnCancel.on("click", objPromise);
    }
}

Modal.setBackButtonVisibility = function addModalBackButton() {
    var divHeader;
    var objBackButton;

    divModalHeader = Modal.modalHeaderDiv();
    objBackButton = divModalHeader.find(".back");

    if (Modal.modalHistory.length > 0) {
        if (objBackButton.length === 0) {
            divModalHeader.prepend("<button class='btn btn-default back'><span class='glyphicon glyphicon glyphicon-arrow-left'></span> BACK</button>");
            objBackButton = divModalHeader.find(".back");
            
            objBackButton.on("click", function () {
                Modal.NavigateBack();
            });
       }
        objBackButton.prop("title", Modal.modalHistory[Modal.modalHistory.length -1].summary);
    } else {
        if (objBackButton.length > 0) {
            objBackButton.remove();
        }
    }
}

Modal.NavigateBack = function () {
    var objHistory;
    var objData;

    objHistory = Modal.modalHistory.pop(); //remove current page
    objHistory = Modal.modalHistory.pop(); //read data for previous page

    objData = objHistory.data;

    switch (objHistory.type) {
        case "event":
            EventResults.showEvent(objData.intEvent, objData.intCourse, objData.intCompetitor);
            break;
        case "competitor":
            CompetitorResults.showCompetitor(objData.intCompetitor);
            break;
        case "log":
            LogResults.showLog(objData.intLog);
            break;
    }
}
