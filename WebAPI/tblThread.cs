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
    
    public partial class tblThread
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblThread()
        {
            this.tblMessage = new HashSet<tblMessage>();
        }
    
        public int idThread { get; set; }
        public string strThread { get; set; }
        public int intForum { get; set; }
    
        public virtual tblForum tblForum { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblMessage> tblMessage { get; set; }
    }
}
