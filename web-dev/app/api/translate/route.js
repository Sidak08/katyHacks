// import { Translate } from "@google-cloud/translate";

export const POST = async (req) => {
  const translate = {
    projectId: "my_project",
    keyFilename: "path/to/your/keyfile.json",
  };

  const { word, language } = await req.json();

  // try {
  //   const [translation] = await translate.translate(word, language);
  //   return new Response(JSON.stringify({ translation }), {
  //     status: 200,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // } catch (err) {
  //   console.error("ERROR:", err);
  //   return new Response(JSON.stringify({ error: "Translation failed" }), {
  //     status: 500,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // }
};
