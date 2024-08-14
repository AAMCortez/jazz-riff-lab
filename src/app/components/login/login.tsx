export default function LoginForm() {
   return (
      <section>
         <h1> Login </h1>
         <form>
            <div className="">
               <label htmlFor="email">Your Email</label>
               <input type="email" id="email" required />
            </div>
            <div className="">
               <label htmlFor="password">Your Password</label>
               <input type="password" id="password" required />
            </div>
            <div className="">
               <button>Login</button>
               <button type="button" className=""></button>
            </div>
         </form>
      </section>
   );
}
