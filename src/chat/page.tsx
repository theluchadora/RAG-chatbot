"use client" 

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
// import { Response } from "@/components/ai-elements/response";
import { Loader } from "@/components/ai-elements/loader";


// this component is client componet(for interacting/interactivity)
export default function RAGChatBot() {
    return <div className="max-w-4xl mx-auto p-6 relative size-full h-[calc(100vh)]">
        <div className="flex flex-col h-full">
            <Conversation className="h-full">
                <ConversationContent>the content will be here</ConversationContent>
                <ConversationScrollButton />
            </Conversation>
        </div>
    </div>
}