//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebAPI
{
    using System;
    using System.Collections.Generic;
    
    public partial class tblCompetitor
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblCompetitor()
        {
            this.tblResult = new HashSet<tblResult>();
            this.tblEvent = new HashSet<tblEvent>();
            this.tblEvent1 = new HashSet<tblEvent>();
        }
    
        public int idCompetitor { get; set; }
        public string strFirstName { get; set; }
        public string strSurname { get; set; }
        public Nullable<int> intGender { get; set; }
        public Nullable<int> intCategory { get; set; }
        public Nullable<System.DateTime> dteBirthDate { get; set; }
        public string strTelephone1 { get; set; }
        public string strTelephone2 { get; set; }
        public string strEmail { get; set; }
        public string strReadOnlyFullName { get; set; }
        public Nullable<long> intEmitNumber { get; set; }
        public string strReadOnlyFirstNameMatch { get; set; }
        public string strReadOnlySurnameMatch { get; set; }
    
        public virtual lutCategory lutCategory { get; set; }
        public virtual lutGender lutGender { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblResult> tblResult { get; set; }
        public virtual tblUser tblUser { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblEvent> tblEvent { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblEvent> tblEvent1 { get; set; }
    }
}
