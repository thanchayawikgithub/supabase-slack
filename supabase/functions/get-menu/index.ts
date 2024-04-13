// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { WebClient } from "npm:@slack/web-api@7.0.2";
import { createClient } from "npm:@supabase/supabase-js";
import { Database } from "../_shared/database.types.ts";

const slackBotToken = Deno.env.get("SLACK_TOKEN") ?? "";
const botClient = new WebClient(slackBotToken);
const supabase = createClient<Database>(
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
    blocks: pizzas.flatMap((pizza) => [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            `*${pizza.name}*\n*Ingredients:* ${pizza.ingredients}\n*Price:* ${pizza.price}`, // Formatted pizza details
        },
        accessory: {
          type: "image",
          image_url: pizza.image,
          alt_text: `${pizza.name} Image`,
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Select",
              emoji: true,
            },
            value: `${pizza.id}`,
            action_id: "add_to_cart",
          },
        ],
      },
      {
        type: "divider",
      },
    ]),
  };

  return new Response(JSON.stringify(blockKitMessage), {
    headers: { "Content-Type": "application/json" },
  });
});
