import { SignUp } from "@clerk/react-router";
import css from "./ClerkSignIn.module.css";
export default function ClerkSignUp() {
  return (
    <div className={css["sign-in-container"]}>
      <SignUp
        appearance={{
          elements: {
            footerAction: {
              display: "none",
            },
            formButtonPrimary: {
              boxSizing: "border-box",
              // so that the sign in button width matches input field width
            },
            formFieldHintText__emailAddress: {
              display: "none", // technically not optional
            },
          },
        }}
      />
    </div>
  );
}
