import { useState, useRef, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Define the createUser function for signing up
async function createUser(username: string, password: string) {
   const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
         "Content-Type": "application/json",
      },
   });

   const data = await response.json();

   if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
   }
   return data;
}

// Define the AuthForm component
function AuthForm() {
   const usernameInputRef = useRef<HTMLInputElement>(null);
   const passwordInputRef = useRef<HTMLInputElement>(null);

   const [isLogin, setIsLogin] = useState(true);
   const router = useRouter();

   // Function to switch between login and sign-up modes
   function switchAuthModeHandler() {
      setIsLogin((prevState) => !prevState);
   }

   // Handle form submission
   async function submitHandler(event: FormEvent) {
      event.preventDefault();

      const enteredUsername = usernameInputRef.current?.value;
      const enteredPassword = passwordInputRef.current?.value;

      if (!enteredUsername || !enteredPassword) {
         console.log("Please enter a username and password.");
         return;
      }

      // Handle login or sign-up
      if (isLogin) {
         const result = await signIn("credentials", {
            redirect: false,
            username: enteredUsername,
            password: enteredPassword,
         });

         if (result && !result.error) {
            router.replace("/profile");
         } else {
            console.log(result?.error);
         }
      } else {
         try {
            const result = await createUser(enteredUsername, enteredPassword);
            console.log(result);
            router.replace("/profile"); // Redirect to profile after successful sign-up
         } catch (error) {
            console.log(error);
         }
      }
   }

   return (
      <section className="m-auto mt-12 w-11/12 max-w-md rounded-lg bg-purple-800 p-4 text-center shadow-md">
         <h1 className="text-white text-2xl font-bold">
            {isLogin ? "Login" : "Sign Up"}
         </h1>
         <form onSubmit={submitHandler}>
            <div className="mb-4">
               <label
                  htmlFor="username"
                  className="block text-white font-bold mb-2"
               >
                  Your Username
               </label>
               <input
                  type="text"
                  id="username"
                  required
                  ref={usernameInputRef}
                  className="w-full rounded-md border border-white bg-purple-100 p-2 text-purple-800"
               />
            </div>
            <div className="mb-4">
               <label
                  htmlFor="password"
                  className="block text-white font-bold mb-2"
               >
                  Your Password
               </label>
               <input
                  type="password"
                  id="password"
                  required
                  ref={passwordInputRef}
                  className="w-full rounded-md border border-white bg-purple-100 p-2 text-purple-800"
               />
            </div>
            <div className="mt-6 flex flex-col items-center">
               <button className="mb-2 w-full cursor-pointer rounded-md bg-purple-600 py-2 px-6 text-white hover:bg-purple-700">
                  {isLogin ? "Login" : "Create Account"}
               </button>
               <button
                  type="button"
                  className="mt-4 bg-transparent text-purple-400 hover:text-purple-300"
                  onClick={switchAuthModeHandler}
               >
                  {isLogin
                     ? "Create new account"
                     : "Login with existing account"}
               </button>
            </div>
         </form>
      </section>
   );
}

export default AuthForm;
