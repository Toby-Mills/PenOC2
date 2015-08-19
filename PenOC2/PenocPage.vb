Public Class PenocPage
    Inherits Web.UI.Page

    Private c_strWebsiteBasePhysicalFolder As String
    Private Shared c_objHashCodeSyncLock As Object
    Private Shared c_dicCachedFileContentsHashcodes As New PenOC2.OrderedDictionary(Of String, String)

    Shared Sub New()

        'Create new variables to use for sync locking ...
        c_objHashCodeSyncLock = New Object

    End Sub

    Private Sub AppendHashcodeToStylesheetAndJavaScriptURLs()
        Dim objControl As System.Web.UI.Control

        'When the page has a header ...
        If Not Me.Page.Header Is Nothing Then

            'Loop through all the controls on the page header ...
            For Each objControl In Me.Page.Header.Controls
                If (TypeOf objControl Is HtmlGenericControl) Then
                    AppendHashcodeToStylesheetAndJavaScriptURL(CType(objControl, HtmlGenericControl))
                ElseIf (TypeOf objControl Is HtmlLink) Then
                    AppendHashcodeToStylesheetAndJavaScriptURL(CType(objControl, HtmlLink))
                End If
            Next
        End If
    End Sub


    Private Sub AppendHashcodeToStylesheetAndJavaScriptURL(ByVal objLiteral As HtmlGenericControl)

        If (objLiteral.Attributes("type").Contains("script")) Then

            If UrlIsLocal(objLiteral.Attributes("src")) Then
                objLiteral.Attributes("src") = AddHashCodeUrlArgument(objLiteral.Attributes("src"))
            End If


        ElseIf (objLiteral.Attributes("type").Contains("text/css")) Then
            If UrlIsLocal(objLiteral.Attributes("href")) Then
                objLiteral.Attributes("href") = AddHashCodeUrlArgument(objLiteral.Attributes("href"))
            End If

        End If

    End Sub

    Private Sub AppendHashcodeToStylesheetAndJavaScriptURL(ByVal objHtmlLink As HtmlLink)

        Dim objHtmlDocument As HtmlAgilityPack.HtmlDocument
        Dim objHtmlNode As HtmlAgilityPack.HtmlNode
        Dim objStringBuilder As System.Text.StringBuilder
        Dim objStringWriter As System.IO.StringWriter
        Dim objHtmlTextWriter As HtmlTextWriter
        Dim strElementText As String

        objStringBuilder = New StringBuilder
        objStringWriter = New System.IO.StringWriter(objStringBuilder)
        objHtmlTextWriter = New HtmlTextWriter(objStringWriter)

        'Render the HTML Link to a string
        objHtmlLink.RenderControl(objHtmlTextWriter)
        strElementText = objStringBuilder.ToString

        If (strElementText.ToLower.Contains("script")) OrElse (strElementText.ToLower.Contains("text/css")) Then

            'Create a new html agility pack document ...
            objHtmlDocument = New HtmlAgilityPack.HtmlDocument

            'Load the text of the HTML Link into the html document ...
            objHtmlDocument.LoadHtml(strElementText)

            'Retrieve the node
            objHtmlNode = objHtmlDocument.DocumentNode.ChildNodes(0)

            'Append the hash code
            AppendHashcodeToStylesheetAndJavaScriptURL(objHtmlNode)

            'Copy the 'src' attribute back to the HTML Link
            If Not objHtmlNode.Attributes("src") Is Nothing Then
                objHtmlLink.Attributes("src") = objHtmlNode.Attributes("src").Value
            End If
            'Copy the 'href' attribute back to the HTML Link
            If Not objHtmlNode.Attributes("href") Is Nothing Then
                objHtmlLink.Attributes("href") = objHtmlNode.Attributes("href").Value
            End If

        End If
    End Sub

    Private Sub AppendHashcodeToStylesheetAndJavaScriptURL(ByVal objHtmlNode As HtmlAgilityPack.HtmlNode)
        Dim strFileURL As String
        Dim strConvertedFileURL As String
        Dim objHtmlDocument As HtmlAgilityPack.HtmlDocument
        Dim objStringBuilder As System.Text.StringBuilder
        Dim objStringWriter As System.IO.StringWriter

        'When a script tag with type attribute "text/javascript" ...
        If ((objHtmlNode.Name.ToLower = "script") AndAlso _
            (Not objHtmlNode.Attributes("type") Is Nothing) AndAlso _
            (Not objHtmlNode.Attributes("src") Is Nothing) AndAlso _
            (objHtmlNode.Attributes("type").Value.ToLower = "text/javascript")) Then

            'Get the source attribute ...
            strFileURL = objHtmlNode.Attributes("src").Value

            If UrlIsLocal(strFileURL) Then
                'Add the hash code to the url argument (the src attribute) ...
                objHtmlNode.Attributes("src").Value = AddHashCodeUrlArgument(strFileURL)
            End If


            'When a stylesheet tag with type attribute "text/css" ...
        ElseIf ((objHtmlNode.Name.ToLower = "link") AndAlso _
        (Not objHtmlNode.Attributes("type") Is Nothing) AndAlso _
        (objHtmlNode.Attributes("type").Value.ToLower = "text/css")) Then

            'Get the href attribute ...
            If Not objHtmlNode.Attributes("href") Is Nothing Then

                strFileURL = objHtmlNode.Attributes("href").Value
                If UrlIsLocal(strFileURL) Then
                    objHtmlNode.Attributes("href").Value = AddHashCodeUrlArgument(strFileURL)
                End If

            End If

        End If

    End Sub

    Private Function GetFileHashCode(ByVal strFileURL As String) As String
        Dim strFileContents As String
        Dim strHashCode As String
        Dim strFilePath As String

        'Get the physical path of the file ...
        strFilePath = System.Web.HttpContext.Current.Server.MapPath(strFileURL)

        'When we have not obtained the base physical path 
        'for the FlexiCadstre implementation yet ...
        If c_strWebsiteBasePhysicalFolder = "" Then

            'Get the base physical path for the FlexiCadstre implementation yet ...
            c_strWebsiteBasePhysicalFolder = System.Web.HttpContext.Current.Server.MapPath("")
        End If

        'When the file path starts with the base physical path of the 
        'FlexiCadastre implementation, i.e. the stylesheet is from FlexiCadastre ...
        If strFilePath.ToLower.StartsWith(c_strWebsiteBasePhysicalFolder.ToLower) Then

            'Load the file contents ...
            strFileContents = ReadTextFromFile(strFilePath)

            'Get the hash code of the file and convert it to a string ...
            strHashCode = strFileContents.GetHashCode().ToString
        Else

            'Return an empty string as the hashcode ...
            strHashCode = ""
        End If

        Return strHashCode
    End Function

    Private Function AddHashCodeUrlArgument(ByVal strFileURL As String) As String
        Dim strFileContentsHashCode As String

        'When the file url do not alreay have a hashcode attatched ...
        If Not strFileURL.Contains("?hashcode=") Then

            'Do the next bit on a shared synchlock to prevent the dictioanry from corrupting ...
            SyncLock (c_objHashCodeSyncLock)

                'When the file contents hash code has already been computed and cached ...
                If c_dicCachedFileContentsHashcodes.ContainsKey(strFileURL.ToLower) Then

                    'Get the cached file contents hash code ...
                    strFileContentsHashCode = c_dicCachedFileContentsHashcodes(strFileURL.ToLower)
                Else

                    'Compute the cached file contents hash code ...
                    strFileContentsHashCode = GetFileHashCode(strFileURL).ToString

                    'Add the hash code to the dictionary ...
                    c_dicCachedFileContentsHashcodes.Add(strFileURL.ToLower, strFileContentsHashCode)
                End If
            End SyncLock

            'When we could generate a hash code for the file ...
            If strFileContentsHashCode <> "" Then

                'Append the last write time of the file to the url as an argument ...
                strFileURL &= "?hashcode=" & strFileContentsHashCode
            End If
        End If

        Return strFileURL
    End Function

    Public Function ReadTextFromFile(ByVal strFilePath As String) As String
        Dim strReturn As String
        Dim objStreamReader As System.IO.StreamReader

        objStreamReader = System.IO.File.OpenText(strFilePath)
        strReturn = objStreamReader.ReadToEnd()

        objStreamReader.Close()

        Return strReturn
    End Function

    Public Shared Sub InjectJavascriptTag(page As Web.UI.Page, strURL As String, Optional blnAsync As Boolean = False, Optional blnDefer As Boolean = False)
        Dim js As New HtmlGenericControl("script")

        js.Attributes("type") = "text/javascript"
        js.Attributes("src") = strURL
        If blnAsync Then js.Attributes("async") = "true"
        If blnDefer Then js.Attributes("defer") = "true"
        page.Header.Controls.Add(js)

    End Sub

    Public Sub InjectJavascriptTag(strURL As String, Optional blnAsync As Boolean = False, Optional blnDefer As Boolean = False)

        InjectJavascriptTag(Me.Page, strURL)

    End Sub

    Private Sub Page_PreRender(sender As Object, e As System.EventArgs) Handles Me.PreRender


        'Append url arguments to all the 
        'style sheet links in the page header ...
        AppendHashcodeToStylesheetAndJavaScriptURLs()

    End Sub

    Public Function UrlIsLocal(strURL As String) As Boolean
        Dim blnReturn As Boolean

        If strURL.Substring(0, 4) = "http" Then
            If WebsiteFromURL(strURL) = WebsiteFromURL(Request.Url.ToString) Then
                blnReturn = True
            End If
        Else
            blnReturn = True
        End If

        Return blnReturn

    End Function

    Public Function WebsiteFromURL(ByVal strURL As String) As String
        Dim strReturn As String
        Dim intIndex As Integer

        'default the return string to the url string
        strReturn = strURL

        intIndex = 9

        intIndex = strReturn.IndexOf("/", intIndex)
        strReturn = strReturn.Substring(0, intIndex)

        Return strReturn
    End Function
End Class
