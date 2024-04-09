// import { Webhook, WebhookRequiredHeaders } from 'svix';
// import { headers } from 'next/headers';

// import { IncomingHttpHeaders } from 'http';

// import { NextResponse } from 'next/server';
// import { updateUser, fetchUserInfo } from '@/lib/actions/user.actions';

// type EventType = 'user.created' | 'user.updated';

// type Event = {
//   data: Record<string, string | number | Record<string, string>[]>;
//   object: 'event';
//   type: EventType;
// };
// export const POST = async (request: Request) => {
//   const payload = await request.json();
//   const header = headers();

//   const heads = {
//     'svix-id': header.get('svix-id'),
//     'svix-timestamp': header.get('svix-timestamp'),
//     'svix-signature': header.get('svix-signature'),
//   };

//   // Activitate Webhook in the Clerk Dashboard.
//   // After adding the endpoint, you'll see the secret on the right side.
//   const wh = new Webhook(process.env.WEBHOOK_SECRET || '');

//   let evnt: Event | null = null;

//   try {
//     evnt = wh.verify(
//       JSON.stringify(payload),
//       heads as IncomingHttpHeaders & WebhookRequiredHeaders
//     ) as Event;
//   } catch (err) {
//     return NextResponse.json({ message: err }, { status: 400 });
//   }

//   const eventType: EventType = evnt?.type!;

//   // Listen user creation event
//   if (eventType === 'user.created') {
//     // Resource: https://clerk.com/docs/reference/backend-api/tag/users#operation/Createuser
//     // Show what evnt?.data sends from above resource
//     const { id, username, name, userImg, folders, isOnboard } =
//       evnt?.data ?? {};

//     try {
//       // @ts-ignore
//       await updateUser(
//         // @ts-ignore
//         { id, username, name, userImg, folders, isOnboard }
//       );

//       return NextResponse.json({ message: 'User created' }, { status: 201 });
//     } catch (err) {
//       console.log(err);
//       return NextResponse.json(
//         { message: 'Internal Server Error' },
//         { status: 500 }
//       );
//     }
//   }

//   // Listen organization updation event
//   if (eventType === 'user.updated') {
//     try {
//       // Resource: https://clerk.com/docs/reference/backend-api/tag/Organizations#operation/UpdateOrganization
//       // Show what evnt?.data sends from above resource
//       const { id, username, name, userImg, folders, isOnboard } = evnt?.data;
//       console.log('updated', evnt?.data);

//       // @ts-ignore
//       await updateUser({ id, username, name, userImg, folders, isOnboard });

//       return NextResponse.json({ message: 'Member Updated' }, { status: 201 });
//     } catch (err) {
//       console.log(err);

//       return NextResponse.json(
//         { message: 'Internal Server Error' },
//         { status: 500 }
//       );
//     }
//   }
// };

import { IncomingHttpHeaders } from 'http';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook, WebhookRequiredHeaders } from 'svix';

const webhookSecret = process.env.WEBHOOK_SECRET || '';

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    'svix-id': headersList.get('svix-id'),
    'svix-timestamp': headersList.get('svix-timestamp'),
    'svix-signature': headersList.get('svix-signature'),
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, username, name, userImg, folders, isOnboard } = evt?.data;

    await updateUser({ id, username, name, userImg, folders, isOnboard });
  }
}

type EventType = 'user.created' | 'user.updated' | '*';

type Event = {
  data: Record<string, string | number>;
  object: 'event';
  type: EventType;
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;

function updateUser(arg0: {
  id: any;
  username: any;
  name: any;
  userImg: any;
  folders: any;
  isOnboard: any;
}) {
  throw new Error('Function not implemented.');
}
