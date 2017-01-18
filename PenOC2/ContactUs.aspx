<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Site.Master" CodeBehind="ContactUs.aspx.vb" Inherits="PenOC2.ContactUs" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <meta property="og:url" content="http://www.penoc.org.za/ContactUs.aspx" />
    <meta property="og:title" content="PenOC Contact Details" />
    <meta property="og:description" content="Peninsula Orienteering Club contact details" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div id="divContactDetails" class="card large-card">
        <span class="cardTitle">Get in touch with us</span>
        <div>
            <h1><img src="Styles/Images/Email.svg" />
                General Enquires</h1>
            <span class="clickable"><a href="mailto:info@penoc.org.za">info@penoc.org.za</a></span>
        </div>
        <div>
            <h1><img src="Styles/Images/Email.svg" />
                Mailing List</h1>
            <span>To receive occassional emails with details of upcoming events, as well as results, join our mailing list.</span><br />
            <span>Subscribe:</span><br />
            <span class="clickable"><a href="mailto:penoc+subscribe@googlegroups.com">penoc+subscribe@googlegroups.com</a></span><br />
            <span>Unsubscribe:</span><br />
            <span class="clickable"><a href="mailto:penoc+unsubscribe@googlegroups.com">penoc+unsubscribe@googlegroups.com</a></span>
        </div>
        
        <div>
            <h1><img src="Styles/Images/Facebook.svg" />
                Facebook</h1>
                <span>Join in the discussion on Facebook:</span><br />
            <span class="clickable"><a href="https://www.facebook.com/PeninsulaOrienteeringClub" target="_blank" >www.facebook.com/PeninsulaOrienteeringClub</a></span>
        </div>

        <div>
            <h1><img src="Styles/Images/Membership.svg" />
                Membership</h1>
                <span>To join the club, complete the</span><span class="clickable"><a href="https://goo.gl/forms/4CJ20P4N3FOnF8Ef2" target="_blank" >Membership Form</a></span><br />
                <span>Subs can then be paid via EFT to the banking details below</span>
        </div>

        <div>
            <h1><img src="Styles/Images/BankingDetails.svg" />
                Banking Details</h1>
                <span>Payments such as membership subs can be paid to:</span><br />
            <dl>
                <dt>Bank</dt><dd>Standard Bank</dd>
                <dt>Branch</dt><dd>051001 (Adderley Street)</dd>
                <dt>Name</dt><dd>Peninsula Orienteering Club</dd>
                <dt>Account No.</dt><dd>07 427 3566</dd>
            </dl>
            
        </div>

        <div>
            <h1><img src="Styles/Images/Website.svg" />
                Website</h1>
                <span>To report any problems with the website:</span><br />
            <span class="clickable"><a href="mailto:website@penoc.org.za">website@penoc.org.za</a></span>
        </div>
</asp:Content>
