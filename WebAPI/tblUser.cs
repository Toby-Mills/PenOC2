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
    
    public partial class tblUser
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblUser()
        {
            this.tblMessage = new HashSet<tblMessage>();
        }
    
        public int intCompetitor { get; set; }
        public string strUserName { get; set; }
        public string strPassword { get; set; }
        public bool blnEnabled { get; set; }
        public bool blnAdministrator { get; set; }
    
        public virtual tblCompetitor tblCompetitor { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblMessage> tblMessage { get; set; }
    }
}
