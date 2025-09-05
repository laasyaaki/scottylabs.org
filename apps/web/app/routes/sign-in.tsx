import { SignIn } from "@clerk/react-router";

export default function SignInPage() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: "10vh",
        marginBottom: "30px",
      }}
    >
      <SignIn
        withSignUp={false}
        signUpUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      />
    </div>
  );
}
