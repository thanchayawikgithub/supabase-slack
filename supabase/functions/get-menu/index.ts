// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { WebClient } from "npm:@slack/web-api@7.0.2";
import { createClient } from "npm:@supabase/supabase-js";
// import { Database } from "../../types/database.types.ts";

const slackBotToken = Deno.env.get("SLACK_TOKEN") ?? "";
const botClient = new WebClient(slackBotToken);
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!,
);

Deno.serve(async (req) => {
  const { data: pizzas, error } = await supabase.from("pizzas").select("*");

  if (error) {
    console.log(error);
  }

  if (!pizzas) {
    return new Response(JSON.stringify("No Menu Available"), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const blockKitMessage = {
    blocks: pizzas.map((pizza) => ({
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          `*${pizza.name}*\n*Ingredients:* ${pizza.ingredients}\n*Price:* ${pizza.price}`, // Formatted pizza details
      },
      accessory: {
        type: "image",
        image_url: pizza.image,
        alt_text: `${pizza.name} Image`, // Alt text for each pizza image
      },
    })),
  };

  return new Response(JSON.stringify(blockKitMessage), {
    headers: { "Content-Type": "application/json" },
  });
});

// const blockKitMessage = {
//   blocks: [
//     {
//       type: "section",
//       text: {
//         type: "mrkdwn", // Use markdown for better formatting
//         text: `*Pizza Name:* ${pizzas[0].name}`, // Include pizza name
//       },
//     },
//     {
//       type: "image",
//       title: {
//         type: "plain_text",
//         text: pizzas[0].name, // Image title
//       },
//       image_url: pizzas[0].image, // Image URL from pizza data
//       alt_text: "Pizza Image", // Alternative text for accessibility
//     },
//     {
//       type: "section",
//       text: {
//         type: "mrkdwn",
//         text: `*Ingredients:*\n${pizzas[0].ingredients}`, // Join ingredients
//       },
//     },
//   ],
// };
