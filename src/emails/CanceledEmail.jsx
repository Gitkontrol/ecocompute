import { Html, Head, Preview, Body, Container, Text, Button, Section } from "@react-email/components";

export function Cancelled({ userName, planName }) {
  return (
    <Html>
      <Head />
      <Preview>Your {planName} subscription has been canceled</Preview>
      <Body style={{ backgroundColor: "#f9fafb", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "12px", maxWidth: "600px", margin: "40px auto" }}>
          <Section style={{ textAlign: "center" }}>
            <img
              src="/cancelled.jpg"
              alt="Cancelled"
              height={300}
              width={300}
              style={{ margin: "0 auto"}}
            />
            <Text style={{ fontSize: "20px", fontWeight: "bold", color: "#111827" }}>
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
              borderRadius: "8px",
              textDecoration: "none",
              marginTop: "24px",
              display: "inline-block",
              fontWeight: "bold",
            }}
          >
            Reactivate Subscription
          </Button>
          <Text style={{ fontSize: "14px", color: "#6b7280", marginTop: "20px" }}>
            Thank you for trying Servana — we hope to see you again soon!        

          </Text>
          <Section style={{ fontSize: "14px", color: "#6b7280", marginTop: "50px" }}>
            The Eco team
            <img
              src="/ecologo.png"
              alt="logo"
              width={120}
              height={120}
              style={{ display: "block", marginLeft: "-5px"}}
            />
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
