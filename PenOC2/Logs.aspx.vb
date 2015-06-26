Public Class Logs
    Inherits PenocPage

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub

    Private Sub Logs_LoadComplete(sender As Object, e As System.EventArgs) Handles Me.LoadComplete

        Me.InjectJavascriptTag("https://cdnjs.cloudflare.com/ajax/libs/masonry/3.2.2/masonry.pkgd.min.js")
        Me.InjectJavascriptTag("LogResults.js")
        Me.InjectJavascriptTag("Logs.js")

    End Sub
End Class