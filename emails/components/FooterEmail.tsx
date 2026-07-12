import { Section, Row, Column, Img, Text, Link } from 'react-email';

export const FooterEmail = () => {
  return (
    <Section className="text-center">
      <table className="w-full">
        {/* <tr className="w-full">
          <td align="center">
            <Img
              alt="React Email logo"
              height="42"
              src="https://react.email/static/logo-without-background.png"
              width="42"
            />
          </td>
        </tr> */}
        <tr className="w-full">
          <td align="center">
            <Text className="my-2 font-semibold text-[16px] text-gray-900 leading-6">
              El Rincón de Evangelyn
            </Text>
            {/* <Text className="mt-1 mb-0 text-[16px] text-gray-500 leading-6">
              Think different
            </Text> */}
          </td>
        </tr>
        <tr>
          <td align="center">
            <Row className="table-cell h-11 w-14 align-bottom">
              <Column className="pr-2">
                <Link href="#">
                  <Img
                    alt="Facebook"
                    height="36"
                    src="https://react.email/static/facebook-logo.png"
                    width="36"
                  />
                </Link>
              </Column>
              <Column>
                <Link href="#">
                  <Img
                    alt="Instagram"
                    height="36"
                    src="https://react.email/static/instagram-logo.png"
                    width="36"
                  />
                </Link>
              </Column>
            </Row>
          </td>
        </tr>
        <tr>
          <td align="center">
            <Text className="my-2 font-semibold text-[16px] text-gray-500 leading-6">
              Region de Los Rios, Futrono, Llifen, Callejón San Francisco S/N
            </Text>
            <Text className="mt-1 mb-0 font-semibold text-[16px] text-gray-500 leading-6">
              <Link href="mailto:nayadee73@gmail.com">
                nayadee73@gmail.com
              </Link>{' '}
            </Text>
            <Text className="mt-1 mb-0 font-semibold text-[16px] text-gray-500 leading-6">
              {/* Posible automatización de mensajes */}
              <Link href="https://wa.me/+56964453974">+56 9 6445 3974</Link>
            </Text>
          </td>
        </tr>
      </table>
    </Section>
  );
};
