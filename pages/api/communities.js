import { SiteClient } from "datocms-client";

export default async function requestsTaker(request, response) {
  if (request.method === "POST") {
    const TOKEN = "9cf02c12a46677d7cc6fd42363e3cf";
    const client = new SiteClient(TOKEN);

    const registryCreate = await client.items.create({
      itemType: "1006403",
      ...request.body,
      //   title: "Harry Potter",
      //   imageUrl:
      //     "https://i.pinimg.com/564x/8b/30/4d/8b304d3d6b424565cc33fe7e32779075.jpg",
      //   creatorSlug: "carolsteffen",
    });

    response.json({
      data: "Algum dado",
      registryCreate: registryCreate,
    });
    return;
  }

  response.status(404).json({
    message: "Ainda não temos nada no Get, mas no Post sim",
  });
}
