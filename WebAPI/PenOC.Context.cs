﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class PenocEntities : DbContext
    {
        public PenocEntities()
            : base("name=PenocEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<lutCategory> lutCategory { get; set; }
        public virtual DbSet<lutClub> lutClub { get; set; }
        public virtual DbSet<lutEventType> lutEventType { get; set; }
        public virtual DbSet<lutGender> lutGender { get; set; }
        public virtual DbSet<lutTechnical> lutTechnical { get; set; }
        public virtual DbSet<tblCommittee> tblCommittee { get; set; }
        public virtual DbSet<tblCompetitor> tblCompetitor { get; set; }
        public virtual DbSet<tblCourse> tblCourse { get; set; }
        public virtual DbSet<tblDownload> tblDownload { get; set; }
        public virtual DbSet<tblEvent> tblEvent { get; set; }
        public virtual DbSet<tblEvent_EventType> tblEvent_EventType { get; set; }
        public virtual DbSet<tblFile> tblFile { get; set; }
        public virtual DbSet<tblForum> tblForum { get; set; }
        public virtual DbSet<tblLog> tblLog { get; set; }
        public virtual DbSet<tblMembership> tblMembership { get; set; }
        public virtual DbSet<tblMessage> tblMessage { get; set; }
        public virtual DbSet<tblMinutes> tblMinutes { get; set; }
        public virtual DbSet<tblNews> tblNews { get; set; }
        public virtual DbSet<tblResult> tblResult { get; set; }
        public virtual DbSet<tblSplit> tblSplit { get; set; }
        public virtual DbSet<tblThread> tblThread { get; set; }
        public virtual DbSet<tblUser> tblUser { get; set; }
        public virtual DbSet<tblVenue> tblVenue { get; set; }
        public virtual DbSet<tblWorkItem> tblWorkItem { get; set; }
    }
}