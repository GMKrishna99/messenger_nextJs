import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    // extracting data form conversationId
    const { conversationId } = params;
    const currentUser = await getCurrentUser();
    // Unauthorized if user not logged in
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // find existing conversation
    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    if (!existingConversation) {
      return new NextResponse("Invalid ID", { status: 400 });
    }
    // if there is delete conversation
    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        // only users can remove the group
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });
    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          "conversation:remove",
          existingConversation
        );
      }
    });
    return NextResponse.json(deletedConversation);
  } catch (error: any) {
    console.log(error, "ERROR_CONVERSATION_DELETE");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
