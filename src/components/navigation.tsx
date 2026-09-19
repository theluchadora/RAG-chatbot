import {
    SignInButton,
    SignOutButton,
    SignUpButton,
    Show
} from "@clerk/nextjs";
import { Button } from "./ui/button";

export const Navigation = () => {
    return (
        <nav className="border-b border-(--foreground)/10">
            <div className="flex container h-16 items-center justify-between px-4 mx-auto">
                <div className="text-xl font-semibold">RAG-ChatBot</div>
                <div className="flex gap-2">
                    <Show when="signed-out">
                        <SignInButton mode="modal">
                            <Button>Sign In</Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <Button>Sign Up</Button>
                        </SignUpButton>
                    </Show>
                    
                    <Show when="signed-in">
                        <SignOutButton>
                            <Button>Sign Out</Button>
                        </SignOutButton>
                    </Show>
                </div>
            </div>
        </nav>
    );

};

