import React from "react";

type Props = {};

function Practice({}: Props) {
   return (
      <div>
         <h1>
            This is going to have a list of songs that the user knows and are
            set to practice
         </h1>
         <ul>
            <li>
               <h4>music name</h4>
               <h5>by: artist</h5>
               <button>play this on youtube?</button>
            </li>
            <li>
               <h4>music name</h4>
               <h5>by: artist</h5>
               <button>play this on youtube?</button>
            </li>
            <li>
               <h4>music name</h4>
               <h5>by: artist</h5>
               <button>play this on youtube?</button>
               <input type="checkbox" id="vehicle1" name="vehicle1" />
               <label>Learnt</label>
            </li>
         </ul>
      </div>
   );
}

export default Practice;
