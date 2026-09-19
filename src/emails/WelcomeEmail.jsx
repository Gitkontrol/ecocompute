import { Html } from "@react-email/html";
import { Heading } from "@react-email/heading";
import { Button } from "@react-email/button";
import { Text } from "react-email";
import { Section } from "@react-email/section";
import { Img } from "@react-email/img";

export function Welcome({
  userName = "Valued User",
  planName,
  siteUrl = "https://ecocompute.tech",
}) {
  return (
    <Html lang="en">
      <Section
        style={{
          padding: "40px 0",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Img
          src={`${siteUrl}/logo.png`}
          alt="Logo"
          width="200"
          height="40"
          style={{ 
            margin: "0 auto",
            paddingRight: "10px",
          }}
        />

         <Img
          src={`${siteUrl}/welcome.jpg`}
          alt="Welcome Logo"
          width="500"
          height="300"
          style={{ margin: "0 auto" }}
        />

        <Section
          style={{
            marginTop: "-50px",
            maxWidth: "600px",            
            textAlign: "center",
          }}
        >
          <Heading
            as="h2"
            style={{
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              color: "#111827",
              fontSize: "24px",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            Welcome to Ecocompute, {userName}!
          </Heading>

          <Text
            style={{
              color: "#374151",
              fontSize: "16px",
              marginBottom: "20px",
              lineHeight: "1.6",
            }}
          >
            Your <strong>{planName}</strong> subscription has been successfully
            activated. You now have access to premium tools and features to
            power your workflow.
          </Text>

          <Button
            href={siteUrl}
            style={{
              backgroundColor: "#2563eb",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              display: "inline-block",
            }}
          >
            Go to Dashboard
          </Button>

          <Text
            style={{
              color: "#6b7280",
              fontSize: "14px",
              marginTop: "25px",
            }}
          >
            Thank you for choosing Ecocompute. Let's build something amazing
            together!
          </Text>
        </Section>

        <Section
          style={{
            textAlign: "left",
            maxWidth: "600px",
            margin: "40px auto 0 auto",
            paddingLeft: "20px",
            marginLeft: "70px",
          }}
        >
          <Text
            style={{
              color: "#6b7280",
              fontSize: "14px",
              paddingLeft: "166px",
              marginTop: "-30px",
              width: "100px",
            }}
          >
            The Eco Team
          </Text>
        </Section>

        <Section
          style={{            
            borderTop: "1px solid #e5e7eb",
            paddingTop: "25px",
            marginTop: "30px",
            textAlign: "center",
            width: "50%",
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
      </Section>
    </Html>
  );
}

export default Welcome