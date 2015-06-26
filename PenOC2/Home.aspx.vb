Public Class Home
    Inherits PenocPage

    Private Sub Page_LoadComplete(sender As Object, e As System.EventArgs) Handles Me.LoadComplete


        Me.InjectJavascriptTag("https://cdnjs.cloudflare.com/ajax/libs/masonry/3.3.0/masonry.pkgd.min.js")
        Me.InjectJavascriptTag("Home.js")

    End Sub
End Class