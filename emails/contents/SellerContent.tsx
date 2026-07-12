import { Column, Container, Heading, Row, Section, Text } from 'react-email';

interface Props {
  buyerName: string;
  buyerAddress: string;
  buyerPhoneNumber: string;
}

export default function SellerContent({
  buyerName,
  buyerAddress,
  buyerPhoneNumber,
}: Props) {
  const arrayOfInfo = [
    {
      id: 1,
      titleInfo: 'Dirección del comprador',
      info: buyerAddress,
    },
    {
      id: 2,
      titleInfo: 'Número de teléfono',
      info: buyerPhoneNumber,
    },
  ];

  return (
    <Section className="p-4 text-center">
      <Text className="text-2xl">
        Encargo de pedido a nombre de: {buyerName}
      </Text>

      <Container className="mx-auto max-w-150 rounded-lg bg-white p-6">
        <Heading className="mb-10.5 text-center text-[24px] leading-8">
          Información de contacto
        </Heading>

        {arrayOfInfo.map((info) => (
          <Section key={info.id} className="mb-9">
            {/* Fila 1: número + título, ambos centrados entre sí */}
            <Row className="pr-8 pl-3">
              <Column
                width="24"
                height="24"
                align="center"
                valign="middle"
                className="pr-4.5 h-6 w-6"
              >
                <Row>
                  <Column
                    align="center"
                    valign="middle"
                    width="24"
                    height="24"
                    className="h-6 w-6 rounded-full bg-indigo-600 font-semibold text-white text-[12px] leading-none"
                  >
                    {info.id}
                  </Column>
                </Row>
              </Column>
              <Column valign="middle">
                <Heading
                  as="h2"
                  className="m-0 text-gray-900 text-[18px] leading-7"
                >
                  {info.titleInfo}
                </Heading>
              </Column>
            </Row>

            {/* Fila 2: la dirección, debajo, alineada con el texto del título (no con el número) */}
            <Row className="pr-8 pl-3">
              <Column width="24" className="pr-4.5" />
              <Column valign="top">
                <Text className="m-0 text-gray-500 text-[14px] leading-6">
                  {info.info}
                </Text>
              </Column>
            </Row>
          </Section>
        ))}
      </Container>
    </Section>
  );
}
