Imports System.Collections.Specialized
Imports System.Collections.Generic

Public Class OrderedDictionary(Of KeyType, ValueType)
    Implements IDictionary(Of KeyType, ValueType)

    Private c_objList As New List(Of KeyValuePair(Of KeyType, ValueType))
    Private c_objDictionary As New Dictionary(Of KeyType, ValueType)

    Public Sub Add(ByVal Item As KeyValuePair(Of KeyType, ValueType)) Implements System.Collections.Generic.ICollection(Of System.Collections.Generic.KeyValuePair(Of KeyType, ValueType)).Add
        c_objList.Add(Item)
        c_objDictionary.Add(Item.Key, Item.Value)
    End Sub

    Public Sub Add(ByVal Key As KeyType, ByVal Value As ValueType) Implements System.Collections.Generic.IDictionary(Of KeyType, ValueType).Add
        Me.Add(New KeyValuePair(Of KeyType, ValueType)(Key, Value))
    End Sub

    Public Sub AddRange(ByVal dicOrderedDictionary As OrderedDictionary(Of KeyType, ValueType))
        Dim objKeyValuePair As KeyValuePair(Of KeyType, ValueType)

        'Loop through all the key value pairs in the dictionary to add ...
        For Each objKeyValuePair In dicOrderedDictionary

            'Add the key value pair ....
            Me.Add(objKeyValuePair)
        Next
    End Sub

    Public Function Clone() As OrderedDictionary(Of KeyType, ValueType)
        Dim dicReturn As OrderedDictionary(Of KeyType, ValueType)

        'Create a new ordered dictionary for the clone ...
        dicReturn = New OrderedDictionary(Of KeyType, ValueType)

        'Add all the elements in this dictionary into the new ordered dictionary ...
        dicReturn.AddRange(Me)

        Return dicReturn
    End Function

    Public Sub Clear() Implements System.Collections.Generic.ICollection(Of System.Collections.Generic.KeyValuePair(Of KeyType, ValueType)).Clear
        c_objList.Clear()
        c_objDictionary.Clear()
    End Sub

    Public Function ContainsKey(ByVal Key As KeyType) As Boolean Implements System.Collections.Generic.IDictionary(Of KeyType, ValueType).ContainsKey
        Return c_objDictionary.ContainsKey(Key)
    End Function

    Public Function ContainsValue(ByVal Value As ValueType) As Boolean
        Return (FirstIndexOfValue(Value) > -1)
    End Function

    Public Function Contains(item As System.Collections.Generic.KeyValuePair(Of KeyType, ValueType)) As Boolean Implements System.Collections.Generic.ICollection(Of System.Collections.Generic.KeyValuePair(Of KeyType, ValueType)).Contains
        Throw New NotImplementedException
    End Function

    Public ReadOnly Property Count() As Integer Implements System.Collections.Generic.ICollection(Of System.Collections.Generic.KeyValuePair(Of KeyType, ValueType)).Count
        Get
            Return c_objDictionary.Count
        End Get
    End Property

    Public Function Remove(ByVal Item As KeyValuePair(Of KeyType, ValueType)) As Boolean Implements System.Collections.Generic.ICollection(Of System.Collections.Generic.KeyValuePair(Of KeyType, ValueType)).Remove
        c_objList.Remove(Item)
        c_objDictionary.Remove(Item.Key)
    End Function

    Public Function Remove(ByVal Key As KeyType) As Boolean Implements System.Collections.Generic.IDictionary(Of KeyType, ValueType).Remove
        Dim objValue As ValueType
        Dim objItem As KeyValuePair(Of KeyType, ValueType)

        'Get the value for the item at the key ...
        objValue = Me.Item(Key)

        'Get the key value pair for the item at the key ...
        objItem = New KeyValuePair(Of KeyType, ValueType)(Key, objValue)

        'Remove the item from the list ...
        Me.Remove(objItem)
    End Function

    Public ReadOnly Property Keys() As ICollection(Of KeyType) Implements System.Collections.Generic.IDictionary(Of KeyType, ValueType).Keys
        Get
            Return c_objDictionary.Keys
        End Get
    End Property

    Public Function GetKeysList() As IList(Of KeyType)
        Dim lstReturn As IList(Of KeyType)

        lstReturn = New List(Of KeyType)

        For Each key As KeyType In c_objDictionary.Keys
            lstReturn.Add(key)
        Next

        Return lstReturn

    End Function

    Public Function GetValuesList() As IList(Of ValueType)
        Dim lstReturn As IList(Of ValueType)

        lstReturn = New List(Of ValueType)

        For Each value As ValueType In c_objDictionary.Values
            lstReturn.Add(value)
        Next

        Return lstReturn

    End Function

    Public ReadOnly Property Values() As ICollection(Of ValueType) Implements System.Collections.Generic.IDictionary(Of KeyType, ValueType).Values
        Get
            Return c_objDictionary.Values
        End Get
    End Property

    Public Function GetEnumerator() As IEnumerator(Of System.Collections.Generic.KeyValuePair(Of KeyType, ValueType)) Implements System.Collections.Generic.IEnumerable(Of System.Collections.Generic.KeyValuePair(Of KeyType, ValueType)).GetEnumerator
        Return c_objList.GetEnumerator
    End Function

    Public Function GetValueEnumerator() As IEnumerator Implements System.Collections.IEnumerable.GetEnumerator
        Return c_objList.GetEnumerator
    End Function

    Public Function IndexOfKey(ByVal Key As KeyType) As Integer
        Return c_objList.IndexOf(New KeyValuePair(Of KeyType, ValueType)(Key, c_objDictionary(Key)))
    End Function

    Public Function FirstIndexOfValue(ByVal Value As ValueType) As Integer
        Dim objKeyValuePair As KeyValuePair(Of KeyType, ValueType)
        Dim intIndex As Integer = 0

        'Loop through all the items in the list ...
        For Each objKeyValuePair In c_objList
            If objKeyValuePair.Value.Equals(Value) Then Return intIndex

            'Increment the index ...
            intIndex = intIndex + 1
        Next

        'Not found ...
        Return -1
    End Function

    Default Public Property Item(ByVal Key As KeyType) As ValueType Implements System.Collections.Generic.IDictionary(Of KeyType, ValueType).Item
        Get
            Return c_objDictionary(Key)
        End Get
        Set(ByVal Value As ValueType)
            Dim intIndex As Integer

            'Get the index of the key value pair in the list ...
            intIndex = c_objList.IndexOf(New KeyValuePair(Of KeyType, ValueType)(Key, c_objDictionary(Key)))

            'Set a new pair in the list ...
            c_objList(intIndex) = New KeyValuePair(Of KeyType, ValueType)(Key, Value)

            'Set the item at the index ...
            c_objDictionary(Key) = Value
        End Set
    End Property

    ''' <summary>
    ''' Gets the KeyValuePair item at the specified index
    ''' </summary>
    ''' <param name="intIndex">Zero-based index of the item</param>
    ''' <value></value>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Property ItemByIndex(ByVal intIndex As Integer) As KeyValuePair(Of KeyType, ValueType)
        Get
            Return c_objList(intIndex)
        End Get
        Set(ByVal value As KeyValuePair(Of KeyType, ValueType))
            Dim objKeyValuePair_Old As KeyValuePair(Of KeyType, ValueType)

            'Get the current item at the index in the list ...
            objKeyValuePair_Old = c_objList(intIndex)

            'Set the new item at the index in the list ...
            c_objList(intIndex) = value

            'When the dictionary contains an item with the key ...
            If c_objDictionary.ContainsKey(objKeyValuePair_Old.Key) Then

                'Remove the item with the key ...
                c_objDictionary.Remove(objKeyValuePair_Old.Key)
            End If

            'Add the item to the dictionary ...
            c_objDictionary.Add(value.Key, value.Value)
        End Set
    End Property

    Public Property KeyByIndex(ByVal intIndex As Integer) As KeyType
        Get
            Return ItemByIndex(intIndex).Key
        End Get
        Set(ByVal value As KeyType)
            ItemByIndex(intIndex) = New KeyValuePair(Of KeyType, ValueType)(value, ValueByIndex(intIndex))
        End Set
    End Property

    Public Function KeysWithValue(ByVal objValue As ValueType) As List(Of KeyType)
        Dim lstKeys As List(Of KeyType)
        Dim objKey As KeyType

        'Create a new list to hold the keys that have the value ...
        lstKeys = New List(Of KeyType)

        'Loop through all the keys ...
        For Each objKey In Me.Keys

            'When the value for the key matches 
            'the value we are looking for ...
            If Me(objKey).Equals(objValue) Then

                'Add the key to the list ...
                lstKeys.Add(objKey)
            End If
        Next

        'Return the list of keys ...
        Return lstKeys
    End Function

    ''' <summary>
    ''' Gets the Value at the specified index
    ''' </summary>
    ''' <param name="intIndex">Zero-based index of the item</param>
    ''' <value></value>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Property ValueByIndex(ByVal intIndex As Integer) As ValueType
        Get
            Return ItemByIndex(intIndex).Value
        End Get
        Set(ByVal value As ValueType)
            ItemByIndex(intIndex) = New KeyValuePair(Of KeyType, ValueType)(KeyByIndex(intIndex), value)
        End Set
    End Property

    Public Function TryGetValue(ByVal Key As KeyType, ByRef Value As ValueType) As Boolean Implements System.Collections.Generic.IDictionary(Of KeyType, ValueType).TryGetValue

        'Attempt to get the value ...
        Try
            Value = c_objDictionary.Item(Key)
        Catch ex As Exception
            Return False
        End Try

        Return True
    End Function

    Public Sub RemoveAt(ByVal intIndex As Integer)
        Dim objKeyValuePair As KeyValuePair(Of KeyType, ValueType)

        'Get the key value pair of the item at the position ...
        objKeyValuePair = c_objList(intIndex)

        'Remove the item at the index in the list ...
        c_objList.RemoveAt(intIndex)

        'Remove the item from the dictionary ...
        c_objDictionary.Remove(objKeyValuePair.Key)
    End Sub

    Public Sub Insert(ByVal intIndex As Integer, ByVal Key As KeyType, ByVal Value As ValueType)
        c_objList.Insert(intIndex, New KeyValuePair(Of KeyType, ValueType)(Key, Value))
        c_objDictionary.Add(Key, Value)
    End Sub

    Public Sub CopyTo(ByVal arArray() As KeyValuePair(Of KeyType, ValueType), ByVal intIndex As Integer) Implements System.Collections.Generic.ICollection(Of System.Collections.Generic.KeyValuePair(Of KeyType, ValueType)).CopyTo
        c_objList.CopyTo(arArray, intIndex)
    End Sub

    Public ReadOnly Property IsReadOnly As Boolean Implements System.Collections.Generic.ICollection(Of System.Collections.Generic.KeyValuePair(Of KeyType, ValueType)).IsReadOnly
        Get
            Throw New NotImplementedException
        End Get
    End Property

End Class

