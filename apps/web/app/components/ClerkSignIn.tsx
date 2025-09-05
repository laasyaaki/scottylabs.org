import { SignIn } from "@clerk/react-router";
import css from "./ClerkSignIn.module.css";
export default function ClerkSignIn() {
  return (
    <div className={css["sign-in-container"]}>
      <SignIn
        withSignUp={false}
        // signUpUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        appearance={{
          elements: {
            // footerAction: {
            //   display: "none",
            // },
            formButtonPrimary: {
              boxSizing: "border-box",
              // so that the sign in button width matches input field width
            },
          },
        }}
      />
    </div>
  );
}
