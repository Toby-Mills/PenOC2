Public Class Site
    Inherits System.Web.UI.MasterPage

    Private Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        Dim objPenocPage As PenocPage

        objPenocPage = DirectCast(Me.Page, PenocPage)

        objPenocPage.InjectJavascriptTag("https://code.jquery.com/jquery-2.1.3.min.js")
        objPenocPage.InjectJavascriptTag("Scripts/jquery.extensions.js")
        objPenocPage.InjectJavascriptTag("Site.Master.js")
        objPenocPage.InjectJavascriptTag("Modal.js")
        objPenocPage.InjectJavascriptTag("Processing.js")
        objPenocPage.InjectJavascriptTag("Cards.js")
        objPenocPage.InjectJavascriptTag("Global.js")
        objPenocPage.InjectJavascriptTag("ResultTable.js")
        objPenocPage.InjectJavascriptTag("EventResults.js")
        objPenocPage.InjectJavascriptTag("EventDetails.js")
        objPenocPage.InjectJavascriptTag("InlineEditing.js")
        objPenocPage.InjectJavascriptTag("CompetitorResults.js")
        objPenocPage.InjectJavascriptTag("Web Services/NewsService.js")
        objPenocPage.InjectJavascriptTag("Web Services/EventsService.js")
        objPenocPage.InjectJavascriptTag("Web Services/LogsService.js")
        objPenocPage.InjectJavascriptTag("Web Services/CompetitorsService.js")
        objPenocPage.InjectJavascriptTag("Web Services/Autocomplete.js")
        objPenocPage.InjectJavascriptTag("http://code.jquery.com/ui/1.11.4/jquery-ui.min.js")
        objPenocPage.InjectJavascriptTag("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js")



    End Sub
End Class