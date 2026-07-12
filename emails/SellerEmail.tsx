import {
  Html,
  Head,
  Body,
  Font,
  Tailwind,
  Hr,
  Section,
  Container,
} from 'react-email';
import { HeaderEmail } from './components/HeaderEmail';
import { FooterEmail } from './components/FooterEmail';
import SellerContent from './contents/SellerContent';

export default function Email() {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Body>
        <Tailwind>
          <HeaderEmail />
          <Hr className="my-4 border-gray-300 border-t-2" />

          <Section>
            <Container className="bg-gray-200">
              <SellerContent
                buyerName="Jesús Pereira"
                buyerAddress="Santiago xddd"
                buyerPhoneNumber="+56 9 5069 8031"
              />
            </Container>
          </Section>

          <Hr className="my-4 border-gray-300 border-t-2" />
          <FooterEmail />
        </Tailwind>
      </Body>
    </Html>
  );
}
