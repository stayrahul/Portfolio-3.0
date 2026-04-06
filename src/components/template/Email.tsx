import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Img,
  Row,
  Column,
  Link,
  Hr,
  Preview,
} from "@react-email/components";

import { selfData } from "@/constant";

interface EmailTemplateProps {
  userName: string;
  contactReason: string;
  userMessage: string;
}

export function EmailTemplate({
  userName,
  contactReason,
  userMessage,
}: EmailTemplateProps) {
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Preview>Message received from {userName} 🚀</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header / Logo Section */}
          <Section style={header}>
            <Row>
              <Column align="center">
                <Img
                 src="https://ibb.co/HTzyJvLX"                  
                  alt="Sushant Logo"
                  width="50"
                  height="50"
                  style={logo}
                />
                <Text style={brandText}>SUSHANT KUSHWAHA</Text>
              </Column>
            </Row>
          </Section>

          {/* Main Content Card */}
          <Section style={contentCard}>
            <Text style={heading}>Hey {userName}! 👋</Text>
            <Text style={text}>
              Thanks for reaching out! Your message just landed in my inbox. 
              I&apos;ll get back to you faster than a code deployment (hopefully).
            </Text>

            <Hr style={divider} />

            <Section style={messageBox}>
              <Text style={label}>REASON FOR CONTACT</Text>
              <Text style={value}>{contactReason}</Text>

              <Text style={label}>YOUR MESSAGE</Text>
              <Text style={messageText}>&quot;{userMessage}&quot;</Text>
            </Section>

            <Hr style={divider} />

            <Text style={subtext}>
              While you wait, feel free to check out my latest work or follow my journey online:
            </Text>

            {/* Social Links Row */}
            <Row style={socialRow}>
              <Column align="center">
                <Link href={`https://github.com/${selfData.socials_username.github}`} style={socialLink}>GitHub</Link>
                <span style={spacer}>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
                <Link href={`https://instagram.com/${selfData.socials_username.instagram}`} style={socialLink}>Instagram</Link>
                <span style={spacer}>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
                <Link href={`https://x.com/${selfData.socials_username.twitter}`} style={socialLink}>Twitter</Link>
              </Column>
            </Row>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              &copy; {currentYear} Sushant Kushwaha | Built with Passion in Nepal
            </Text>
            <Text style={footerSubtext}>
              You received this because you used the contact form at sushant.dev
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// --- STYLES ---

const main: React.CSSProperties = {
  backgroundColor: "#050505", // Deep Space Black
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  padding: "40px 0",
};

const container: React.CSSProperties = {
  margin: "0 auto",
  width: "580px",
  maxWidth: "100%",
};

const logo: React.CSSProperties = {
  marginBottom: "10px",
  borderRadius: "12px",
  border: "1px solid #333",
};

const header: React.CSSProperties = {
  padding: "20px 0",
};

const brandText: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "bold",
  letterSpacing: "4px",
  textTransform: "uppercase",
  margin: "0",
};

const contentCard: React.CSSProperties = {
  backgroundColor: "#111111", // Dark Gray Card
  borderRadius: "24px",
  border: "1px solid #222",
  padding: "40px",
  textAlign: "left" as const,
};

const heading: React.CSSProperties = {
  color: "#7c3aed", // Primary Violet
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 20px",
};

const text: React.CSSProperties = {
  color: "#cccccc",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 20px",
};

const divider: React.CSSProperties = {
  borderColor: "#222",
  margin: "30px 0",
};

const messageBox: React.CSSProperties = {
  padding: "10px 0",
};

const label: React.CSSProperties = {
  color: "#555",
  fontSize: "10px",
  fontWeight: "bold",
  letterSpacing: "2px",
  margin: "0 0 8px",
};

const value: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 20px",
};

const messageText: React.CSSProperties = {
  color: "#bbbbbb",
  fontSize: "14px",
  fontStyle: "italic",
  lineHeight: "22px",
  margin: "0",
};

const subtext: React.CSSProperties = {
  color: "#666",
  fontSize: "13px",
  textAlign: "center",
  margin: "0 0 15px",
};

const socialRow: React.CSSProperties = {
  width: "100%",
};

const socialLink: React.CSSProperties = {
  color: "#7c3aed",
  fontSize: "14px",
  fontWeight: "bold",
  textDecoration: "none",
};

const spacer: React.CSSProperties = {
  color: "#333",
};

const footer: React.CSSProperties = {
  textAlign: "center" as const,
  padding: "30px 0",
};

const footerText: React.CSSProperties = {
  color: "#444",
  fontSize: "12px",
  fontWeight: "bold",
  margin: "0 0 5px",
};

const footerSubtext: React.CSSProperties = {
  color: "#333",
  fontSize: "10px",
  margin: "0",
};