var WhatIs = WhatIs || {};
var divWhatIs;



WhatIs.show = function () { 
divWhatIs = $("<div></div>")

divWhatIs.load("WhatIs.htm");

Modal.setTitle("What is Orienteering?");
Modal.setBody(divWhatIs);
Modal.show();

ga('send', 'pageview', {
    page: '/WhatIs',
    title: 'What is Orienteering'
});
}
