Public Class ContactUs
    Inherits PenocPage

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub

    Private Sub ContactUs_LoadComplete(sender As Object, e As System.EventArgs) Handles Me.LoadComplete
        Me.InjectJavascriptTag("ContactUs.js")
    End Sub
End Class