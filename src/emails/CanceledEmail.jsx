import { Html, Head, Preview, Body, Container, Text, Button, Section } from "@react-email/components";
import { Img } from "@react-email/img"

export function Canceled({ 
  userName, 
  planName,
  siteUrl = "https://ecocompute.tech", 

}) {
  return (
    <Html>
      <Head />
      <Preview>Your {planName} subscription has been canceled</Preview>
      <Body style={{ backgroundColor: "#f9fafb", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "12px", maxWidth: "600px", margin: "40px auto" }}>
          <Section style={{ textAlign: "center" }}>
            <Img
              src={`${siteUrl}/logo.png`}
              alt="Logo"
              width="150"
              height="auto"
              style={{ 
                margin: "0 auto",
                paddingRight: "10px",
              }}
            />
            <Img
              src={`${siteUrl}/canceled.png`}
              alt="Logo"
              width="200"
              height="40"
              style={{ 
                margin: "0 auto",
                paddingRight: "10px",
              }}
            />
            <Text style={{ fontSize: "20px", fontWeight: "bold", color: "#111827", fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
              We're sorry to see you go!
            </Text>
          </Section>
          <Text style={{ fontSize: "16px", color: "#374151", marginTop: "12px" }}>
            Your <strong>{planName}</strong> subscription has been successfully canceled.  
            You’ll retain access to your premium tools until the end of your current billing period.
          </Text>
          <Text style={{ fontSize: "16px", color: "#374151", marginTop: "12px" }}>
            If this was a mistake or you’d like to rejoin, you can reactivate your plan anytime.
          </Text>
          <Button
            href="https://servana.com/pricing"
            style={{
              backgroundColor: "#2563eb",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "5px",
              textDecoration: "none",
              marginTop: "24px",
              display: "inline-block",
              fontWeight: "bold",
            }}
          >
            Reactivate Subscription
          </Button>
          <Text style={{ fontSize: "14px", color: "#6b7280", marginTop: "20px" }}>
            Thank you for trying Ecocompute — we hope to see you again soon!        

          </Text>
          <Section style={{ fontSize: "14px", color: "#6b7280", marginTop: "20px" }}>
            The Eco team           
          </Section>

          <Section
          style={{            
            borderTop: "1px solid #e5e7eb",
            paddingTop: "25px",
            marginTop: "50px",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: "#9ca3af",
              fontSize: "12px",
              lineHeight: 1.8,
              margin: 0,              
            }}
          >
            © 2026 Ecocompute. All rights reserved.
            <br />
            Secure tools and services built for modern teams.
          </Text>
        </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default Canceled