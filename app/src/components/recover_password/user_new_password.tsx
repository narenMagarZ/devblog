import NavBar from "../navbar/navbar";


export default function UserNewPassword(){
     const style = {
          form : {
               width : '500px'
          }
     }
     return (
          <div>
              <div>
               <NavBar/>
               </div> 
               <div className="d-flex align-items-center justify-content-center p-2">
                    <form 
                    style={style.form}
                    className="border bg-white border-mute rounded py-4 px-5">
                         <big className="fw-bold">Forgot your password?</big>
                         <div className="my-3">
                              <label className="form-label">Email</label>
                              <input type='email' className="form-control" placeholder="you@gmail.com" />
                         </div>
                         <button className="btn w-100 btn-primary">Send me reset password instructions</button>
                    </form>
               </div>
          </div>
     )
}