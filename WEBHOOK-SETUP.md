# Sanity webhook setup

This webhook makes the live site update within seconds of publishing in Sanity, instead of waiting up to 30 seconds for the page cache to expire. The endpoint is `app/api/revalidate/route.ts`.

> **Do not commit this file while it contains the secret.** Delete the secret line once it is saved in Sanity and Vercel.

## 1. Create the webhook in Sanity

Go to sanity.io/manage → Helicopter Services → API → Webhooks → **Create webhook**, and fill in:

| Field | Value |
|---|---|
| **Name** | `Revalidate website` |
| **Description** | `Refreshes helicopterservices.co.uk when content is published` |
| **URL** | `https://www.helicopterservices.co.uk/api/revalidate` |
| **Dataset** | `production` |
| **Trigger on** | Tick **Create**, **Update** and **Delete** |
| **Filter** | Leave empty |
| **Projection** | Leave empty |
| **Status** | Leave **Enable webhook** ticked |
| **HTTP method** | `POST` |
| **HTTP headers** | Leave empty |
| **API version** | Leave `v2021-03-25` |
| **Drafts** | Leave unticked, so it only fires on publish |
| **Versions** | Leave unticked |
| **Secret** | `3002b0591b0f670407c50e5f387235986a2f052d24b308a9` |

Any long random string works as the secret. It just has to match the one in Vercel.

Click **Save**.

## 2. Add the secret in Vercel

1. Go to Project → Settings → Environment Variables.
2. Add `SANITY_REVALIDATE_SECRET` with exactly the same value as the webhook secret, for **Production**.

## 3. Deploy

Deploy the current changes. The `/api/revalidate` endpoint isn't on the live site until they're deployed. Vercel also only picks up a new environment variable on a new deploy.

Until then, the site still refreshes on its own every 30 seconds.

## 4. Test it

1. Publish a small edit in Sanity Studio.
2. In sanity.io/manage, go to API → Webhooks, open the webhook and check its **Attempts log**:

| Response | Meaning |
|---|---|
| **200** | Working. The site updates within a few seconds. |
| **401** | The secret in Vercel doesn't match the webhook secret. |
| **500**, "SANITY_REVALIDATE_SECRET is not set" | The environment variable is missing, or you haven't redeployed since adding it. |
| **404** | The endpoint isn't deployed yet. |
