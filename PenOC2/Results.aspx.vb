Imports System.Web.Script.Serialization

Public Class Results
    Inherits PenocPage

    Private Sub Results_LoadComplete(sender As Object, e As System.EventArgs) Handles Me.LoadComplete

        Me.InjectJavascriptTag("Results.js")
        
    End Sub
End Class