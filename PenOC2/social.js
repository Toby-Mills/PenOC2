var Social = Social || {};


/*---addSocialBar
------------------------*/
Social.addSocialBar = function (divSocial, strUrl, strDescription) {

    divSocial.addClass("social");

    /*Facebook*/
    divSocial.append(Social.button("Images/socialIcons/facebook.svg", "https://www.facebook.com/dialog/share?app_id=1608421496096601&redirect_uri=http://www.facebook.com&display=page&href=" + strUrl, "Share on Facebook"));
    
    /*twitter*/
    divSocial.append(Social.button("Images/socialIcons/twitter.svg", "https://twitter.com/intent/tweet?url=" + strUrl, "Share on Twitter"));

    /*email*/
    divSocial.append(Social.button("Images/socialIcons/email.svg", "mailto:?subject=" + strDescription + "&body=" + strDescription + ": " + strUrl, "Share via Email"));

}

/*---Button
------------------------*/
Social.button = function(strImg, strUrl, strTitle){

    var lnkSocial;
    var imgSocial;

    lnkSocial = $("<a></a>");
    lnkSocial.attr("href", strUrl)
    lnkSocial.attr("target", "_blank");
    lnkSocial.attr("title", strTitle);

    imgSocial = $("<img />");
    imgSocial.attr("src", strImg);

    lnkSocial.append(imgSocial);

    return lnkSocial;

}