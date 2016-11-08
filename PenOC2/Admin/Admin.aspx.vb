Public Class Admin
    Inherits PenOC2.PenocPage

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub

    Private Sub Admin_LoadComplete(sender As Object, e As EventArgs) Handles Me.LoadComplete

        Me.InjectJavascriptTag("Scripts/masonry-3.3.2.js")
        Me.InjectJavascriptTag("Admin.js")

        '        <link rel = "stylesheet" href="bootstrap/css/bootstrap.min.css">
        '<link rel = "stylesheet" href="styles/style.css">
        '<script src = "bootstrap/js/jquery.min.js" ></script>
        '<script src = "bootstrap/js/bootstrap.min.js" ></script>

    End Sub
End Class