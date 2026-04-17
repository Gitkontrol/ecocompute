import { Html, Head, Preview, Body, Container, Text, Button, Section } from "@react-email/components";

export function Failed({ userName, planName }) {
  return (
    <Html>
      <Head />
      <Preview>Payment failed for your {planName} plan</Preview>

      <Body style={{ backgroundColor: "#f9fafb", fontFamily: "Arial, sans-serif" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "12px",
            maxWidth: "600px",
            margin: "40px auto",
          }}
        >
          <Section style={{ textAlign: "center" }}>          
            <img
              src="/Failed-Payment.svg"
              alt="Failed Payment"
              width={300}
              height={300}
              style={{
                display: "block",
                margin: "0 auto",
              }}  
            />
            
            <Text style={{ fontSize: "20px", fontWeight: "bold", color: "#b91c1c" }}>
              ⚠️ Payment Failed — Action Needed
            </Text>
          </Section>

          <Text style={{ fontSize: "16px", color: "#374151", marginTop: "12px" }}>
            Dear {userName || "Customer"}, we were unable to process your most recent payment for the{" "}
            <strong>{planName}</strong> plan.
          </Text>

          <Text style={{ fontSize: "16px", color: "#374151", marginTop: "12px" }}>
            Please update your payment information to avoid any interruption in your access.
          </Text>

          <Section style={{ textAlign: "left", marginTop: "24px" }}>
            <Button
              href="https://servana.com/account/billing"
              style={{
                backgroundColor: "#dc2626",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
                display: "inline-block",
              }}
            >
              Update Payment Info
            </Button>
          </Section>

          <Text style={{ fontSize: "14px", color: "#6b7280", marginTop: "20px" }}>
            If you recently updated your payment details, you can ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
