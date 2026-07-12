import { Section, Row, Column, Img, Link } from 'react-email';

export const HeaderEmail = () => {
  return (
    <Section className="my-10 px-8 py-10">
      <Row>
        <Column align="center">
          <Img
            alt="React Email logo"
            height="42"
            src="https://react.email/static/logo-without-background.png"
          />
        </Column>
      </Row>
      <Row className="mt-10">
        <Column align="center">
          <table>
            <tr>
              <td className="px-2">
                <Link className="text-gray-600 [text-decoration:none]" href="#">
                  About
                </Link>
              </td>
              <td className="px-2">
                <Link className="text-gray-600 [text-decoration:none]" href="#">
                  Blog
                </Link>
              </td>
              <td className="px-2">
                <Link className="text-gray-600 [text-decoration:none]" href="#">
                  Company
                </Link>
              </td>
              <td className="px-2">
                <Link className="text-gray-600 [text-decoration:none]" href="#">
                  Features
                </Link>
              </td>
            </tr>
          </table>
        </Column>
      </Row>
    </Section>
  );
};
