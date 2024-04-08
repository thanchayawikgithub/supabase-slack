export const customizeBlock = {
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text":
          "*Hawaiian*\n*Ingredients:* Ham, Bacon, Pineapple, Mozzarella Cheese and Pizza Sauce\n*Price:* 379 ฿",
      },
      "accessory": {
        "type": "image",
        "image_url":
          "https://zgjogohmwzgitslnlxuo.supabase.co/storage/v1/object/public/images/Hawaiien.png",
        "alt_text": "Hawaiian Image",
      },
    },
    {
      "type": "input",
      "label": {
        "type": "plain_text",
        "text": "Select Size",
        "emoji": true,
      },
      "element": {
        "type": "static_select",
        "placeholder": {
          "type": "plain_text",
          "text": "Select pizza size",
          "emoji": true,
        },
        "options": [
          {
            "text": {
              "type": "plain_text",
              "text": "Medium",
              "emoji": true,
            },
            "value": "medium",
          },
          {
            "text": {
              "type": "plain_text",
              "text": "Large | +150 ฿",
              "emoji": true,
            },
            "value": "large",
          },
        ],
        "initial_option": {
          "text": {
            "type": "plain_text",
            "text": "Medium",
            "emoji": true,
          },
          "value": "medium",
        },
        "action_id": "select_size",
      },
    },
    {
      "type": "input",
      "label": {
        "type": "plain_text",
        "text": "Select pizza crust",
        "emoji": true,
      },
      "element": {
        "type": "static_select",
        "placeholder": {
          "type": "plain_text",
          "text": "Select crust",
          "emoji": true,
        },
        "options": [
          {
            "text": {
              "type": "plain_text",
              "text": "Original",
              "emoji": true,
            },
            "value": "original",
          },
          {
            "text": {
              "type": "plain_text",
              "text": "Thin & Crispy",
              "emoji": true,
            },
            "value": "thin",
          },
        ],
        "initial_option": {
          "text": {
            "type": "plain_text",
            "text": "Original",
            "emoji": true,
          },
          "value": "original",
        },
        "action_id": "select_size",
      },
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Confirm",
            "emoji": true,
          },
          "value": "click_me_123",
          "action_id": "confirm_order",
        },
        {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Cancel",
            "emoji": true,
          },
          "value": "click_me_123",
          "action_id": "cancel_order",
        },
      ],
    },
  ],
};
