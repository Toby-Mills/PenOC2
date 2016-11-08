Public Class Home
    Inherits PenocPage

    Private Sub Page_LoadComplete(sender As Object, e As System.EventArgs) Handles Me.LoadComplete


        Me.InjectJavascriptTag("Scripts/masonry-3.3.2.js")
        Me.InjectJavascriptTag("Home.js")
        Me.InjectJavascriptTag("WhatIs.js")

    End Sub
End Class